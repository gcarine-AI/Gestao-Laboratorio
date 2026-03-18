import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Supabase } from '../services/supabase';

export const authGuard: CanActivateFn = async (route, state) => {
  const supabase = inject(Supabase);
  const router = inject(Router);

  const { data } = await supabase.getClient().auth.getUser();

  if (data.user) {
    return true; // utilizador autenticado, deixa entrar
  } else {
    router.navigate(['/auth']); // redireciona para login
    return false;
  }
};
