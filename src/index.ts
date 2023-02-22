import consulta from './consulta';

export = class ConsultaNFE {
  public qrCodeURL: URL;
  public uf: string = '';
  public consulta: any = consulta;

  /**
   * Constructor
   * @param url URL do QRCode da NFE
   */
  constructor(url: string) {
    this.qrCodeURL = new URL(url);
    this.detectUF();
    this.consulta = new this.consulta[this.uf](this.qrCodeURL);
  }

   /*
   * Retorna uma promise com os dados coletados
   */
  public get() {
    return this.consulta.get();
  }

  /**
   * Detecta a qual Unidade Federativa ele pertence
   */
  public detectUF() {
    const lstHostSefaz: { [key: string]: string } = {
      'www.sefaz.rs.gov.br': 'rs',
      'nfce.fazenda.mg.gov.br': 'mg',
      'portalsped.fazenda.mg.gov.br': 'mg',
      'nfce.sefaz.ce.gov.br': 'ce',
      'nfce.set.rn.gov.br': 'rn',
      'sistemas.sefaz.am.gov.br': 'am',
      'www4.fazenda.rj.gov.br': 'rj',
    };

    this.uf = lstHostSefaz[this.qrCodeURL.host.trim().toLowerCase()] || '';
    if (!this.uf.length) throw new Error('Não foi possível detectar a UF');
  }
};
