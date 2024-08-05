import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { LoaderComponent } from '../Utility/loader/loader.component';
import { NgIf } from '@angular/common';
import { SnackbarComponent } from '../Utility/snackbar/snackbar.component';
import { Observable } from 'rxjs';
import { AuthResponse } from '../Model/auth-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LoaderComponent, NgIf, SnackbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);
  isLogin: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  authObs: Observable<AuthResponse>;
  router: Router = inject(Router);

  toggleClick(){
    this.isLogin = !this.isLogin;
  }

  onFormSubmitted(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLogin){
      this.isLoading = true;
      this.authObs = this.authService.login(email, password);
    }else{
      this.isLoading = true;
      this.authObs = this.authService.signUp(email, password);
    }

    this.authObs.subscribe({
      next: (res) => { 
        console.log(res);
        this.isLoading = false; 
        this.router.navigate(['/Dashboard']);
      },
      error: (errMsg) => { 
        this.isLoading = false;

        this.errorMessage = errMsg;
        this.hideSnackbar();
      }
    })
    form.reset();
  }

  hideSnackbar(){
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
