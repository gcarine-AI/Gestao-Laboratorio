import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LabService } from '../../services/lab';
import { LabItem } from '../../models/labItem.model';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private labService = inject(LabService);
  private cdr = inject(ChangeDetectorRef)

  totalInvestigadores = 0;
  investigadoresAtivos = 0;
  totalProjetos = 0;
  projetosEmCurso = 0;
  equipamentosDisponiveis = 0;
  ultimoItem: LabItem | undefined;

  ngOnInit(): void {
  this.labService.getInvestigadores().subscribe(lista => {
    console.log('investigadores recebidos:', lista);
    this.totalInvestigadores = lista.length;
    this.investigadoresAtivos = lista.filter(i => i.activo).length;
    this.cdr.detectChanges();
  });

  this.labService.getProjetos().subscribe(lista => {
    this.totalProjetos = lista.length;
    this.projetosEmCurso = lista.filter(p => p.estado === 'Em curso').length;
    this.cdr.detectChanges();
  });

  this.labService.getEquipamentos().subscribe(lista => {
    this.equipamentosDisponiveis = lista.filter(e => e.estado === 'Disponível').length;
    this.cdr.detectChanges();
  });

  this.labService.getUltimoItemAdicionado().subscribe(item => {
    this.ultimoItem = item as LabItem;
    this.cdr.detectChanges();
  });
}
}
