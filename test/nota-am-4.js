const consultaNFE = require("../dist/index");
const QRCodeURL =
	"https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp?p=13201003483863000155651180001251281522769601|2|1|1|492b7e7706c95059408ea66b9b3c387dc12ebf3c";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
    cabecalho: {
    dataEmissao: new Date('2020-10-28T20:21:04.000Z'),
    modelo: '',
    numero: '125128',
    serie: '118',
    total: 29.62,
    dataEntradaSaida: null
  },
  emitente: {
    nome: 'Medeiros Comercio de Alimentos Ltda - Me',
    razaoSocial: 'Medeiros Comercio de Alimentos Ltda - Me',
    cnpj: 'CNPJ:03.483.8630001-55',
    estado: 'AM',
    rua: 'AvenidaTorquatoTapajos',
    numero: '5200',
    bairro: 'Flores',
    cep: null,
    cidade: 'MANAUS',
    telefone: null,
    ibge: null
  },
  produtos: [
    {
      descricao: 'CF REFEICAO KG',
      quantidade: 0.048,
      unidade: 'KG',
      preco: 37.9,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 1.82
    },
    {
      descricao: 'CF CAPPUCCINO ITALIANO UN',
      quantidade: 1,
      unidade: 'UN',
      preco: 9,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 9
    },
    {
      descricao: 'CF PAO C QUEIJO E OVO UN',
      quantidade: 1,
      unidade: 'UN',
      preco: 6.9,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 6.9
    },
    {
      descricao: 'CF MACHIATTO UN',
      quantidade: 1,
      unidade: 'UN',
      preco: 5,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 5
    },
    {
      descricao: 'CF TAPIOCA C BANANA',
      quantidade: 1,
      unidade: 'UN',
      preco: 6.9,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 6.9
    }
  ]
  };
  
describe("Nota Fiscal - AM  - Chave 13201003483863000155651180001251281522769601", function () {
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
