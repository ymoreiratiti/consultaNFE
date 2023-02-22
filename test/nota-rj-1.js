const consultaNFE = require("../dist/index");
const QRCodeURL =
	"http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33200722268337000117650010004967411205809203|2|1|09|10.00|356f746a372b6e5452715430347349494d413468395435657234383d|5|B1F20010F71023ACE7C302DA424A3E603EADDD92";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
	cabecalho: {
		dataEmissao: new Date("2020-07-09T22:41:28.000Z"),
		numero: "496741",
		serie: "1",
		total: 10,
		tributacao: 3.21,
		dataEntradaSaida: null,
		modelo: null,
	},
	emitente: {
		nome: "DROGARIA JS FERREIRA LTDA",
		razaoSocial: "DROGARIA JS FERREIRA LTDA",
		cnpj: "22.268.337/0001-17",
		rua: "RUA DO IMPERADOR N 107, S/N",
		bairro: "CENTRO",
		cidade: "RJ",
		estado: "PETROPOLIS",
		telefone: null,
		cep: null,
		ibge: null,
	},
	produtos: [
		{
			descricao: "DES AERO NIVEA SENSITIVE 24H 150 ML",
			quantidade: 1,
			unidade: "AP",
			preco: 10,
			codigo: 182115,
			NCM: null,
			eanComercial: null,
		},
	],
};

describe("Nota Fiscal - RJ - Chave 33200722268337000117650010004967411205809203", function () {
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
