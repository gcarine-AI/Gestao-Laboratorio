import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabService } from '../../services/lab';
import { Projeto } from '../../models/projeto.model';
import { StatusPipe } from '../../pipes/status-pipe';

@Component({
  selector: 'app-projetos',
  imports: [RouterLink, StatusPipe],
  templateUrl: './projetos.html',
  styleUrl: './projetos.css',
})
export class Projetos implements OnInit {
  private labService = inject(LabService);

  projetos: Projeto[] = [];
  projetosFiltrados: Projeto[] = [];
  termoPesquisa = '';
  filtroEstado = 'todos';
  ordenacao = 'titulo';

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.projetos = this.labService.getProjetos();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultado = [...this.projetos];

    if (this.termoPesquisa.trim()) {
      const termo = this.termoPesquisa.toLowerCase();
      resultado = resultado.filter(
        (p) => p.titulo.toLowerCase().includes(termo) || p.area.toLowerCase().includes(termo),
      );
    }

    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter((p) => p.estado === this.filtroEstado);
    }
    resultado.sort((a, b) => {
      if (this.ordenacao === 'titulo') {
        return a.titulo.localeCompare(b.titulo);
      }
      if (this.ordenacao === 'area') {
        return a.area.localeCompare(b.area);
      }
      return 0;
    });

    this.projetosFiltrados = resultado;
  }

  apagar(id: number): void {
    if (confirm('Tem a certeza que quer apagar este Projeto?')) {
      this.labService.apagarProjetos(id);
      this.carregar();
    }
  }
}
