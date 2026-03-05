import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { LabService } from '../../services/lab';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, Card],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit{
  totalInvestigadores = 0;
  investigadoresAtivos = 0;
  totalProjetos = 0;
  projetosEmCurso = 0;
  equipamentosDisponiveis = 0;
  ultimoItem: any = null;
  ultimoItemNome = '';
  ultimoItemTipo = '';

  constructor(private labService: LabService, private rota: Router) {}

    ngOnInit(): void {
      this.carregarDados();

      this.rota.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.carregarDados();
        }
      });
    }
    carregarDados():void {
      this.totalInvestigadores = this.labService.getTotalInvestigadores();
      this.investigadoresAtivos = this.labService.getTotalInvestigadoresAtivos();
      this.totalProjetos = this.labService.getTotalProjetos();
      this.projetosEmCurso = this.labService.getProjetosEmCurso();
      this.equipamentosDisponiveis = this.labService.getEquipamentosDisponiveis();
      this.ultimoItem = this.labService.getUltimoItemAdicionado();

      if (this.ultimoItem) {
        this.ultimoItemNome = this.ultimoItem.nome ?? this.ultimoItem.titulo ?? 'Sem nome';
        if (this.ultimoItem.especialidade) {
          this.ultimoItemTipo = 'investigador'
        } else if (this.ultimoItem.area) {
          this.ultimoItemTipo = 'projeto'
        } else {
          this.ultimoItemTipo = 'equipamento';

        }
      }

    }


  }
