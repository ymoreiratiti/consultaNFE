// const consultaNFE = require('../dist/index')
// const QRCodeURL = 'http://nfce.fazenda.mg.gov.br/portalnfce/sistema/qrcode.xhtml?p=31200217745613001041650080000311271983498602|2|1|1|56fe7d60a407df2cb86db7e0d44464fbf0ff3491'
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require('chai')

// //  Resultado Esperado
// const result = {
//   cabecalho: {
//     dataEmissao: new Date('2020-02-18T15:55:36.000Z'),
//     dataEntradaSaida: null,
//     modelo: '65',
//     numero: '31127',
//     serie: '8',
//     total: 63.67
//   },
//   emitente: {
//     nome: 'SUPERMERCADO BAHAMAS S/A',
//     razaoSocial: 'SUPERMERCADO BAHAMAS S/A',
//     cnpj: '17.745.613/0010-41',
//     rua: null,
//     bairro: null,
//     cep: null,
//     cidade: null,
//     telefone: null,
//     estado: 'MG',
//     ibge: null
//   },
//   produtos: [
//     {
//       descricao: 'PANO M-USO WISH C/5',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 3.99,
//       codigo: 21494,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'LIMP AJAX 1LT FRESH',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 10.99,
//       codigo: 369,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'DESINF P SOL PG450ML',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 5.19,
//       codigo: 7650,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'FILT/PAP BRIGIT C/30',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 2.98,
//       codigo: 108252,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'TORRADA BAUDUCCO 142',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 3.59,
//       codigo: 116401,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'MANTEIGA S MINAS 500',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 13.9,
//       codigo: 98191,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'IOG ITAMBE 850G MOR',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 8.98,
//       codigo: 121395,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'CR RICOTA P.ALEG 200',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 5.49,
//       codigo: 86883,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'P HIG TENDERL L12P11',
//       quantidade: 10000,
//       unidade: 'UN',
//       preco: 12.9,
//       codigo: 106722,
//       NCM: null,
//       eanComercial: null
//     }
//   ]
// }

// describe('Nota Fiscal - MG - Chave 31200217745613001041650080000311271983498602', function () {
//   this.timeout(0);
//   it('Cabeçalho', done => {
//     QueryNFE
//       .then(NFE => {
//         chai.expect(NFE.cabecalho).to.deep.equal(result.cabecalho)
//         done()
//       })
//       .catch(done)
//   })

//   it('Emitente', done => {
//     QueryNFE
//       .then(NFE => {
//         chai.expect(NFE.emitente).to.deep.equal(result.emitente)
//         done()
//       })
//       .catch(done)
//   })

//   it('Produtos/Serviços', done => {
//     QueryNFE
//       .then(NFE => {
//         chai.expect(NFE.produtos).to.deep.equal(result.produtos)
//         done()
//       })
//       .catch(done)
//   })
// }); 