import { Component, OnInit, inject } from '@angular/core';
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
  private labService = inject(LabService);

  equipamentos: Equipamento[] = [];
  equipamentosFiltrados: Equipamento[] = [];
  termoPesquisa = '';
  filtroEstado = 'todos';
  ordenacao = 'nome';

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.labService.getEquipamentos().subscribe(dados=> {
      this.equipamentos = dados;
       this.aplicarFiltros();
    });
  }

  aplicarFiltros(): void {
    let resultado = [...this.equipamentos];

    if (this.termoPesquisa.trim()) {
      const termo = this.termoPesquisa.toLowerCase();
      resultado = resultado.filter(
        (e) =>
          e.nome.toLowerCase().includes(termo) ||
          e.tipo.toLowerCase().includes(termo) ||
          e.localizacao.toLowerCase().includes(termo),
      );
    }

    if (this.filtroEstado !== 'todos') {
      resultado = resultado.filter((e) => e.estado === this.filtroEstado);
    }
    resultado.sort((a, b) => {
      if (this.ordenacao === 'nome') {
        return a.nome.localeCompare(b.nome);
      }
      if (this.ordenacao === 'tipo') {
        return a.tipo.localeCompare(b.tipo);
      }
      return 0;
    });

    this.equipamentosFiltrados = resultado;
  }

  apagar(id: number): void {
    if (confirm('Tem a certeza que quer apagar este Equipamento?')) {
      this.labService.apagarEquipamentos(id).subscribe(() => {
        this.carregar();
      })
    }
  }
}
