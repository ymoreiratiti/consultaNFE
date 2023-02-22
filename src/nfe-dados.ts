export interface ICabecalho {
  modelo: string | null;
  serie: string;
  numero: string;
  dataEmissao: Date | null;
  dataEntradaSaida: Date | null;
  tributacao: number | null;
  total: number;
}

export interface IEmitente {
  nome: string;
  razaoSocial: string;
  cnpj: string;
  rua: string | null;
  bairro: string | null;
  cidade: string | null;
  estado: string;
  telefone: string | null;
  cep: number | null;
  ibge: number | null;
  numero?: string | null;
}

export interface IProduto {
  descricao: string;
  quantidade: number;
  unidade: string;
  preco: number;
  codigo: number | null;
  NCM: number | null;
  eanComercial: number | null;
  valor_total?: number | null;
}

export default interface IRootObject {
  cabecalho: ICabecalho;
  emitente: IEmitente;
  produtos: IProduto[];
}
