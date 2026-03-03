import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-card',
  imports: [ RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() titulo = '';
  @Input() subtitulo = '';
  @Input() info1 = '';
  @Input() info2 = '';
  @Input() badgeTexto = '';
  @Input() badgeCor?: string;
  @Input() linkDetalhe = '';
  @Input() linkEditar = '';

}
