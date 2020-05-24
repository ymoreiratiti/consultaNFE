import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';

export default class Consulta {
  private axiosConfig: AxiosRequestConfig = {
    method: 'get',
    params: {},
    timeout: 1000 * 60,
    url: 'http://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml',
  };
  private html!: CheerioStatic;

  constructor(qrCodeURL: URL) {
    const chaveNFe: string = qrCodeURL.searchParams.get('chNFe')
      || qrCodeURL.searchParams.get('p')
      || '';

    if (!chaveNFe.length) throw new Error('Não foi possível detectar a chave do parâmetro');

    this.axiosConfig.params.p = chaveNFe;
    this.axiosConfig.params.HML = false;
  }

  /**
   * Retorna uma promise com os dados coletados
   */
  public async get(): Promise<nfeDados> {
    return this.fetchData()
      .then(cheerio.load)
      .then((html: CheerioStatic): nfeDados => {
        this.html = html;

        return {
          cabecalho: this.getCabecalho(),
          emitente: this.getEmitente(),
          produtos: this.getProdutos(),
        };
      });
  }

  /**
   * Dados do Cabeçalho
   */
  private getCabecalho(): ICabecalho {
    const $ = this.html;
    const format = 'DD/MM/YYYY HH:mm:ssZ';
    const scope = '#collapse4';

    //  Extraí os dados
    const objDataEmissao = moment($('table:nth-of-type(3) > tbody > tr > td:nth-child(4)', scope)
      .html() || '',              format);
    const modelo: string = $('table:nth-of-type(3) > tbody > tr > td:nth-child(1)', scope).html() || '';
    const numero: string = $('table:nth-of-type(3) > tbody > tr > td:nth-child(3)', scope).html() || '';
    const serie: string = $('table:nth-of-type(3) > tbody > tr > td:nth-child(2)', scope).html() || '';
    const strTotal: string = $('table:nth-of-type(4) > tbody > tr > td:nth-child(1)', scope)
      .html() || '0';

    //  Formata os dados
    const dataEmissao: Date | null = objDataEmissao.isValid()
      ? objDataEmissao.toDate()
      : null;

    const total: number = Number(strTotal.split(' ')[1].split('.').join('').replace(',', '.'));

    return { dataEmissao, dataEntradaSaida: null, modelo, numero, serie, total };
  }

  /**
   * Dados do Emitente
   */
  private getEmitente(): IEmitente {
    const $ = this.html;
    const scope = '#collapse4';

    //  Extraí os dados
    const nome: string = $('table:nth-of-type(1) > tbody > tr > td:nth-child(1)', scope).html() || '';
    const razaoSocial: string = $('table:nth-of-type(1) > tbody > tr > td:nth-child(1)', scope)
      .html() || '';
    const cnpj: string = $('table:nth-of-type(1) > tbody > tr > td:nth-child(2)', scope).html() || '';
    const estado: string = $('table:nth-of-type(1) > tbody > tr > td:nth-child(4)', scope).html() || '';

    return {
      nome,
      razaoSocial,
      cnpj, rua: null,
      bairro: null, cep:
        null, cidade: null,
      telefone: null,
      estado,
      ibge:
        null,
    };
  }

  /**
   * Dados dos Produtos
   */
  private getProdutos(): IProduto[] {
    const $ = this.html;
    let scope;
    const lista = [];

    //  Extraí os dados
    let count = 0;
    while (true) {
      count += 1;
      scope = `#myTable > tr:nth-child(${count + 0})`;

      const descricao = $('td:nth-child(1) > h7', scope).html();

      let quantidade = $('td:nth-child(2)', scope).html();
      const unidade = $('td:nth-child(3)', scope).html();
      const preco = $('td:nth-child(4)', scope).html();

      const selectorCodigo = 'td:nth-child(1)';
      let codigo = $(selectorCodigo, scope).html();
      if (codigo) {
        codigo = codigo.split(': ')[1].replace(')', '');
      }
      if (quantidade) {
        const quantidadeArr: string[] = quantidade.split(' ');
        quantidade = quantidadeArr[quantidadeArr.length - 1].replace(')', '');
      }
      if (descricao === null) break;
      lista.push({ descricao, quantidade, unidade, preco, codigo, NCM: null, eanComercial: null });
    }

    //  Formata os dados
    return lista.map((produto: any): IProduto => {
      const descricao: string = produto.descricao.split('\n')[0];

      const quantidade: number = Number(produto.quantidade.replace('.', '').replace(',', '.'));

      const unidade: string = produto.unidade.split(' ')[1];
      const preco: number = Number(produto.preco.split(' ')[4].split('.').join().replace(',', '.'));
      const codigo: number | null = Number(produto.codigo) || null;

      return { descricao, quantidade, unidade, preco, codigo, NCM: null, eanComercial: null };
    });
  }

  /**
   * Consulta no NFE
   */
  private fetchData(): any {
    return axios(this.axiosConfig)
      .then(res => res.data)
      .catch(() => { throw new Error('Não foi possível efetuar o download da NFE'); });
  }

}
