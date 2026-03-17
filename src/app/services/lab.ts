import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin} from 'rxjs'
import { Investigador} from '../models/investigador.model';
import { Projeto } from '../models/projeto.model';
import { Equipamento } from '../models/equipamento.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
export class LabService {
  private supaBaseUrl = environment.supabaseURL;

  constructor(private http: HttpClient) {}



  getInvestigadores(): Observable<Investigador[]> {
    return this.http.get<Investigador[]>(`${this.supaBaseUrl}/investigadores`);
  }

  getInvestigadoresById(id:number): Observable<Investigador> {
    return this.http.get<Investigador>(`${this.supaBaseUrl}/investigadores/${id}`);
  }

  adicionarInvestigadores(inv: Omit<Investigador, 'id'>): Observable<Investigador> {
    return this.http.post<Investigador>(`${this.supaBaseUrl}/investigadores`, inv);
  }

  editarInvestigadores(atualizado: Investigador): Observable<Investigador> {
    return this.http.put<Investigador>(`${this.supaBaseUrl}/investigadores/${atualizado.id}`, atualizado);
    }

  apagarInvestigadores(id:number): Observable<void> {
    return this.http.delete<void>(`${this.supaBaseUrl}/investigadores/${id}`)
  }


  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(`${this.supaBaseUrl}/projetos`);
  }

  getProjetosById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.supaBaseUrl}/projetos/${id}`);
  }

  adicionarProjetos(proj: Omit<Projeto, 'id'>): Observable<Projeto> {
    return this.http.post<Projeto>(`${this.supaBaseUrl}/projetos`, proj);
  }

  editarProjetos(atualizado: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.supaBaseUrl}/projetos/${atualizado.id}`, atualizado);
  }

  apagarProjetos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.supaBaseUrl}/projetos/${id}`);
  }

  getEquipamentos(): Observable<Equipamento[]> {
    return this.http.get<Equipamento[]>(`${this.supaBaseUrl}/equipamentos`);
  }

  getEquipamentosById(id: number): Observable<Equipamento> {
    return this.http.get<Equipamento>(`${this.supaBaseUrl}/equipamentos/${id}`);
  }

  adicionarEquipamentos(equip: Omit<Equipamento, 'id'>): Observable<Equipamento> {
    return this.http.post<Equipamento>(`${this.supaBaseUrl}/equipamentos`, equip);
  }

  editarEquipamentos(atualizado: Equipamento): Observable<Equipamento> {
    return this.http.put<Equipamento>(`${this.supaBaseUrl}/equipamentos/${atualizado.id}`, atualizado);
  }

  apagarEquipamentos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.supaBaseUrl}/equipamentos/${id}`);
  }

  getTotalInvestigadores(): Observable<number> {
    return new Observable(observer => {
      this.getInvestigadores().subscribe(lista => {
        observer.next(lista.length);
        observer.complete();
      });
    });
  }

  getTotalInvestigadoresAtivos(): Observable<number> {
    return new Observable(observer => {
      this.getInvestigadores().subscribe(lista => {
        observer.next(lista.filter(i => i.activo).length);
        observer.complete();
      });
    });
  }

  getTotalProjetos(): Observable<number> {
    return new Observable(observer => {
      this.getProjetos().subscribe(lista => {
        observer.next(lista.length);
        observer.complete();
      });
    });
  }

  getProjetosEmCurso(): Observable<number> {
    return new Observable(observer => {
      this.getProjetos().subscribe(lista => {
        observer.next(lista.filter(p => p.estado === 'Em curso').length);
        observer.complete();
      });
    });
  }

  getEquipamentosDisponiveis(): Observable<number> {
    return new Observable(observer => {
      this.getEquipamentos().subscribe(lista => {
        observer.next(lista.filter(e => e.estado === 'Disponível').length);
        observer.complete();
      });
    });
  }


  getUltimoItemAdicionado(): Observable<Investigador | Projeto | Equipamento | undefined> {
    return forkJoin({
    investigadores: this.getInvestigadores(),
    projetos: this.getProjetos(),
    equipamentos: this.getEquipamentos()
  }).pipe(
    map(({ investigadores, projetos, equipamentos }) => {
      const todos = [...investigadores, ...projetos, ...equipamentos];
      return todos.length > 0 ? todos[todos.length - 1] : undefined;
    })
  );
  }
}
