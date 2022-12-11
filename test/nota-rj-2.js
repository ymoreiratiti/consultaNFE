const consultaNFE = require("../dist/index");
const QRCodeURL =
	"http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33200627806687000103650010000421881567042183|2|1|1|48E2D55C1E740441F666D04A59EA1EC92B09A9E5";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
	cabecalho: {
		dataEmissao: new Date("2020-06-27T18:21:40.000Z"),
		numero: "42188",
		serie: "1",
		total: 38.45,
		tributacao: 0,
		dataEntradaSaida: null,
		modelo: null,
	},
	emitente: {
		nome: "MORO COMERCIO DE UTILIDADES LTDA",
		razaoSocial: "MORO COMERCIO DE UTILIDADES LTDA",
		cnpj: "27.806.687/0001-03",
		rua: "RUA GENERAL RONDON, 980",
		bairro: "CENTRO",
		cidade: "RJ",
		estado: "Petropolis",
		telefone: null,
		cep: null,
		ibge: null,
	},
	produtos: [
		{
			descricao: "CARRINHO A FRICCAO (POLICIA COLOR) JR TOYS JR0042",
			quantidade: 1,
			unidade: "UN",
			preco: 4.99,
			codigo: 11436,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "CAMINHAO POP COM PA TIMPLAST CP13",
			quantidade: 1,
			unidade: "UN",
			preco: 3.99,
			codigo: 11863,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "CARRINHO FRICCAO VAN 11,5CM AMACOM TS49017",
			quantidade: 1,
			unidade: "UN",
			preco: 2.5,
			codigo: 13036,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "CARRINHO PICK-UP DE FRICCAO MINI FENIMA 0614",
			quantidade: 1,
			unidade: "UN",
			preco: 1.5,
			codigo: 13395,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "CARRINHO PICK-UP DE FRICCAO MINI FENIMA 0614",
			quantidade: 1,
			unidade: "UN",
			preco: 1.5,
			codigo: 13395,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "CARRINHO FRICCAO RACING 69 SOLAPA SATYAM TOYS-180180",
			quantidade: 1,
			unidade: "PC",
			preco: 2.99,
			codigo: 12909,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "VASO QUADRADO MEDIO TERRACOTA ARQPLAST 25294",
			quantidade: 1,
			unidade: "UN",
			preco: 5.99,
			codigo: 10889,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "CAMINHAO CACAMBA BRUTTUS TIMPLAST CB67",
			quantidade: 1,
			unidade: "UN",
			preco: 14.99,
			codigo: 2233,
			NCM: null,
			eanComercial: null,
		},
	],
};

describe("Nota Fiscal - RJ - Chave 33200627806687000103650010000421881567042183", function () {
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
