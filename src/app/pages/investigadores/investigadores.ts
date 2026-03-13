import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabService } from '../../services/lab';
import { Investigador } from '../../models/investigador.model';

@Component({
  selector: 'app-investigadores',
  imports: [RouterLink],
  templateUrl: './investigadores.html',
  styleUrl: './investigadores.css',
})
export class Investigadores implements OnInit {
  private labService = inject(LabService);

  investigadores: Investigador[] = [];
  investigadoresFiltrados: Investigador[] = [];
  termoPesquisa = '';
  filtroAtivo = 'todos';
  ordenacao = 'nome';

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.investigadores = this.labService.getInvestigadores();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultado = [...this.investigadores];

    if (this.termoPesquisa.trim()) {
      const termo = this.termoPesquisa.toLowerCase();
      resultado = resultado.filter(
        (i) =>
          i.nome.toLowerCase().includes(termo) || i.especialidade.toLowerCase().includes(termo),
      );
    }

    if (this.filtroAtivo === 'ativos') {
      resultado = resultado.filter((i) => i.activo);
    } else if (this.filtroAtivo === 'inativos') {
      resultado = resultado.filter((i) => !i.activo);
    }
    resultado.sort((a, b) => {
      if (this.ordenacao === 'nome') {
        return a.nome.localeCompare(b.nome);
      }
      if (this.ordenacao === 'especialidade') {
        return a.especialidade.localeCompare(b.especialidade);
      }
      return 0;
    });

    this.investigadoresFiltrados = resultado;
  }

  apagar(id: number): void {
    if (confirm('Tem a certeza que quer apagar este investigador?')) {
      this.labService.apagarInvestigadores(id);
      this.carregar();
    }
  }
}
