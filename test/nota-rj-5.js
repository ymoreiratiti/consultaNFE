const consultaNFE = require("../dist/index");
const QRCodeURL =
	"http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33210247508411251230650080002058161300938560|2|1|1|F3F3B0918645BA0BFB155661EA4893AFD8C87D5E";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
	cabecalho: {
		dataEmissao: new Date("2021-02-20T19:39:11.000Z"),
		numero: "205816",
		serie: "8",
		total: 25.07,
		tributacao: 10.68,
		dataEntradaSaida: null,
		modelo: null,
	},
	emitente: {
		nome: "CIA BRASILEIRA DE DISTRIBUICAO",
		razaoSocial: "CIA BRASILEIRA DE DISTRIBUICAO",
		cnpj: "47.508.411/2512-30",
		rua: "RUA GENERAL RONDOM, 001015",
		bairro: "QUITANDINHA",
		cidade: "RJ",
		estado: "PETROPOLIS",
		telefone: null,
		cep: null,
		ibge: null,
	},
	produtos: [
		{
			descricao: "ICE SYN 300ML",
			quantidade: 5,
			unidade: "UN",
			preco: 2.79,
			codigo: 3484944,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "IOG LIQ PROTEIN FLOC",
			quantidade: 1,
			unidade: "UN",
			preco: 5.11,
			codigo: 9918984,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "IOG LIQ VIG MO GF",
			quantidade: 1,
			unidade: "UN",
			preco: 5.93,
			codigo: 9865748,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "SACOLA VERDE 48X55",
			quantidade: 1,
			unidade: "UN",
			preco: 0.08,
			codigo: 7636387,
			NCM: null,
			eanComercial: null,
		},
	],
};

describe("Nota Fiscal - RJ - Chave 33200647508411251230650250001143911977409057", function () {
	this.timeout(0);
	it("Cabeçalho", (done) => {
		QueryNFE.then((NFE) => {
			chai.expect(NFE.cabecalho).to.deep.equal(result.cabecalho);
			done();
		}).catch(done);
	});

	it("Emitente", (done) => {
		QueryNFE.then((NFE) => {
			chai.expect(NFE.emitente).to.deep.equal(result.emitente);
			done();
		}).catch(done);
	});

	it("Produtos/Serviços", (done) => {
		QueryNFE.then((NFE) => {
			chai.expect(NFE.produtos).to.deep.equal(result.produtos);
			done();
		}).catch(done);
	});
});
