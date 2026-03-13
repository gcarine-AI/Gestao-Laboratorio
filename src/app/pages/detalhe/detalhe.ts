import { Component, OnInit, inject } from '@angular/core';
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

  tipo = '';
  item: Investigador | Projeto | Equipamento | null = null;

  ngOnInit(): void {
    this.tipo = this.route.snapshot.paramMap.get('tipo') ?? '';
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.tipo === 'investigador') {
      this.item = this.labService.getInvestigadoresById(id) ?? null;
    } else if (this.tipo === 'projeto') {
      this.item = this.labService.getProjetosById(id) ?? null;
    } else if (this.tipo === 'equipamento') {
      this.item = this.labService.getEquipamentosById(id) ?? null;
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
