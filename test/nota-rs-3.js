const consultaNFE = require('../dist/index')
const QRCodeURL = 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43180907718633001584650050002139521005139526&nVersao=100&tpAmb=1&cDest=03013156040&dhEmi=323031382d30392d30365431383a33373a35322d30333a3030&vNF=227.13&vICMS=4.25&digVal=566b312b4b6b4d327578336f316957554e636870314970717454553d&cIdToken=000001&cHashQRCode=BE502D0C13C12F23626945C5D50F77E4D3C60CE4'
const QueryNFE = new consultaNFE(QRCodeURL).get();
const chai = require('chai')

//  Resultado Esperado
const result = {
  cabecalho: {
    dataEmissao: new Date('2018-09-06T21:37:52.000Z'),
    dataEntradaSaida: null,
    modelo: '65',
    numero: '213952',
    serie: '5',
    total: 227.13
  },
  emitente: {
    nome: 'UNIDASUL FILIAL-01',
    razaoSocial: 'UNIDASUL DISTRIBUIDORA ALIMENTICIA S/A',
    cnpj: '07.718.633/0015-84',
    rua: 'AV SAO PEDRO, 512',
    bairro: 'NAVEGANTES',
    cep: 90230120,
    cidade: 'PORTO ALEGRE',
    telefone: '(51)3337-3999',
    estado: 'RS',
    ibge: 4314902
  },
  produtos: [
    { descricao: 'LEITE PO NINHO INST 400g', quantidade: 2, unidade: 'UN', preco: 32.98, codigo: 22187, NCM: 4022110, eanComercial: 7891000142202 },
    { descricao: 'LEITE L VIDA STA CLARA INTEG 1L', quantidade: 3, unidade: 'UN', preco: 9.57, codigo: 8477750, NCM: 4011010, eanComercial: 7896504305078 },
    { descricao: 'MAION HELLMANNS SACHET 200g', quantidade: 1, unidade: 'un', preco: 2.88, codigo: 8558398, NCM: 21039011, eanComercial: 7894000030470 },
    { descricao: 'WAFER ISABELA CHOC BCO 145g', quantidade: 2, unidade: 'UN', preco: 3.58, codigo: 8982995, NCM: 19053200, eanComercial: 7896022055950 },
    { descricao: 'OLEO SOJA CAMERA PET  900ml', quantidade: 2, unidade: 'UN', preco: 5.78, codigo: 9061781, NCM: 15079011, eanComercial: 7898401540040 },
    { descricao: 'RAP 10 TRAD 330g', quantidade: 2, unidade: 'UN', preco: 12.8, codigo: 9197930, NCM: 19059090, eanComercial: 7896002363792 },
    { descricao: 'CHAIRA MOR BCA RF3343 UN', quantidade: 1, unidade: 'UN', preco: 9.5, codigo: 9398528, NCM: 82031090, eanComercial: 7896020633433 },
    { descricao: 'CREME RITTER AVELA C/CACAU 250g', quantidade: 4, unidade: 'UN', preco: 47.92, codigo: 9531994, NCM: 18069000, eanComercial: 7896104806203 },
    { descricao: 'COND ELSEVE SUPREME CONTROL 4D 200ml', quantidade: 1, unidade: 'UN', preco: 11.9, codigo: 9669635, NCM: 33059000, eanComercial: 7899706117753 },
    { descricao: 'SH ELSEVE SUPREME CONTROL 4D 400ml', quantidade: 1, unidade: 'UN', preco: 15.9, codigo: 9669659, NCM: 33051000, eanComercial: 7899706117739 },
    { descricao: 'CATCHUP HEMMER TRAD 320g', quantidade: 1, unidade: 'UN', preco: 5.8, codigo: 9703032, NCM: 21032010, eanComercial: 7891031409404 },
    { descricao: 'BISC CLUB SOCIAL ORIGINAL 144g', quantidade: 4, unidade: 'UN', preco: 11.92, codigo: 9735323, NCM: 19059020, eanComercial: 7622300990701 },
    { descricao: 'CHOC SNICKERS 2 BARS 93,3g', quantidade: 2, unidade: 'UN', preco: 11.98, codigo: 9752559, NCM: 18063110, eanComercial: 7896423412888 },
    { descricao: 'COMPOSTO ERVA MATE SCHN TERERE ABACAXI 250g', quantidade: 1, unidade: 'UN', preco: 6.5, codigo: 9765474, NCM: 9030090, eanComercial: 7897265600808 },
    { descricao: 'BISC ADAMS PAO DE MEL 300g', quantidade: 1, unidade: 'UN', preco: 5.7, codigo: 9800250, NCM: 19053100, eanComercial: 7896351300899 },
    { descricao: 'CHOC NESTLE CLASSIC AO LEITE 100g', quantidade: 1, unidade: 'UN', preco: 3.98, codigo: 9806092, NCM: 18063210, eanComercial: 7891000243121 },
    { descricao: 'CHOC NESTLE CLASSIC MEIO AMARGO 100g', quantidade: 1, unidade: 'UN', preco: 3.98, codigo: 9806122, NCM: 18063210, eanComercial: 7891000243060 },
    { descricao: 'CHOC NEUGEBAUER COOKIES 95g', quantidade: 1, unidade: 'UN', preco: 3.79, codigo: 9856431, NCM: 17049010, eanComercial: 7891330016778 },
    { descricao: 'CHOC NEUGEBAUER PRETO/BCO 100g', quantidade: 1, unidade: 'UN', preco: 3.79, codigo: 9856523, NCM: 18063210, eanComercial: 7891330016747 },
    { descricao: 'FRIGIDEIRA NIGRO ALUM ANTIAD FEIRA UN', quantidade: 1, unidade: 'UN', preco: 19.9, codigo: 9872868, NCM: 76151000, eanComercial: 7891232251611 }
  ]
}

describe('Nota Fiscal - RS - Chave 43180907718633001584650050002139521005139526', function () {
  this.timeout(0);
  it('Cabeçalho', done => {
    QueryNFE
      .then(NFE => {
        chai.expect(NFE.cabecalho).to.deep.equal(result.cabecalho)
        done()
      })
      .catch(done)
  })

  it('Emitente', done => {
    QueryNFE
      .then(NFE => {
        chai.expect(NFE.emitente).to.deep.equal(result.emitente)
        done()
      })
      .catch(done)
  })

  it('Produtos/Serviços', done => {
    QueryNFE
      .then(NFE => {
        chai.expect(NFE.produtos).to.deep.equal(result.produtos)
        done()
      })
      .catch(done)
  })
}); 