import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Supabase } from '../services/supabase';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(Supabase);
  const router = inject(Router);

  const { data } = await supabase.getClient().auth.getUser();

  if (data.user) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
