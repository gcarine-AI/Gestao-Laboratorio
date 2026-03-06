import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(valor: string): string {
    const estados: { [key: string]: string } = {
      'Em curso': '🟢 Em curso',
      'Concluído': '✅ Concluído',
      'Em pausa': '⏸️ Em pausa',
      'Disponível': '❇️ Disponível',
      'Em uso': '🔵 Em uso',
      'Em manutenção': '🔧 Em manutenção'
    };
    return estados[valor] ?? valor;
  }
}


