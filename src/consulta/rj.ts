import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';
import querystring from 'querystring';

export default class Consulta {
  private axiosConfig: AxiosRequestConfig = {
    method: 'get',
    params: {},
    timeout: 1000 * 60,
    url: 'http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode',
  };
  private html!: CheerioStatic;
  private code: string = '';
  constructor(qrCodeURL: URL) {
    const chaveNFe: string =
      qrCodeURL.searchParams.get('chNFe') ||
      qrCodeURL.searchParams.get('p') ||
      '';

    if (!chaveNFe.length) {
      throw new Error('Não foi possível detectar a chave do parâmetro');
    }

    this.axiosConfig.params.p = this.code = chaveNFe;
    this.axiosConfig.params.HML = false;
  }

  /**
   * Retorna uma promise com os dados coletados
   */
  public async get(): Promise<nfeDados> {
    const token = await this.fetchToken();

    return this.fetchData(token.jsession, token.viewState)
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
      $('strong:nth-of-type(4)', scope)[0].next.data || '',
      format,
    );
    const numero: string =
      $('strong:nth-of-type(2)', scope)[0].next.data || '';
    const serie: string =
      $('strong:nth-of-type(3)', scope)[0].next.data || '';
    const strTotal: string =
      $('#totalNota > #linhaTotal:nth-child(2) > span').html() ||
      '0';
    const strTributacao: string =
    $('#totalNota > #linhaTotal:nth-child(6) > span').html() ||
    '0';
    //  Formata os dados
    const dataEmissao: Date | null = objDataEmissao.isValid()
      ? objDataEmissao.add(3, 'hours').toDate()
      : null;

    const total: number = Number(
      strTotal.split('.').join('').replace(',', '.'),
    );

    const tributacao: number = Number(
      strTributacao.split('.').join('').replace(',', '.'),
    );
    return {
      dataEmissao,
      numero,
      serie,
      total,
      tributacao,
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

    let cnpj: string = this.filter($('div:nth-child(2)', scope).html() || '');
    const endereco: string = $('div:nth-child(3)', scope).html()?.replace(/\t/g, '') || '';

    //  Formata os dados
    cnpj = this.filter(cnpj.split(':')[1]);
    const aux = endereco.split(',');
    const rua: string = this.filter(`${aux[0]}, ${aux[1]}`);
    const bairro: string = this.filter(aux[3]);
    const estado: string = this.filter(aux[4]);
    const cidade: string = this.filter(aux[5]);

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

  private filter(word : string): string {
    return word
      .replace(/\t/g, '')
      .replace(/\n/g, '')
      .replace('&#xFFFD;', 'ó')
      .trim();

  }

  /**
   * Obter Token
   */
  private fetchToken(): any {
    return axios(this.axiosConfig)
      .then((res) => {
        const $ = cheerio.load(res.data);
        return {
          viewState: $('input[id="javax.faces.ViewState"]').val(),
          jsession: res.headers['set-cookie'][0].split('"')[1],
        };
      })
      .catch(() => {
        throw new Error('Não foi possível obter o token de acesso');
      });
  }

  /**
   * Consulta no NFE
   */
  private fetchData(jsession: string, viewState: string): any {

    const config: AxiosRequestConfig = {
      method: 'post',
      url:
        `http://www4.fazenda.rj.gov.br/consultaNFCe/paginas/consultaQRCode.faces;jsessionid=${jsession}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `JSESSIONID="${jsession}"; f5_cspm=1234;`,
      },
      data: querystring.stringify({
        formulario: 'formulario',
        'javax.faces.ViewState': viewState,
        btSubmitQRCode: 'btSubmitQRCode',
        p: this.code,
      }),
    };

    return axios(config)
      .then(res => res.data)
      .catch(() => {
        throw new Error('Não foi possível efetuar o download da NFE');
      });
  }
}
