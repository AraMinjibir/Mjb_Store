import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../Model/auth-response';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient: HttpClient = inject(HttpClient)
  user = new BehaviorSubject<User>(null)

  signUp(email, password){
    const data = {email:email,password: password, returnSecureToken: true }
    return  this.httpClient.post<AuthResponse>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7xX28AZdUW0zJyg-DKFDfLr188FNlvtc', data
  ).pipe(
      catchError((this.handleError)),
      tap((res) =>{
        this.handleCreateUser(res);
       })
    )
  }

  login(email, password){
    const data = {email:email,password: password, returnSecureToken: true }
    return this.httpClient.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7xX28AZdUW0zJyg-DKFDfLr188FNlvtc', data
    ).pipe(
      catchError((this.handleError)), tap((res) =>{
       this.handleCreateUser(res);
      })
    )
    
  }

  private handleCreateUser(res){
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);

    const user = new User(res.email, res.localId, expiresIn , res.idToken);
    this.user.next(user);
  }
  private handleError(error){
    let errorMessage = 'An unknown error has occurred';
        console.log(error);
        if (!error.error || !error.error.error) {
          return throwError(() => new Error(errorMessage));
        }
        switch (error.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = "This email already exists.";
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'This operation is not allowed.';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'The email ID or Password is not correct.';
            break;
          
        }
        return throwError(() => new Error(errorMessage));
  }
    
}
