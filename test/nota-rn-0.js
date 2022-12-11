// const consultaNFE = require('../dist/index')
// const QRCodeURL = 'http://nfce.set.rn.gov.br/consultarNFCe.aspx?p=24200816233389003251650130000188671000191710|2|1|1|6DDB7D66348E3378E1E97C774BA00770207EB504'
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require('chai')

// //  Resultado Esperado
// const result = {
//   cabecalho: {
//     dataEmissao: new Date('2020-08-20T21:03:01.000Z'),
//     dataEntradaSaida: null,
//     modelo: '',
//     numero: '18867',
//     serie: '013',
//     total: 15.94
//   },
//   emitente: {
//     nome: 'Lb Sh Midway Mall',
//     razaoSocial: 'LOJAS LE BISCUIT S/A',
//     cnpj: '16.233.389/0032-51',
//     rua: null,
//     bairro: null,
//     cep: null,
//     cidade: null,
//     telefone: null,
//     estado: 'RN',
//     ibge: null
//   },
//   produtos: [
//     {
//       descricao: 'HT SECA SEMPRE VIVA GRILLO CR 37726 010',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.98,
//       codigo: null,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'HT SECA SEMPRE VIVA GRILLO CR 37726 010',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.98,
//       codigo: null,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'MINI TRAVESSA LE SWEET 16CM',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null
//     },
//     {
//       descricao: 'MINI TRAVESSA LE SWEET 16CM',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null
//     }
//   ]
// }

// describe('Nota Fiscal - RN - Chave 24200816233389003251650130000188671000191710', function () {
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