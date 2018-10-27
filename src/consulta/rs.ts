import axios from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';

export default class Consulta {
  private urlFetch: URL;
  private html!: CheerioStatic;

  constructor(qrCodeURL: URL) {
    let chaveNFe: string = qrCodeURL.searchParams.get('chNFe')
      || qrCodeURL.searchParams.get('p')
      || '';

    chaveNFe = chaveNFe.split('|')[0];

    if (!chaveNFe.length) throw new Error('Não foi possível detectar a chave do parâmetro');

    this.urlFetch = new URL('https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-COM_2.asp');
    this.urlFetch.searchParams.append('chaveNFe', chaveNFe);
    this.urlFetch.searchParams.append('HML', 'false');
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
    const scope = '#NFe > fieldset:nth-child(1) > table > tbody > tr';

    //  Extraí os dados
    const objDataEmissao = moment($('td:nth-child(4) > span', scope).html() || '', format);
    const objDataEntradaSaida = moment($('td:nth-child(5) > span', scope).html() || '', format);
    const modelo = $('td:nth-child(1) > span', scope).html() || '';
    const numero = $('td:nth-child(3) > span', scope).html() || '';
    const serie = $('td:nth-child(2) > span', scope).html() || '';
    const strTotal = $('td:nth-child(6) > span', scope).html() || '0';

    //  Formata os dados
    const dataEmissao = objDataEmissao.isValid() ? objDataEmissao.toDate() : null;
    const dataEntradaSaida = objDataEntradaSaida.isValid() ? objDataEntradaSaida.toDate() : null;
    const total = Number(strTotal.split('.').join('').replace(',', '.'));

    return { dataEmissao, dataEntradaSaida, modelo, numero, serie, total };
  }

  /**
   * Dados do Emitente
   */
  private getEmitente(): IEmitente {
    const $ = this.html;
    const scope = '#Emitente > fieldset > table > tbody';

    //  Extraí os dados
    const nome = $('tr.col-2 > td:nth-child(2) > span', scope).html() || '';
    const razaoSocial = $('tr.col-2 > td:nth-child(1) > span', scope).html() || '';
    const cnpj = $('tr:nth-child(2) > td:nth-child(1) > span', scope).html() || '';
    let rua = $('tr:nth-child(2) > td:nth-child(2) > span', scope).html() || '';
    const bairro = $('tr:nth-child(3) > td:nth-child(1) > span', scope).html() || '';
    const strCep = $('tr:nth-child(3) > td:nth-child(2) > span', scope).html() || '';
    const strCidade = $('tr:nth-child(4) > td:nth-child(1) > span', scope).html() || '';
    const telefone = $('tr:nth-child(4) > td:nth-child(2) > span', scope).html() || '';
    const estado = $('tr:nth-child(5) > td:nth-child(1) > span', scope).html() || '';

    //  Formata os dados
    rua = rua.split('\n').join().split('&#xFFFD;').join();
    while (rua.length !== rua.split('  ').join(' ').length) { rua = rua.split('  ').join(' '); }
    while (rua.length !== rua.split(',,').join(',').length) { rua = rua.split(',,').join(','); }
    rua = rua.replace(/,\s*$/, '');

    const cep = Number(strCep.trim().replace('-', '')) || null;
    const cidade = strCidade.split('-')[1].trim();
    const ibge = Number(strCidade.split('-')[0].trim());

    return { nome, razaoSocial, cnpj, rua, bairro, cep, cidade, telefone, estado, ibge };
  }

  /**
   * Dados dos Produtos
   */
  private getProdutos(): IProduto[] {
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
      const descricao = produto.descricao.trim();
      const quantidade = Number(produto.quantidade.split('.').join().replace(',', '.'));
      const unidade = produto.unidade.trim();
      const preco = Number(produto.preco.split('.').join().replace(',', '.'));
      const codigo = Number(produto.codigo.trim()) || null;
      const NCM = Number(produto.NCM.trim()) || null;
      const eanComercial = Number(produto.eanComercial.trim()) || null;

      return { descricao, quantidade, unidade, preco, codigo, NCM, eanComercial };
    });
  }

  /**
   * Consulta no SEFAZ
   */
  private fetchData(): any {
    return axios.get(this.urlFetch.toString())
      .then(res => res.data)
      .catch((err: Error) => { throw new Error('Não foi possível efetuar o download da NFE'); });
  }

}
