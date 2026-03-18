import { Injectable } from '@angular/core';
import { from, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Investigador } from '../models/investigador.model';
import { Projeto } from '../models/projeto.model';
import { Equipamento } from '../models/equipamento.model';
import { Supabase } from './supabase';

@Injectable({
  providedIn: 'root',
})
export class LabService {

  constructor(private supabase: Supabase) {}

  // ── INVESTIGADORES ──
  getInvestigadores(): Observable<Investigador[]> {
    return from(this.supabase.getClient().from('investigadores').select('*')).pipe(
      map(({ data, error }) => {
        console.log('dados:', data, 'erro:', error);
        if (error) throw error; return data as Investigador[]; })
    );
  }

  getInvestigadoresById(id: number): Observable<Investigador> {
    return from(this.supabase.getClient().from('investigadores').select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Investigador; })
    );
  }

  adicionarInvestigadores(inv: Omit<Investigador, 'id'>): Observable<Investigador> {
    return from(this.supabase.getClient().from('investigadores').insert(inv).select().single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Investigador; })
    );
  }

  editarInvestigadores(atualizado: Investigador): Observable<Investigador> {
    return from(this.supabase.getClient().from('investigadores').update(atualizado).eq('id', atualizado.id).select().single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Investigador; })
    );
  }

  apagarInvestigadores(id: number): Observable<void> {
    return from(this.supabase.getClient().from('investigadores').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }

  // ── PROJETOS ──
  getProjetos(): Observable<Projeto[]> {
    return from(this.supabase.getClient().from('projetos').select('*')).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Projeto[]; })
    );
  }

  getProjetosById(id: number): Observable<Projeto> {
    return from(this.supabase.getClient().from('projetos').select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Projeto; })
    );
  }

  adicionarProjetos(proj: Omit<Projeto, 'id'>): Observable<Projeto> {
    return from(this.supabase.getClient().from('projetos').insert(proj).select().single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Projeto; })
    );
  }

  editarProjetos(atualizado: Projeto): Observable<Projeto> {
    return from(this.supabase.getClient().from('projetos').update(atualizado).eq('id', atualizado.id).select().single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Projeto; })
    );
  }

  apagarProjetos(id: number): Observable<void> {
    return from(this.supabase.getClient().from('projetos').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }

  // ── EQUIPAMENTOS ──
  getEquipamentos(): Observable<Equipamento[]> {
    return from(this.supabase.getClient().from('equipamentos').select('*')).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Equipamento[]; })
    );
  }

  getEquipamentosById(id: number): Observable<Equipamento> {
    return from(this.supabase.getClient().from('equipamentos').select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Equipamento; })
    );
  }

  adicionarEquipamentos(equip: Omit<Equipamento, 'id'>): Observable<Equipamento> {
    return from(this.supabase.getClient().from('equipamentos').insert(equip).select().single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Equipamento; })
    );
  }

  editarEquipamentos(atualizado: Equipamento): Observable<Equipamento> {
    return from(this.supabase.getClient().from('equipamentos').update(atualizado).eq('id', atualizado.id).select().single()).pipe(
      map(({ data, error }) => { if (error) throw error; return data as Equipamento; })
    );
  }

  apagarEquipamentos(id: number): Observable<void> {
    return from(this.supabase.getClient().from('equipamentos').delete().eq('id', id)).pipe(
      map(({ error }) => { if (error) throw error; })
    );
  }

  // ── KPIS ──
  getTotalInvestigadores(): Observable<number> {
    return this.getInvestigadores().pipe(map(lista => lista.length));
  }

  getTotalInvestigadoresAtivos(): Observable<number> {
    return this.getInvestigadores().pipe(map(lista => lista.filter(i => i.activo).length));
  }

  getTotalProjetos(): Observable<number> {
    return this.getProjetos().pipe(map(lista => lista.length));
  }

  getProjetosEmCurso(): Observable<number> {
    return this.getProjetos().pipe(map(lista => lista.filter(p => p.estado === 'Em curso').length));
  }

  getEquipamentosDisponiveis(): Observable<number> {
    return this.getEquipamentos().pipe(map(lista => lista.filter(e => e.estado === 'Disponível').length));
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
