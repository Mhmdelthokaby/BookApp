// LoginGuard
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Session } from '@supabase/supabase-js'; // Import Session type from Supabase
import { SupabaseService } from './../services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Handle the session asynchronously as getSession() returns a promise
    return this.supabaseService.getSession().then(({ data: { session }, error }) => {
      if (session) {
        return true; // Allow access to the route if logged in
      } else {
        this.router.navigate(['/login']); // Redirect to login page if not logged in
        return false;
      }
    }).catch((error) => {
      console.error('Error checking session:', error);
      this.router.navigate(['/login']); // In case of an error, redirect to login
      return false;
    });
  }
}
