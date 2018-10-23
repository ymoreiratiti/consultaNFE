const consultaNFE = require('./dist/index')
const QRCodeURL = 'https://www.sefaz.rs.gov.br/NFCE/NFCE-COM.aspx?chNFe=43181012384687000438651040002069031002069033&nVersao=100&tpAmb=1&cDest=03013156040&dhEmi=323031382D31302D31335431303A34383A32352D30333A3030&vNF=41.33&vICMS=0.00&digVal=4B6C68775A4A4A744D6D396D636264625238794937712B384939303D&cIdToken=000004&cHashQRCode=45EF73C4A9FD11FE6636C6D41678B12F863D6AA7'

var QueryNFE = new consultaNFE(QRCodeURL).get();

QueryNFE
  .then(Res => {
    console.log(JSON.stringify(Res))
  })
  .catch(Err => {
    throw Err
  })