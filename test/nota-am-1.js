// const consultaNFE = require("../dist/index");
// const QRCodeURL =
// 	"https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp?p=13201161365284014830650510000473181178596609|2|1|2|9748c36b4ec6c1728d65826bcad2624a606966de";
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require("chai");

// //  Resultado Esperado
// const result = {
//     cabecalho: {
//     dataEmissao: new Date('2020-11-07T23:55:49.000Z'),
//     modelo: '',
//     numero: '47318',
//     serie: '51',
//     total: 59.29,
//     dataEntradaSaida: null
//   },
//   emitente: {
//     nome: 'SARAIVA E SICILIANO S A',      
//     razaoSocial: 'SARAIVA E SICILIANO S A',
//     cnpj: 'CNPJ:61.365.2840148-30',
//     estado: 'AM',
//     rua: 'RECIFE',
//     numero: '1300',
//     bairro: 'ADRIANOPOLIS',
//     cep: null,
//     cidade: 'Manaus',
//     telefone: null,
//     ibge: null
//   },
//   produtos: [
//     {
//       descricao: 'Os Testamentos',
//       quantidade: 1,
//       unidade: 'EX',
//       preco: 59.29,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 59.29
//     }
//   ]
//   };
  
// describe("Nota Fiscal - AM  - Chave 13201161365284014830650510000473181178596609", function () {
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
