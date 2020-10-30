import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';
import nfeDados, { ICabecalho, IEmitente, IProduto } from '../nfe-dados';

export default class Consulta {
    private axiosConfig: AxiosRequestConfig = {
        method: 'get',
        responseType: 'document',
        params: {},
        timeout: 1000 * 60,
        url: 'https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp',
    };
    private html!: CheerioStatic;

    constructor(qrCodeURL: URL) {
        const chaveNFe: string =
            qrCodeURL.searchParams.get('p') || '';

        if (chaveNFe === '') throw new Error('Não foi possível detectar a chave do parâmetro');

        this.axiosConfig.params.p = chaveNFe;
        this.axiosConfig.params.HML = false;
    }

    /**
    * Retorna uma promise com os dados coletados
    */
    public async get(): Promise<any> {
        return this.fetchData()
            .then(cheerio.load)
            .then((html: CheerioStatic): any => {
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

        let info = this.getInfo();

        let data_str = info['data_emissao'] || '';
        const objDataEmissao = moment(data_str || '', format);

        //  Extraí os dados
        const modelo: string = '';
        const numero: string = info['numero'] || '';
        const serie: string = info['serie'] || '';
        const total: number = info['valor_a_pagar'] || 0;

        //  Formata os dados
        const dataEmissao: Date | null = objDataEmissao.isValid()
            ? objDataEmissao.toDate()
            : null;


        return { dataEmissao, modelo, numero, serie, total, dataEntradaSaida: null };
    }

    /**
     *  Recupera Informação como
     *  Total de itens comprados, valor a pagar,
     *  valor pago, se foi a dinheiro ou cartão
     *  e retorna um array de dados
     */
    private getInfo(): any {

        const $ = this.html;
        let total_nota: string[] = $('#totalNota').text().trim()?.split("\n\n\n") || []

        let aux: string[] = [];

        total_nota.forEach(element => {
            element.trim().toLowerCase().split(':').filter(e => {

                var str = "";
                if (!(e.includes("forma de pagamento") || e.includes("valor pago r$"))) {
                    str = e;
                }
                if (e.includes("cartão de crédito") || e.includes("dinheiro") || e.includes("troco")) {
                    str = e.replace("cartão de crédito", "cartão de crédito:")
                        .replace("troco", "troco:")
                        .replace("dinheiro", "dinheiro:")
                }
                if (str != "") {

                    str.split(":").forEach(e => {

                        e = e.trim().replace(/[ ]/g, "_")
                            .replace(/[/\n /\t]/g, "")
                            .replace(".", "")
                            .replace("_r$", "")
                            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                            .replace(",", "")

                        aux.push(e)
                    })
                }
            });
        });

        //FORMAT
        let data: any = []
        for (let a = 0; a < aux.length; a += 2) {
            data[aux[a]] = aux[a].includes('qtd') ? parseInt(aux[a + 1]) : parseInt(aux[a + 1]) / 100;
        }

        // NUMERO E SERIE
        let info = $('#infos').text()
        let start_numero = info.indexOf('Número:');
        let start_serie = info.indexOf('Série:');
        let start_emissao = info.indexOf('Emissão:');

        // ADD NUMERO E SERIE AO ARRAY DE DADOS
        data['numero'] = info.substring(start_numero, start_serie).trim().replace(/\D/g, '');
        data['serie'] = info.substring(start_serie, start_emissao).trim().replace(/\D/g, '');

        //DATA EMISSAO
        let info_data = $("#infos").find('li').not('strong').text();
        let start = info_data.indexOf("Emissão:") + "Emissão:".length;
        let end = info_data.substring(start).indexOf('-');
        let data_str = info_data.substring(start, start + end).trim();

        //ADD DATA NO ARRAY DE DADOS
        data['data_emissao'] = data_str;

        //CHAVE
        const chave: string = $('.chave').text();
        data['chave'] = chave;

        return data;
    }

    /**
     * Dados do Emitente
     */
    private getEmitente(): IEmitente {
        const $ = this.html;

        //  Extraí os dados
        const nome: string = $('#u20').html() || '';
        const razaoSocial: string = $('#u20').html() || '';
        const cnpj: string = $('.text', '#conteudo').html()?.trim().replace(/[/\n /\t]/g, "") || '';
        const end: string[] = $('.text', '#conteudo').next().text().split(',') || []

        return {
            nome: nome,
            razaoSocial: razaoSocial,
            cnpj: cnpj.toString().replace(/[/\n /\t]/g, ""),
            estado: 'AM',
            rua: end[0].replace(/[/\n /\t]/g, "") || '',
            numero: end[1].replace(/[/\n /\t]/g, "") || '',
            bairro: end[3].replace(/[/\n /\t]/g, "") || '',
            cep: parseInt(end[3] ? end[3].replace(/\D/g, '') : '') || null,
            cidade: end[4].replace(/[/\n /\t]/g, "") || '',
            telefone: null,
            ibge: null,
        };
    }

    /**
       * Dados dos Produtos
       */
    private getProdutos(): IProduto[] {
        const $ = this.html;
        let index = this.getInfo()['qtd_total_de_itens'];
        const lista = [];
        const MIL = 1000;


        for (var a = 1; a <= index; a++) {

            const descricao: string = $(".txtTit", "#item_" + a).html()?.trim() || '';
            let quantidade_str: string = ($(".Rqtd", "#item_" + a).text().trim().replace(/\D/g, ''));
            const unidade: string = $(".RUN", "#item_" + a).text().split(":")[1].trim();
            let preco_str = $(".RvlUnit", "#item_" + a).text().trim().replace(/\D/g, '');
            const codigo: number | null = null;
            let valor_str: string = $(".valor", "#item_" + a).html()?.trim().replace(/\D/g, '') || '';


            //conversoes
            preco_str = preco_str.concat('0'.repeat(4 - preco_str.length));
            valor_str = valor_str.concat('0'.repeat(4 - valor_str.length));
            quantidade_str = unidade.includes('UN') ? quantidade_str : quantidade_str.concat('0'.repeat(4 - quantidade_str.length));

            const preco: number = Number(preco_str) / MIL;
            const valor_total: number | null = Number(valor_str) / MIL || null
            const quantidade: number = unidade.includes('UN') ? Number(quantidade_str) : Number(quantidade_str) / MIL;

            lista.push({ descricao, quantidade, unidade, preco, codigo, NCM: null, eanComercial: null, valor_total });
        }

        return lista;
    }

    /**
    * Consulta no NFE
    */
    private fetchData(): any {
        return axios(this.axiosConfig)
            .then(res => {
                // recupera o HTML e trata exceções de id
                return res.data.replace(/id=\"Item \+ /g, "id=\"item_");
            })
            .catch(() => { throw new Error('Não foi possível efetuar o download da NFE'); });
    }
}
