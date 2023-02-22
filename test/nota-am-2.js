// const consultaNFE = require("../dist/index");
// const QRCodeURL =
// 	"https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp?p=13201103483863000155651180001265181527951347|2|1|1|3b1203fa2395d833cb8712a72361d3f68156062c";
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require("chai");

// //  Resultado Esperado
// const result = {
//     cabecalho: {
//     dataEmissao: new Date('2020-11-03T11:55:18.000Z'),
//     modelo: '',
//     numero: '126518',
//     serie: '118',
//     total: 22.49,
//     dataEntradaSaida: null
//   },
//   emitente: {
//     nome: 'Medeiros Comercio de Alimentos Ltda - Me',
//     razaoSocial: 'Medeiros Comercio de Alimentos Ltda - Me',
//     cnpj: 'CNPJ:03.483.8630001-55',
//     estado: 'AM',
//     rua: 'AvenidaTorquatoTapajos',
//     numero: '5200',
//     bairro: 'Flores',
//     cep: null,
//     cidade: 'MANAUS',
//     telefone: null,
//     ibge: null
//   },
//   produtos: [
//     {
//       descricao: 'CF PAO COM OVO',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4
//     },
//     {
//       descricao: 'CF SUCO DE ACEROLA 470ML',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 9.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 9.99
//     },
//     {
//       descricao: 'CF CAFE COM LEITE UN',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 3.5,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.5
//     },
//     {
//       descricao: 'CF PAO COM QUEIJO',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 5,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 5
//     }
//   ]
//   };
  
// describe("Nota Fiscal - AM  - Chave 13201103483863000155651180001265181527951347", function () {
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
