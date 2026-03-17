import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabService } from './services/lab';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = "Gestão de Laboratório";
  termoDePesquisa = '';
  resultados: {tipo: string, id: number, nome: string}[] = [];
  mostrarDropdown = false;

  constructor(public labService: LabService) {}

  pesquisar(): void {
    const termo = this.termoDePesquisa.toLowerCase().trim();
    if (!termo) {
      this.resultados = [];
      this.mostrarDropdown = false;
      return;
    }
    forkJoin({
      investigadores: this.labService.getInvestigadores().pipe(
        map(items => items
          .filter(i => i.nome.toLowerCase().includes(termo) || i.id.toString().includes(termo))
          .map(i => ({ tipo: 'investigador', id: i.id, nome: i.nome }))
        )
      ),
      projetos: this.labService.getProjetos().pipe(
        map(items => items
          .filter(p => p.titulo.toLowerCase().includes(termo) || p.id.toString().includes(termo))
          .map(p => ({ tipo: 'projeto', id: p.id, nome: p.titulo }))
        )
      ),
      equipamentos: this.labService.getEquipamentos().pipe(
        map(items => items
          .filter(e => e.nome.toLowerCase().includes(termo) || e.id.toString().includes(termo))
          .map(e => ({ tipo: 'equipamento', id: e.id, nome: e.nome }))
        )
      )
    }).subscribe(result => {
      this.resultados = [...result.investigadores, ...result.projetos, ...result.equipamentos];
      this.mostrarDropdown = true;
    });
  }

  fecharDropDown(): void {
    this.termoDePesquisa = '';
    this.resultados = [];
    this.mostrarDropdown = false;
  }
}
