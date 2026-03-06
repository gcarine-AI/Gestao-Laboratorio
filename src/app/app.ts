import { Component} from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabService } from './services/lab';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titulo = "Gestão de Laboratório";
  termoDePesquisa = '';
  resultados: {tipo: string, id: number, nome: string} [] = [];
  mostrarDropdown = false;

  constructor (private labService: LabService) {}

  pesquisar(): void {
    const termo = this.termoDePesquisa.toLowerCase().trim()

      if (!termo) {
        this.resultados = [];
        this.mostrarDropdown = false;
        return;
      }
      const investigadores = this.labService.getInvestigadores()
      .filter(i => i.nome.toLowerCase().includes(termo))
      .map(i => ({ tipo: 'investigador', id: i.id, nome: i.nome }));

      const projetos = this.labService.getProjetos()
      .filter (p => p.titulo.toLowerCase().includes(termo))
      .map(p => ({ tipo: 'projeto', id: p.id, nome: p.titulo }));

      const equipamentos = this.labService.getEquipamentos()
      .filter (e => e.nome.toLowerCase().includes(termo))
      .map(e => ({tipo: 'equipamento', id: e.id, nome: e.nome}));

      this.resultados = [...investigadores, ...projetos, ...equipamentos];
      this.mostrarDropdown = true;
    }

    fecharDropDown(): void {
      this.termoDePesquisa = '';
      this.resultados = [];
      this.mostrarDropdown = false
    }
  }




