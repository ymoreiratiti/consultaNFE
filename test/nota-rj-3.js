const consultaNFE = require("../dist/index");
const QRCodeURL =
	"http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33200647508411251230650250001143911977409057|2|1|1|576FB20CD4A6B311F5A1CDC3B3BF106E252B46FB";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
	cabecalho: {
		dataEmissao: new Date("2020-06-29T01:39:26.000Z"),
		numero: "114391",
		serie: "25",
		total: 22.96,
		tributacao: 4.64,
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
			descricao: "QA UVA PRETA S/SEMEN",
			quantidade: 1,
			unidade: "UN",
			preco: 6.98,
			codigo: 1093940,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "P SUISSE DHO MOR 480",
			quantidade: 1,
			unidade: "UN",
			preco: 6.99,
			codigo: 1110279,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "DANONE VITAMIN 1350G",
			quantidade: 1,
			unidade: "UN",
			preco: 8.99,
			codigo: 1062314,
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
