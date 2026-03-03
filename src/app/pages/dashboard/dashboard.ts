import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabService } from '../../services/lab';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
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

  constructor(private labService: LabService) {}

    ngOnInit(): void {
      this.totalInvestigadores = this.labService.getTotalInvestigadores();
      this.investigadoresAtivos = this.labService.getTotalInvestigadoresAtivos();
      this.totalProjetos = this.labService.getTotalProjetos();
      this.projetosEmCurso = this.labService.getProjetosEmCurso();
      this.equipamentosDisponiveis = this.labService.getEquipamentosDisponiveis();
      this.ultimoItem = this.labService.getUltimoItemAdicionado();

    }


}
