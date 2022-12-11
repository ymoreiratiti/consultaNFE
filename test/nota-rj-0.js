const consultaNFE = require("../dist/index");
const QRCodeURL =
	"http://www4.fazenda.rj.gov.br/consultaNFCe/QRCode?p=33200710834199000107651260002200661002204684|2|1|1|f200be89104d9b1e8aebb08c3b379bc7d3005ce9";
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require("chai");

//  Resultado Esperado
const result = {
	cabecalho: {
		dataEmissao: new Date("2020-07-04T20:00:48.000Z"),
		numero: "220066",
		serie: "126",
		total: 15.62,
		tributacao: 2.46,
		dataEntradaSaida: null,
		modelo: null,
	},
	emitente: {
		nome: "Hortifruit Quitandinha Ltda.",
		razaoSocial: "Hortifruit Quitandinha Ltda.",
		cnpj: "10.834.199/0001-07",
		rua: "Rua General Rondom, 288",
		bairro: "Quitandinha",
		cidade: "RJ",
		estado: "Petrópolis",
		telefone: null,
		cep: null,
		ibge: null,
	},
	produtos: [
		{
			descricao: "BANANA PRATA IN N.KG",
			quantidade: 0.7,
			unidade: "KG",
			preco: 4.59,
			codigo: 45,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "UVA VITORIA S.IN N.500",
			quantidade: 1,
			unidade: "UN",
			preco: 6.97,
			codigo: 131766,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "LEITE A.F.I.B.6.CJ 450",
			quantidade: 1,
			unidade: "UN",
			preco: 5.39,
			codigo: 126103,
			NCM: null,
			eanComercial: null,
		},
		{
			descricao: "SACOLA PLAST ALCA 4KG",
			quantidade: 1,
			unidade: "UN",
			preco: 0.05,
			codigo: 172705,
			NCM: null,
			eanComercial: null,
		},
	],
};

describe("Nota Fiscal - RJ - Chave 33200710834199000107651260002200661002204684", function () {
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
