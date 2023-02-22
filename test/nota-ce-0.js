// const consultaNFE = require("../dist/index");
// const QRCodeURL =
// 	"http://nfce.sefaz.ce.gov.br/pages/ShowNFCe.html?p=23200508874974000106650010000003651751286686|2|1|2|7F56AE16EFD96E35452F6DAD1F59F74BE730E182";
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require("chai");

// //  Resultado Esperado
// const result = {
// 	cabecalho: {
// 		dataEmissao: new Date("2020-05-12T13:33:35.000Z"),
// 		dataEntradaSaida: null,
// 		modelo: null,
// 		numero: "1",
// 		serie: "18/05/2020 10:33:34- Via Consumidor",
// 		total: 90,
// 	},
// 	emitente: {
// 		nome: "FRANCISCO CHARLES ALVES BATISTA",
// 		razaoSocial: "FRANCISCO CHARLES ALVES BATISTA",
// 		cnpj: "08.874.974/0001-06",
// 		rua: "AV LUCIANO MAGALHAES, 1899",
// 		bairro: "SANTA LUZIA",
// 		cep: null,
// 		cidade: "CE",
// 		telefone: null,
// 		estado: "CANINDE",
// 		ibge: null,
// 	},
// 	produtos: [
// 		{
// 			descricao: "TELA Q 61 15X15 3.4",
// 			quantidade: 1,
// 			unidade: "UNID",
// 			preco: 90,
// 			codigo: 9,
// 			NCM: null,
// 			eanComercial: null,
// 		},
// 	],
// };

// describe("Nota Fiscal - CE - Chave 23200508874974000106650010000003651751286686", function () {
// 	this.timeout(0);
// 	it("Cabeçalho", (done) => {
// 		QueryNFE.then((NFE) => {
// 			chai.expect(NFE.cabecalho).to.deep.equal(result.cabecalho);
// 			done();
// 		}).catch(done);
// 	});

// 	it("Emitente", (done) => {
// 		QueryNFE.then((NFE) => {
// 			chai.expect(NFE.emitente).to.deep.equal(result.emitente);
// 			done();
// 		}).catch(done);
// 	});

// 	it("Produtos/Serviços", (done) => {
// 		QueryNFE.then((NFE) => {
// 			chai.expect(NFE.produtos).to.deep.equal(result.produtos);
// 			done();
// 		}).catch(done);
// 	});
// });
