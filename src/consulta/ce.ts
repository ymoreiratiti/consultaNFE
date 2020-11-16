import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';

export default class Consulta {
  private axiosConfig: AxiosRequestConfig = {
    method: 'post',
    params: {},
    timeout: 1000 * 60,
    url: 'http://nfce.sefaz.ce.gov.br/nfce/api/notasFiscal/qrcodev2/',
  };
  private html!: CheerioStatic;

  constructor(qrCodeURL: URL) {
    const chaveNFe: string[] =
      qrCodeURL.searchParams.get('p')?.split('|') || [];

    if (chaveNFe === []) throw new Error('Não foi possível detectar a chave do parâmetro');

    this.axiosConfig.data = {
      chave_acesso: chaveNFe[0],
      versao_qrcode: chaveNFe[1],
      tipo_ambiente: chaveNFe[2],
      identificador_csc: chaveNFe[3],
      codigo_hash: chaveNFe[4],
    };
    this.axiosConfig.params.HML = false;
  }

  /**
   * Retorna uma promise com os dados coletados
   */
  public async get (): Promise<nfeDados> {
    return this.fetchData()
      .then(cheerio.load)
      .then(
        (html: CheerioStatic): nfeDados => {
          this.html = html;
          return {
            cabecalho: this.getCabecalho(),
            emitente: this.getEmitente(),
            produtos: this.getProdutos(),
          };
        },
      );
  }

  /**
   * Dados do Cabeçalho
   */
  private getCabecalho (): ICabecalho {
    const $ = this.html;
    const format = 'DD/MM/YYYY HH:mm:ssZ';
    const scope = '#infos > div:nth-child(1) > ul > li';
    //  Extraí os dados
    const objDataEmissao = moment.utc(
      $('strong:nth-of-type(5)', scope)[0].next.data || '',
      format,
    );
    const numero: string =
      $('strong:nth-of-type(3)', scope)[0].next.data || '';
    const serie: string =
      $('strong:nth-of-type(4)', scope)[0].next.data || '';
    const strTotal: string =
      $('#totalNota > #linhaTotal:nth-child(2) > span').html() ||
      '0';
    //  Formata os dados
    const dataEmissao: Date | null = objDataEmissao.isValid()
      ? objDataEmissao.add(3, 'hours').toDate()
      : null;

    const total: number = Number(
      strTotal.split('.').join('').replace(',', '.'),
    );
    return {
      dataEmissao,
      numero,
      serie,
      total,
      dataEntradaSaida: null,
      modelo: null,
    };
  }

  /**
   * Dados do Emitente
   */
  private getEmitente (): IEmitente {
    const $ = this.html;
    const scope = '#conteudo > div:nth-child(2)';

    //  Extraí os dados
    const nome: string = $('div:nth-child(1)', scope).html() || '';
    const razaoSocial: string =
      $('div:nth-child(1)', scope).html() || '';

    let cnpj: string = $('div:nth-child(2)', scope).html() || '';
    const endereco: string = $('div:nth-child(3)', scope).html() || '';

    //  Formata os dados
    cnpj = cnpj.split(':')[1];
    const aux = endereco.split(',');
    const rua: string = `${aux[0]}, ${aux[1]}`;
    const bairro: string = aux[3];
    const estado: string = aux[4];
    const cidade: string = aux[5];

    return {
      nome,
      razaoSocial,
      cnpj,
      rua,
      bairro,
      cidade,
      estado,
      telefone: null,
      cep: null,
      ibge: null,
    };
  }

  /**
   * Dados dos Produtos
   */
  private getProdutos (): IProduto[] {
    const $ = this.html;
    // const scope = "#tabResult"
    let scope;
    const lista = [];

    //  Extraí os dados
    let count = 0;
    while (true) {
      count += 1;
      scope = `#conteudo > table > tbody > tr:nth-of-type(${count}) > td`;
      const descricao = $('span:nth-of-type(1)', scope).html();
      if (descricao === null) break;
      const codigo = $('span:nth-of-type(2)', scope).text();
      // console.log($("span:nth-of-type(5) > strong", scope)[0].next.data);
      const quantidade = $('span:nth-of-type(3) > strong', scope)[0]
        .next.data;
      const unidade = $('span:nth-of-type(4) > strong', scope)[0]
        .next.data;
      const preco = $('span:nth-of-type(5) > strong', scope)[0].next
        .data;

      lista.push({
        descricao,
        quantidade,
        unidade,
        preco,
        codigo,
        NCM: null,
        eanComercial: null,
      });
    }
    //  Formata os dados
    return lista.map(
      (produto: any): IProduto => {
        const descricao: string = produto.descricao
          .split('&amp;')
          .join('');
        const quantidade: number = Number(
          produto.quantidade
            .split('.')
            .join()
            .replace(',', '.'),
        );
        const unidade: string = produto.unidade.trim();
        const preco: number = Number(
          produto.preco.split('.').join().replace(',', '.'),
        );
        const codigo: number | null =
          Number(
            produto.codigo
              .split(':')[1]
              .split(')')[0]
              .trim(),
          ) || null;

        return {
          descricao,
          quantidade,
          unidade,
          preco,
          codigo,
          NCM: null,
          eanComercial: null,
        };
      },
    );
  }
  /**
   * Consulta no NFE
   */
  private fetchData (): any {
    return axios(this.axiosConfig)
      .then(res => res.data.xml)
      .catch(() => {
        throw new Error(
          'Não foi possível efetuar o download da NFE',
        );
      });
  }
}
