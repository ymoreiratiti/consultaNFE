// const consultaNFE = require('../dist/index')
// const QRCodeURL = 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?p=43181012384687000438651020003078229003078222|2|1|20|179.63|446342616D41346459566D56364653522B5A47672B35334F376E343D|4|7521734A467A8901756BCD80BB3A4BF8AAFD56E5'
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require('chai')

// //  Resultado Esperado
// const result = {
//   cabecalho:
//   {
//     dataEmissao: new Date('2018-10-20T19:38:41.000Z'),
//     dataEntradaSaida: null,
//     modelo: '65',
//     numero: '307822',
//     serie: '102',
//     total: 179.63
//   },
//   emitente:
//   {
//     nome: 'FORMENTON FL03',
//     razaoSocial: 'SUPERMERCADOS FORMENTON LTDA FL 3',
//     cnpj: '12.384.687/0004-38',
//     rua: 'RUA NELSON PAIM TERRA, 934',
//     bairro: 'RIO BRANCO',
//     cep: 92200040,
//     cidade: 'CANOAS',
//     telefone: '(51)3031-1850',
//     estado: 'RS',
//     ibge: 4304606
//   },
//   produtos: [
//     { descricao: 'CARVAO IVOTI 4kg VEGETAL', quantidade: 1, unidade: 'UN', preco: 12.98, codigo: 26725, NCM: 44029000, eanComercial: 7898064990046 },
//     { descricao: 'PAO ALHO BUONGUSTO 310G', quantidade: 1, unidade: 'UN', preco: 6.99, codigo: 94956, NCM: 19052090, eanComercial: 7898098177178 },
//     { descricao: 'ENERGETICO RED HORSE 2L', quantidade: 1, unidade: 'UN', preco: 9.98, codigo: 1145, NCM: 22029900, eanComercial: 7898422676544 },
//     { descricao: 'CEREAL NESTLE 120G SC NESCAU', quantidade: 1, unidade: 'UN', preco: 4.89, codigo: 49834, NCM: 19041000, eanComercial: 7891000070673 },
//     { descricao: 'FLOCOS MILHO NATURA LIFE 150G FRUIT RINGS', quantidade: 1, unidade: 'UN', preco: 5.49, codigo: 19643, NCM: 19041000, eanComercial: 7898332900951 },
//     { descricao: 'TORRADA VISCONTI 120G SALGADA', quantidade: 1, unidade: 'UN', preco: 1.98, codigo: 91279, NCM: 19054000, eanComercial: 7891962052564 },
//     { descricao: 'MOLHO TOMATE QUERO 340G SC TRAD', quantidade: 2, unidade: 'UN', preco: 3.58, codigo: 347, NCM: 21039021, eanComercial: 7896102509410 },
//     { descricao: 'FARINHA BEIJU BOM 500G TAPIOCA', quantidade: 1, unidade: 'UN', preco: 7.98, codigo: 38352, NCM: 19030000, eanComercial: 7898313920312 },
//     { descricao: 'LING CARRER FGO RESF kg', quantidade: 0.756, unidade: 'KG', preco: 12.08, codigo: 42528, NCM: 16010000, eanComercial: null },
//     { descricao: 'VAZIO BOV kg', quantidade: 0.938, unidade: 'KG', preco: 24.37, codigo: 12274, NCM: 2013000, eanComercial: null },
//     { descricao: 'CARNE BOV MOIDA PRIMEIRA kg', quantidade: 0.314, unidade: 'KG', preco: 7.53, codigo: 12794, NCM: 2013000, eanComercial: null },
//     { descricao: 'CARNE BOV MOIDA PRIMEIRA kg', quantidade: 0.314, unidade: 'KG', preco: 7.53, codigo: 12794, NCM: 2013000, eanComercial: null },
//     { descricao: 'CARNE BOV MOIDA PRIMEIRA kg', quantidade: 0.35, unidade: 'KG', preco: 8.39, codigo: 12794, NCM: 2013000, eanComercial: null },
//     { descricao: 'SABON NIVEA 85G HIDRAT ERVA DOCE/OLEOS', quantidade: 2, unidade: 'UN', preco: 2.78, codigo: 92524, NCM: 34011190, eanComercial: 4005900521934 },
//     { descricao: 'SABON NIVEA 85G HIDRAT LAVANDA/OLEOS', quantidade: 2, unidade: 'UN', preco: 2.78, codigo: 92522, NCM: 34011190, eanComercial: 4005900521972 },
//     { descricao: 'SABON NIVEA 85G HIDRAT TALCO/OLE AMEN', quantidade: 2, unidade: 'UN', preco: 2.78, codigo: 92521, NCM: 34011190, eanComercial: 4005900521996 },
//     { descricao: 'SABON NIVEA 85G HIDRAT ORQUIDEA', quantidade: 1, unidade: 'UN', preco: 1.39, codigo: 92523, NCM: 34011190, eanComercial: 4005900522016 },
//     { descricao: 'REFRIG COCA COLA 2L PET TRAD', quantidade: 1, unidade: 'UN', preco: 5.69, codigo: 12688, NCM: 22021000, eanComercial: 7894900011517 },
//     { descricao: 'ACENDEDOR ZEPPELIN 440G GEL', quantidade: 1, unidade: 'UN', preco: 8.49, codigo: 20515, NCM: 22071090, eanComercial: 7896474600425 },
//     { descricao: 'SACO LIXO CINOPLAST 100L', quantidade: 1, unidade: 'UN', preco: 4.39, codigo: 18844, NCM: 39232110, eanComercial: 7898082320047 },
//     { descricao: 'SABON NIVEA 85G HIDRAT LEITE', quantidade: 2, unidade: 'UN', preco: 2.78, codigo: 92525, NCM: 34011190, eanComercial: 4005900521910 },
//     { descricao: 'SABON NIVEA 85G HIDRAT ORQUIDEA', quantidade: 1, unidade: 'UN', preco: 1.39, codigo: 92523, NCM: 34011190, eanComercial: 4005900522016 },
//     { descricao: 'ENERGETICO BURN 260ML LT', quantidade: 1, unidade: 'UN', preco: 5.49, codigo: 12601, NCM: 22029900, eanComercial: 815154021203 },
//     { descricao: 'SANDALIA IPANEMA WAY 37 RS/LAR NE', quantidade: 1, unidade: 'UN', preco: 27.9, codigo: 94230, NCM: 64022000, eanComercial: 7909224944653 }
//   ]
// }

// describe('Nota Fiscal - RS - Chave 43181012384687000438651020003078229003078222', function () {
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