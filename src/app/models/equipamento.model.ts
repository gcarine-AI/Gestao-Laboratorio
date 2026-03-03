export interface Equipamento {
  id: number;
  nome: string;
  tipo: string;
  estado: 'Disponível' | 'Em manutenção' | 'Em uso'
  localizacao: string;
  dataAquisicao: Date;
}

