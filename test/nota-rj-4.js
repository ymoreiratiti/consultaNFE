const consultaNFE = require("../dist/index");
const QRCodeURL =
	"http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33210247508411251230650080002058171824397469|2|1|1|DB108B00C7165E25B7215AB630D1FF8C77E42C27";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
	cabecalho: {
		dataEmissao: new Date("2021-02-20T19:40:13.000Z"),
		numero: "205817",
		serie: "8",
		total: 23.36,
		tributacao: 5.65,
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
			descricao: "REQ TRAD CAT 200G",
			quantidade: 1,
			unidade: "UN",
			preco: 7.99,
			codigo: 1096020,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "OVOS MEDIOS C/30",
			quantidade: 1,
			unidade: "UN",
			preco: 15.29,
			codigo: 1116606,
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

describe("Nota Fiscal - RJ - Chave 33210247508411251230650080002058171824397469", function () {
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
