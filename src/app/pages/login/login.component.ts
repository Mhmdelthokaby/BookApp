import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    const result = await this.supabaseService.signIn(this.email, this.password);

    if (result && result.user && result.session) {
      this.router.navigate(['/admin']); // or dashboard, wherever you're sending logged-in users
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}