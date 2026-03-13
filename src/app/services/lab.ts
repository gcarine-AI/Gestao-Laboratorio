import { Injectable } from '@angular/core';
import { Investigador} from '../models/investigador.model';
import { Projeto } from '../models/projeto.model';
import { Equipamento } from '../models/equipamento.model';



@Injectable({
  providedIn: 'root',
})
export class LabService {

  private investigadores: Investigador [] = [
    { id: 1,
      nome: 'Florence Janody',
      email: 'fjanody@lab.pt',
      departamento: 'CRC',
      especialidade: 'Biologia do desenvolvimento',
      activo: true,
      dataCriacao: new Date ('2018-05-01')

    },
    { id: 2,
      nome: 'Alexandre Carmo',
      email: 'acarmo@lab.pt',
      departamento: 'CAGE',
      especialidade: 'Bioquimica',
      activo: true,
      dataCriacao: new Date ('2004-01-01')

    },
      { id: 3,
      nome: 'Jorge Pedrosa',
      email: 'jpedrosa@lab.pt',
      departamento: 'MIRD',
      especialidade: 'Microbiologia da Infeção',
      activo: true,
      dataCriacao: new Date ('2009-09-01')
    },
    { id: 4,
      nome: 'Simon Davis',
      email: 'sdavis@lab.pt',
      departamento: 'TCB ',
      especialidade: 'Biofisica',
      activo: false,
      dataCriacao: new Date ('1999-06-01')

    }
  ]

  private projetos: Projeto [] = [
    { id: 1,
      titulo: 'Estudo de Proteínas',
      descricao: 'Análise de proteínas celulares',
      area: 'Bioquímica',
      estado: 'Em curso',
      dataInicio: new Date('2024-01-10'),
      investigadorId: 2
    },
    { id: 2,
      titulo: 'Mapeamento Genético',
      descricao: 'Sequenciação do genoma humano',
      area: 'Genética',
      estado: 'Em pausa',
      dataInicio: new Date('2023-09-05'),
      investigadorId: 4
    },
    { id: 3,
      titulo: 'Resistência Bacteriana',
      descricao: 'Estudo de bactérias resistentes',
      area: 'Microbiologia',
      estado: 'Concluído',
      dataInicio: new Date('2023-11-01'),
      investigadorId: 3
    },
      { id: 4,
      titulo: 'Cancro da mama',
      descricao: 'A tensão entre tecidos pre-malignos',
      area: 'Biologia',
      estado: 'Em curso',
      dataInicio: new Date('2022-11-01'),
      investigadorId: 1
    },

  ];


  private equipamentos: Equipamento [] = [
    { id: 1,
      nome: 'Microscópio Confocal',
      tipo: 'Ótico',
      estado: 'Em uso',
      localizacao: 'Sala Microscopia',
      dataAquisicao: new Date('2020-05-12')
    },

    { id: 2,
      nome: 'Centrifuga',
      tipo: 'Mecânico',
      estado: 'Disponível',
      localizacao: 'Sala B2',
      dataAquisicao: new Date('2019-08-30')
    },
    { id: 3,
      nome: 'Sequenciador DNA',
      tipo: 'Genético',
      estado: 'Em manutenção',
      localizacao: 'Sala C3',
      dataAquisicao: new Date('2021-02-14')
    },
    { id: 4,
      nome: 'Câmara de fluxo',
      tipo: 'Celular',
      estado: 'Em uso',
      localizacao: 'sala bsl2',
      dataAquisicao: new Date('2024-09-14')
    },
  ];

  construtor () {
    this.carregarDoStorage ();
  }

  private guardarNoStorage(): void {
    localStorage.setItem("investigadores", JSON.stringify(this.investigadores));
    localStorage.setItem("projetos", JSON.stringify(this.projetos));
    localStorage.setItem("equipamento", JSON.stringify(this.equipamentos));
  }

