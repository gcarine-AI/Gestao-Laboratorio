import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class Supabase {

  private client: SupabaseClient;

  constructor() {
    console.log('URL:', environment.supabaseURL);
    console.log('KEY:', environment.supabaseKey ? 'existe' : 'vazia!');
    this.client = createClient(
      environment.supabaseURL,
      environment.supabaseKey
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}

