import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';

export default class Consulta {
  private axiosConfig: AxiosRequestConfig = {
    method: 'get',
    params: {},
    timeout: 1000 * 60 * 2,
    url: 'http://nfce.set.rn.gov.br/portalDFE/NFCe/mDadosNFCe.aspx',
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
  public async get (): Promise<nfeDados> {
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
  private getCabecalho (): ICabecalho {
    const $ = this.html;
    const format = 'DD/MM/YYYY HH:mm:ssZ';
    const scope = '#divConteudoDanfe';

    //  Extraí os dados
    const objDataEmissaoStr = $('#lblDataEmissao', scope).html()?.trim() || '';
    const objDataEmissao = moment.utc(objDataEmissaoStr.substr(-19), format);
    const modelo: string = '';
    const numeroSerie: string = $('#lblNumeroSerie', scope).html() || '';

    const regex = /([0-9]{2,10})|([0-9]{2,10})/g;
    const numeroRegex = regex.exec(numeroSerie);
    regex.lastIndex += 1;
    const serieRegex = regex.exec(numeroSerie);

    const numero: string = (numeroRegex ? numeroRegex[0] : '') || '';
    const serie: string = (serieRegex ? serieRegex[0] : '') || '';
    const strTotal: string = $('#lblValorPago', scope)
      .html() || '0';

    //  Formata os dados
    const dataEmissao: Date | null = objDataEmissao.isValid()
      ? objDataEmissao.add(3, 'hours').toDate()
      : null;

    const total: number = Number(strTotal.split('.').join('').replace(',', '.'));

    return { dataEmissao, modelo, numero, serie, total, tributacao: null, dataEntradaSaida: null };
  }

  /**
   * Dados do Emitente
   */
  private getEmitente (): IEmitente {
    const $ = this.html;
    const scope = '#divConteudoDanfe > .bloco:nth-of-type(2) > table > tbody';

    //  Extraí os dados
    let nome: string = $('tr:nth-of-type(3) > td > span', scope).html() || '';
    const razaoSocial: string = $('tr:nth-of-type(2) > td > span', scope)
      .html() || '';
    let cnpj: string = $('tr:nth-of-type(4) > td > span', scope).html() || '';

    // pegando inicio da string razao social
    const posicaoInicialCnpj = 6;
    const posicaoInicialRazaoSocial = razaoSocial.indexOf(':') + 2;

    // Pegando a informação correta do CNPJ em notas que não possuem o nome fantasia do emitente
    if (!/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/s.test(cnpj.substr(posicaoInicialCnpj))) {
      cnpj = nome;
      nome = `NOME FANTASIA: ${razaoSocial.substr(posicaoInicialRazaoSocial)}`;
    }

    // pegando inicio da string nome fantasia
    const posicaoInicialNome = nome.indexOf(':') + 2;

    return {
      nome: nome.substr(posicaoInicialNome),
      razaoSocial: razaoSocial.substr(posicaoInicialRazaoSocial),
      cnpj: cnpj.substr(posicaoInicialCnpj),
      estado: 'RN',
      rua: null,
      bairro: null,
      cep: null,
      cidade: null,
      telefone: null,
      ibge: null,
    };
  }

  /**
   * Dados dos Produtos
   */
  private getProdutos (): IProduto[] {
    const $ = this.html;
    let scope;
    const lista = [];

    //  Extraí os dados
    let count = 1;
    while (true) {
      count += 1;
      scope = `#tbItensList > tbody > tr:nth-child(${count + 0})`;

      const descricao = $('td:nth-child(3) > span', scope).html();
      const quantidade = $('td:nth-child(4) > span', scope).html();
      const unidade = $('td:nth-child(5) > span', scope).html();
      const strPreco = $('td:nth-child(7) > span', scope).html() || '0';
      const preco = strPreco.split('.').join('').replace(',', '.');

      if (descricao === null) break;
      lista.push({
        descricao,
        quantidade,
        unidade,
        preco,
        codigo: null,
        NCM: null,
        eanComercial: null,
      });
    }

    //  Formata os dados
    return lista.map((produto: any): IProduto => {
      const descricao: string = produto.descricao.split('\n')[0];
      const quantidade: number = Number(produto.quantidade.replace('.', '').replace(',', '.'));
      const unidade: string = produto.unidade;
      const preco: number = Number(produto.preco.split('.').join().replace(',', '.'));

      return { descricao, quantidade, unidade, preco, codigo: null, NCM: null, eanComercial: null };
    });
  }

  /**
   * Consulta no NFE
   */
  private fetchData (): any {
    return axios(this.axiosConfig)
      .then(res => res.data)
      .catch(() => { throw new Error('Não foi possível efetuar o download da NFE'); });
  }

}
