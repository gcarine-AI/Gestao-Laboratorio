import { Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabService } from '../../services/lab';
import { Equipamento } from '../../models/equipamento.model';
import { StatusPipe } from '../../pipes/status-pipe';

@Component({
  selector: 'app-equipamentos',
  imports: [RouterLink, StatusPipe],
  templateUrl: './equipamentos.html',
  styleUrl: './equipamentos.css',
})
export class Equipamentos implements OnInit {

  equipamentos: Equipamento [] = [];
  equipamentosFiltrados: Equipamento [] = [];
  termoPesquisa = "";
  filtroEstado = "todos";
  ordenacao = "nome";

  constructor (private labService: LabService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.equipamentos = this.labService.getEquipamentos();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultado = [...this.equipamentos];

    if (this.termoPesquisa.trim()) {
      const termo = this.termoPesquisa.toLowerCase();
      resultado = resultado.filter(e =>
        e.nome.toLowerCase().includes(termo) ||
        e.tipo.toLowerCase().includes(termo) ||
        e.localizacao.toLowerCase().includes(termo)
      )
    }

    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter( e => e.estado === this.filtroEstado)
    }
      resultado.sort((a,b) => {
        if (this.ordenacao === 'nome') {
          return a.nome.localeCompare(b.nome);
        }
        if (this.ordenacao === 'tipo'){
          return a.tipo.localeCompare(b.tipo);
        }
        /*if (this.ordenacao === 'localizacao') {
          return a.localizacao.localeCompare(b.localizacao)
        }*/
      return 0;
      });

      this.equipamentosFiltrados = resultado;
  }

  apagar(id:number): void {
      if (confirm("Tem a certeza que quer apagar este Equipamento?")) {
      this.labService.apagarEquipamentos(id);
      this.carregar();
    }
  }
}

