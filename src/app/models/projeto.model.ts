export interface Projeto {
  id: number;
  titulo: string;
  descricao: string;
  area: string;
  estado: 'Em curso' | 'Concluído' | 'Em pausa';
  dataInicio: Date;
  investigadorId: number;
}
