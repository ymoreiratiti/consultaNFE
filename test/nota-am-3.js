const consultaNFE = require("../dist/index");
const QRCodeURL =
	"https://sistemas.sefaz.am.gov.br/nfceweb/consultarNFCe.jsp?p=13201109295901000122650010000463601000463614|2|1|1|FBEBD22BB3103D18FCB7D7CB9DBB5FD3372F8E42";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
    cabecalho: {
    dataEmissao: new Date('2020-11-09T16:56:27.000Z'),
    modelo: '',
    numero: '46360',
    serie: '1',
    total: 114.9,
    dataEntradaSaida: null
  },
  emitente: {
    nome: 'J C DA SILVA NORONHA EIRELI',
    razaoSocial: 'J C DA SILVA NORONHA EIRELI',
    cnpj: 'CNPJ:09.295.9010001-22',
    estado: 'AM',
    rua: 'AVENIDADJALMABATISTA',
    numero: '105',
    bairro: '',
    cep: null,
    cidade: 'CHAPADA',
    telefone: null,
    ibge: null
  },
  produtos: [
    {
      descricao: 'CESTO DE LIXO RED. TELADO FERBRO',
      quantidade: 1,
      unidade: 'UNI',
      preco: 35.9,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 35.9
    },
    {
      descricao: 'KIT COMP. P/ CX. ACOP. BOTAO SUPERIOR - OK BRASIL',
      quantidade: 1,
      unidade: 'UNI',
      preco: 79,
      codigo: null,
      NCM: null,
      eanComercial: null,
      valor_total: 79
    }
  ]
  };
  
describe("Nota Fiscal - AM  - Chave 13201109295901000122650010000463601000463614", function () {
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
