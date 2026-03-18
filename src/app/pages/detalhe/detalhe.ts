import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LabService } from '../../services/lab';
import { Investigador } from '../../models/investigador.model';
import { Projeto } from '../../models/projeto.model';
import { Equipamento } from '../../models/equipamento.model';
import { StatusPipe } from '../../pipes/status-pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhe',
  imports: [RouterLink, StatusPipe, DatePipe],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe implements OnInit {
  private route = inject(ActivatedRoute);
  private labService = inject(LabService);
  private cdr = inject(ChangeDetectorRef)

  tipo = '';
  item: Investigador | Projeto | Equipamento | null = null;

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') ?? '';
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.tipo === 'investigador') {
      this.labService.getInvestigadoresById(id).subscribe(inv => {
        this.item = inv;
        this.cdr.detectChanges();
      });
    } else if (this.tipo === 'projeto') {
      this.labService.getProjetosById(id).subscribe(proj => {
        this.item = proj;
        this.cdr.detectChanges();
      });
    } else if (this.tipo === 'equipamento') {
      this.labService.getEquipamentosById(id).subscribe(equip => {
        this.item = equip;
        this.cdr.detectChanges();
      });
    }
  }

  get investigador(): Investigador | null {
    return this.tipo === 'investigador' ? (this.item as Investigador) : null;
  }

  get projeto(): Projeto | null {
    return this.tipo === 'projeto' ? (this.item as Projeto) : null;
  }

  get equipamento(): Equipamento | null {
    return this.tipo === 'equipamento' ? (this.item as Equipamento) : null;
  }
}
