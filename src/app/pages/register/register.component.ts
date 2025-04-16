import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onRegister() {
    try {
      const { user, session, error } = await this.supabaseService.signUp(this.email, this.password);

      if (error) {
        this.errorMessage = error.message;
        return;
      }

      // Optional: navigate to login or home
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.errorMessage = 'Registration failed. Please try again.';
      console.error(err);
    }
  }
}
