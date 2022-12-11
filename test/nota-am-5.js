// const consultaNFE = require("../dist/index");
// const QRCodeURL =
//   "https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp?p=13201122991939001927650060001921921004310139|2|1|1|F9BEC7FFD2368EF1E5A2F8C2C81793681099F1F8"
// const QueryNFE = new consultaNFE(QRCodeURL).get();
// const chai = require("chai");

// //  Resultado Esperado
// const result = {
//     cabecalho: {
//     dataEmissao: new Date('2020-11-07T00:32:27.000Z'),
//     modelo: '',
//     numero: '192192',
//     serie: '6',
//     total: 355.08,
//     dataEntradaSaida: null
//   },
//   emitente: {
//     nome: 'SUPERMERCADOS DB LTDA',
//     razaoSocial: 'SUPERMERCADOS DB LTDA',
//     cnpj: 'CNPJ:22.991.9390019-27',
//     estado: 'AM',
//     rua: 'RUALINDONJOHNSON',
//     numero: '100',
//     bairro: 'PQ.DEZ',
//     cep: null,
//     cidade: 'MANAUS',
//     telefone: null,
//     ibge: null
//   },
//   produtos: [
//     {
//       descricao: 'REFRIG COCA COLA 350ML LT',
//       quantidade: 12,
//       unidade: 'UN',
//       preco: 1.95,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 23.4
//     },
//     {
//       descricao: 'COPO NADIR BAR LONG DRINK 340ML 260',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.29,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.29
//     },
//     {
//       descricao: 'COPO NADIR BAR LONG DRINK 340ML 260',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.29,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.29
//     },
//     {
//       descricao: 'COPO NADIR BAR LONG DRINK 340ML 260',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.29,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.29
//     },
//     {
//       descricao: 'COPO NADIR BAR LONG DRINK 340ML 260',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.29,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.29
//     },
//     {
//       descricao: 'COLHER TRAM MESA LEME AZU 23183410',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 1.85,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.85
//     },
//     {
//       descricao: 'COLHER TRAM MESA LEME AZU 23183410',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 1.85,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.85
//     },
//     {
//       descricao: 'FACA TRAM CHURR LEME AZ 23180414',
//       quantidade: 4,
//       unidade: 'UN',
//       preco: 1.85,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 7.4
//     },
//     {
//       descricao: 'GARFO TRAM MESA LEME AZ 23182410',
//       quantidade: 2,
//       unidade: 'UN',
//       preco: 1.85,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.7
//     },
//     {
//       descricao: 'CANECA OXFORD DALAS HORT 280ML AK70',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 8.89,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 8.89
//     },
//     {
//       descricao: 'CANECA OXFORD DALAS HORT 280ML AK70',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 8.89,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 8.89
//     },
//     {
//       descricao: 'CANECA OXFORD DALAS HORT 280ML AK70',
//       quantidade: 2,
//       unidade: 'UN',
//       preco: 8.89,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 17.78
//     },
//     {
//       descricao: 'MILHO PPIP CAMPIL 500G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.09
//     },
//     {
//       descricao: 'CAFE ALMOF PILAO 250G',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 4.39,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.39
//     },
//     {
//       descricao: 'CAFE ALMOF PILAO 250G',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 4.39,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.39
//     },
//     {
//       descricao: 'BICARBONATO SODIO HIKARI 70GR',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 2.65,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.65
//     },
//     {
//       descricao: 'BISC SECO AFA NORA 400G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.29,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.29
//     },
//     {
//       descricao: 'LEITE PO PIRACANJ INT 400G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 11.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 11.99
//     },
//     {
//       descricao: 'ACUCAR CRISTAL ITAMARATI 1KG',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 2.79,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.79
//     },
//     {
//       descricao: 'ACUCAR CRISTAL ITAMARATI 1KG',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 2.79,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.79
//     },
//     {
//       descricao: 'FEIJAO CARIOCA KICALDO TP1 1KG',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 6.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 6.99
//     },
//     {
//       descricao: 'VINAGRE MINHOTO MACA 500ML FR',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 3.89,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.89
//     },
//     {
//       descricao: 'NESTON VIT NESTLE MBP 400G',
//       quantidade: 1,
//       unidade: 'LA',
//       preco: 14.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 14.99
//     },
//     {
//       descricao: 'AGUA SANIT BRILUX COMUM 1L',
//       quantidade: 1,
//       unidade: 'FR',
//       preco: 2.49,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.49
//     },
//     {
//       descricao: 'AGUA SANIT BRILUX COMUM 1L',
//       quantidade: 1,
//       unidade: 'FR',
//       preco: 2.49,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.49
//     },
//     {
//       descricao: 'LIMP VEJA AR POWER LARANJA 500ML',
//       quantidade: 1,
//       unidade: 'FR',
//       preco: 4.79,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.79
//     },
//     {
//       descricao: 'LAVA ROUPA PO OMO LAV PERF 400G CX',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 6.38,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 6.38
//     },
//     {
//       descricao: 'ESPONJA ACO BOMBRIL 8UN PT',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 1.95,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.95
//     },
//     {
//       descricao: 'ALVEJANTE VANISH PO WHITE 400GR RF',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 13.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 13.09
//     },
//     {
//       descricao: 'ESPONJA BOMBRIL MULTIUSO LV4PG3',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 3.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.99
//     },
//     {
//       descricao: 'PORTA COPO ALKLIN HOME C4 N9 8571',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 5.49,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 5.49
//     },
//     {
//       descricao: 'PA CONDOR PLAST PLIXO 1507',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 7.39,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 7.39
//     },
//     {
//       descricao: 'SAB PROTEX AVEIA 85G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.45,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.45
//     },
//     {
//       descricao: 'SAB DOVE REVIGORANTE 90G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.45,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.45
//     },
//     {
//       descricao: 'SAB DOVE KARITEBAUN 90G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 3.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.09
//     },
//     {
//       descricao: 'SAB DOVE KARITEBAUN 90G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 3.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.09
//     },
//     {
//       descricao: 'SAB DOVE REVIGORANTE 90G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.45,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.45
//     },
//     {
//       descricao: 'SAB PROTEX BALANCE 85G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.45,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.45
//     },
//     {
//       descricao: 'APAR BARB PRESTO3 C4UN',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 27.49,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 27.49
//     },
//     {
//       descricao: 'SAB LIQ INT LUCRETIN NEUTRO 200ML',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 17.49,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 17.49
//     },
//     {
//       descricao: 'NAFTALINA GRAN BOLAS SANILAR 50G',
//       quantidade: 1,
//       unidade: 'SC',
//       preco: 1.25,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.25
//     },
//     {
//       descricao: 'SABAO NUTRILAR COCO 500G',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 4.49,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.49
//     },
//     {
//       descricao: 'DETERG LIQ MINUANO NEU 500ML',
//       quantidade: 1,
//       unidade: 'FR',
//       preco: 2.45,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.45
//     },
//     {
//       descricao: 'DETERG LIQ MINUANO NEU 500ML',
//       quantidade: 1,
//       unidade: 'FR',
//       preco: 2.45,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.45
//     },
//     {
//       descricao: 'JARRA NADIR LADRILHOS 1 2L 5412',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 19.69,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 19.69
//     },
//     {
//       descricao: 'PAPEL HIG FLORAL PERF C4 PT',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 3.59,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 3.59
//     },
//     {
//       descricao: 'FARINHA TRIGO TRIGOLAR ESP 1KG',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 4.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 4.09
//     },
//     {
//       descricao: 'ARROZ BCO FACCIO TP1 1 KG',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 5.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 5.09
//     },
//     {
//       descricao: 'ARROZ BCO FACCIO TP1 1 KG',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 5.09,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 5.09
//     },
//     {
//       descricao: 'MOLHO SOJA SAKURA TRAD 150ML',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 2.85,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 2.85
//     },
//     {
//       descricao: 'MOLHO INGLES CAMPIL 150ML',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 1.89,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.89
//     },
//     {
//       descricao: 'PAPEL HIG CELUS C4 PT',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 1.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.99
//     },
//     {
//       descricao: 'PAPEL HIG CELUS C4 PT',
//       quantidade: 1,
//       unidade: 'PT',
//       preco: 1.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 1.99
//     },
//     {
//       descricao: 'SORVETE LACTA SONHO VALSA 1 5L',
//       quantidade: 1,
//       unidade: 'UN',
//       preco: 26.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 26.99
//     },
//     {
//       descricao: 'LIMP VEJA AR SENSE FRESCOR 2L',
//       quantidade: 1,
//       unidade: 'FR',
//       preco: 7.99,
//       codigo: null,
//       NCM: null,
//       eanComercial: null,
//       valor_total: 7.99
//     }
//   ]
//   };
  
// describe("Nota Fiscal - AM  - Chave 13201122991939001927650060001921921004310139", function () {
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
