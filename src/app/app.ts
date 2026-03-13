import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  ngOnInit () {
    this.loadInvestigadores();
    this.loadProjetos();
    this.loadEquipamentos();
  }
  titulo = "Gestão de Laboratório"

    async loadInvestigadores() {
    const response = await fetch(environment.API_KEY + '/investigadores');
    const investigadores = await response.json();

    console.log(investigadores);
  }
    async loadProjetos() {
    const response = await fetch(environment.API_KEY + '/projetos');
    const projetos = await response.json();

    console.log(projetos);
  }
  async loadEquipamentos() {
    const response = await fetch(environment.API_KEY + '/equipamentos');
    const equipamentos = await response.json();

    console.log(equipamentos);
  }

}






