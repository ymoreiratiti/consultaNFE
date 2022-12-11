// const consultaNFE = require("../dist/index");
// const QRCodeURL =
// 	"https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp?p=13201103483863000155651040001328551106523742|2|1|0|cc70cd5ed40e06233a3ef0a364d82db208bc52db";
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require("chai");

// //  Resultado Esperado
// const result = {
//     cabecalho: {
//       dataEmissao: new Date('2020-11-04T23:30:46.000Z'),
//       modelo: '',
//       numero: '132855',
//       serie: '104',
//       total: 73.6,
//       dataEntradaSaida: null
//     },
//     emitente: {
//       nome: 'Medeiros Comercio de Alimentos Ltda - Me',
//       razaoSocial: 'Medeiros Comercio de Alimentos Ltda - Me',
//       cnpj: 'CNPJ:03.483.8630001-55',
//       estado: 'AM',
//       rua: 'AvenidaTorquatoTapajos',
//       numero: '5200',
//       bairro: 'Flores',
//       cep: null,
//       cidade: 'MANAUS',
//       telefone: null,
//       ibge: null
//     },
//     produtos: [
//       {
//         descricao: 'CEREJAS EM CAL ODERICH 100G',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 9.19,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 9.19
//       },
//       {
//         descricao: 'SAL REF CAICARA 1KG',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 0.79,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 0.79
//       },
//       {
//         descricao: 'BISC PARATI MARIA 370G',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 4.29,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 4.29
//       },
//       {
//         descricao: 'BISC PARATI MARIA 370G',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 4.29,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 4.29
//       },
//       {
//         descricao: 'OVOS VERM SAO PEDRO 12UN',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 7.19,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 7.19
//       },
//       {
//         descricao: 'COT JOHNSON 150UN',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 8.09,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 8.09
//       },
//       {
//         descricao: 'ALHO KG',
//         quantidade: 0.18,
//         unidade: 'KG',
//         preco: 22.99,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 4.14
//       },
//       {
//         descricao: 'TANGERINA MORGOTE KG',
//         quantidade: 1.22,
//         unidade: 'KG',
//         preco: 7.19,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 8.77
//       },
//       {
//         descricao: 'CEBOLA KG',
//         quantidade: 0.44,
//         unidade: 'KG',
//         preco: 3.19,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 1.4
//       },
//       {
//         descricao: 'ABACATE KG',
//         quantidade: 0.66,
//         unidade: 'KG',
//         preco: 10.29,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 6.79
//       },
//       {
//         descricao: 'MACA FUJI KG',
//         quantidade: 0.71,
//         unidade: 'KG',
//         preco: 11.39,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 8.09
//       },
//       {
//         descricao: 'BANANA PRATA KG',
//         quantidade: 1.13,
//         unidade: 'KG',
//         preco: 2.99,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 3.38
//       },
//       {
//         descricao: 'IOG FLAMBOYANT POP MOR 850G',
//         quantidade: 1,
//         unidade: 'UN',
//         preco: 7.19,
//         codigo: null,
//         NCM: null,
//         eanComercial: null,
//         valor_total: 7.19
//       }
//     ]
//   };
  
// describe("Nota Fiscal - AM - Chave 13201103483863000155651040001328551106523742", function () {
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
