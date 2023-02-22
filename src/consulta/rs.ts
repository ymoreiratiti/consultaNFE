import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';

export default class Consulta {
  private axiosConfig: AxiosRequestConfig = {
    method: 'get',
    params: {},
    timeout: 1000 * 60,
    url: 'http://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-COM_2.asp',
  };
  private html!: CheerioStatic;

  constructor(qrCodeURL: URL) {
    let chaveNFe: string = qrCodeURL.searchParams.get('chNFe')
      || qrCodeURL.searchParams.get('p')
      || '';

    chaveNFe = chaveNFe.split('|')[0];

    if (!chaveNFe.length) throw new Error('Não foi possível detectar a chave do parâmetro');

    this.axiosConfig.params.chaveNFe = chaveNFe;
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
    const scope = '#NFe > fieldset:nth-child(1) > table > tbody > tr';

    //  Extraí os dados
    const objDataEmissao = moment.utc($('td:nth-child(4) > span', scope).html() || '', format);
    const objDataEntradaSaida = moment.utc($('td:nth-child(5) > span', scope).html() || '', format);
    const modelo: string = $('td:nth-child(1) > span', scope).html() || '';
    const numero: string = $('td:nth-child(3) > span', scope).html() || '';
    const serie: string = $('td:nth-child(2) > span', scope).html() || '';
    const strTotal: string = $('td:nth-child(6) > span', scope).html() || '0';

    //  Formata os dados
    const dataEmissao: Date | null = objDataEmissao.isValid()
      ? objDataEmissao.toDate()
      : null;
    const dataEntradaSaida: Date | null = objDataEntradaSaida.isValid()
      ? objDataEntradaSaida.toDate()
      : null;
    const total: number = Number(strTotal.split('.').join('').replace(',', '.'));

    return { dataEmissao, dataEntradaSaida, modelo, numero, serie, total, tributacao: null };
  }

  /**
   * Dados do Emitente
   */
  private getEmitente (): IEmitente {
    const $ = this.html;
    const scope = '#Emitente > fieldset > table > tbody';

    //  Extraí os dados
    const nome: string = $('tr.col-2 > td:nth-child(2) > span', scope).html() || '';
    const razaoSocial: string = $('tr.col-2 > td:nth-child(1) > span', scope).html() || '';
    const cnpj: string = $('tr:nth-child(2) > td:nth-child(1) > span', scope).html() || '';
    let rua: string = $('tr:nth-child(2) > td:nth-child(2) > span', scope).html() || '';
    const bairro: string = $('tr:nth-child(3) > td:nth-child(1) > span', scope).html() || '';
    const strCep: string = $('tr:nth-child(3) > td:nth-child(2) > span', scope).html() || '';
    const strCidade: string = $('tr:nth-child(4) > td:nth-child(1) > span', scope).html() || '';
    const telefone: string = $('tr:nth-child(4) > td:nth-child(2) > span', scope).html() || '';
    const estado: string = $('tr:nth-child(5) > td:nth-child(1) > span', scope).html() || '';

    //  Formata os dados
    rua = rua.split('\n').join().split('&#xFFFD;').join();
    while (rua.length !== rua.split('  ').join(' ').length) { rua = rua.split('  ').join(' '); }
    while (rua.length !== rua.split(',,').join(',').length) { rua = rua.split(',,').join(','); }
    rua = rua.replace(/,\s*$/, '');

    const cep: number | null = Number(strCep.trim().replace('-', '')) || null;
    const cidade: string = strCidade.split('-')[1].trim();
    const ibge: number = Number(strCidade.split('-')[0].trim());

    return { nome, razaoSocial, cnpj, rua, bairro, cep, cidade, telefone, estado, ibge };
  }

  /**
   * Dados dos Produtos
   */
  private getProdutos (): IProduto[] {
    const $ = this.html;
    let scope1;
    let scope2;
    const lista = [];

    //  Extraí os dados
    let count = 0;
    while (true) {
      count += 2;
      scope1 = `#Prod > fieldset > div > table:nth-child(${count + 0}) > tbody > tr`;
      scope2 = `#Prod > fieldset > div > table:nth-child(${count + 1}) > tbody > tr > td`;

      const descricao = $('td.fixo-prod-serv-descricao > span', scope1).html();
      const quantidade = $('td.fixo-prod-serv-qtd > span', scope1).html();
      const unidade = $('td.fixo-prod-serv-uc > span', scope1).html();
      const preco = $('td.fixo-prod-serv-vb > span', scope1).html();

      const selectorCodigo = 'table:nth-child(1) > tbody > tr.col-4 > td:nth-child(1) > span';
      const codigo = $(selectorCodigo, scope2).html();

      const selectorNCM = 'table:nth-child(1) > tbody > tr.col-4 > td:nth-child(2) > span';
      const NCM = $(selectorNCM, scope2).html();

      const selectorEANComercial = 'table:nth-child(3) > tbody > tr.col-3 > td:nth-child(1) > span';
      const eanComercial = $(selectorEANComercial, scope2).html();

      if (descricao === null) break;
      lista.push({ descricao, quantidade, unidade, preco, codigo, NCM, eanComercial });
    }

    //  Formata os dados
    return lista.map((produto: any): IProduto => {
      const descricao: string = produto.descricao.split('&amp;').join('');
      const quantidade: number = Number(produto.quantidade.split('.').join().replace(',', '.'));
      const unidade: string = produto.unidade.trim();
      const preco: number = Number(produto.preco.split('.').join().replace(',', '.'));
      const codigo: number | null = Number(produto.codigo.trim()) || null;
      const NCM: number | null = Number(produto.NCM.trim()) || null;
      const eanComercial: number | null = Number(produto.eanComercial.trim()) || null;

      return { descricao, quantidade, unidade, preco, codigo, NCM, eanComercial };
    });
  }

  /**
   * Consulta no SEFAZ
   */
  private fetchData (): any {
    return axios(this.axiosConfig)
      .then(res => res.data)
      .catch(() => { throw new Error('Não foi possível efetuar o download da NFE'); });
  }

}