  private carregarDoStorage(): void {
    const inv = localStorage.getItem("investigadores");
    const proj = localStorage.getItem("projetos");
    const equip = localStorage.getItem("equipamentos");

    if(inv) this.investigadores = JSON.parse(inv);
    if(proj) this.projetos = JSON.parse(proj);
    if(equip) this.equipamentos = JSON.parse(equip);

  }

  getInvestigadores(): Investigador [] {
    return this.investigadores;
  }

  getInvestigadoresById(id:number): Investigador | undefined {
    return this.investigadores.find(i => i.id === id)
  }

  adicionarInvestigadores(inv: Omit<Investigador, 'id'>): void {
    const novoId = this.investigadores.length > 0
    ? Math.max(...this.investigadores.map(i => i.id)) + 1 : 1;
    this.investigadores.push({id: novoId, ...inv});
    this.guardarNoStorage();

  }

  editarInvestigadores(atualizado: Investigador): void {
    const index = this.investigadores.findIndex(i => i.id === atualizado.id);
    if (index !== -1) {
      this.investigadores[index] = atualizado;
      this.guardarNoStorage();
    }
  }

  apagarInvestigadores(id:number): void {
    this.investigadores = this.investigadores.filter(i => i.id !== id);
    this.guardarNoStorage();
  }

  getProjetos(): Projeto [] {
    return this.projetos;
  }

  getProjetosById(id:number): Projeto | undefined {
    return this.projetos.find(p => p.id === id);
  }

  adicionarProjetos(proj: Omit<Projeto, "id">): void {
    const novoId = this.projetos.length > 0
    ? Math.max(...this.projetos.map(p => p.id)) + 1 : 1;
    this.projetos.push({id: novoId, ...proj});
    this.guardarNoStorage()
  }

  editarProjetos(atualizado: Projeto): void {
    const index = this.projetos.findIndex(p => p.id === atualizado.id);
    if (index !== -1) {
      this.projetos[index] = atualizado;
      this.guardarNoStorage()
    }
  }

  apagarProjetos(id: number): void {
    this.projetos = this.projetos.filter(p => p.id !== id);
    this.guardarNoStorage();
  }


  getEquipamentos(): Equipamento [] {
    return this.equipamentos;
  }

  getEquipamentosById(id:number): Equipamento | undefined {
    return this.equipamentos.find(e => e.id === id);
  }

   adicionarEquipamentos(equip: Omit<Equipamento, "id">): void {
    const novoId = this.equipamentos.length > 0
    ? Math.max(...this.equipamentos.map(e => e.id)) + 1 : 1;
    this.equipamentos.push({id: novoId, ...equip});
    this.guardarNoStorage()
  }

  editarEquipamentos(atualizado: Equipamento): void {
    const index = this.equipamentos.findIndex(e => e.id === atualizado.id);
    if (index !== -1) {
      this.equipamentos[index] = atualizado;
      this.guardarNoStorage()
    }
  }

    apagarEquipamentos(id: number): void {
    this.equipamentos = this.equipamentos.filter(e => e.id !== id);
    this.guardarNoStorage();
  }

  getTotalInvestigadores():number {
    return this.investigadores.length
  }

  getTotalInvestigadoresAtivos(): number {
    return this.investigadores.filter(i => i.activo).length
  }

   getTotalProjetos():number {
    return this.projetos.length
  }

  getProjetosEmCurso(): number {
    return this.projetos.filter(p => p.estado === "Em curso").length;
  }

  getEquipamentosDisponiveis(): number {
    return this.equipamentos.filter(e => e.estado === "Disponível").length;
  }

  getUltimoItemAdicionado(): Investigador | Projeto | Equipamento | undefined {
    const todos: (Investigador | Projeto | Equipamento)[] = [
      ...this.investigadores,
      ...this.projetos,
      ...this.equipamentos
    ];
    return todos.length > 0 ? todos[todos.length - 1]: undefined

  }

}
