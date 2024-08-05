import { Component, inject,  } from '@angular/core';
import { Router,RouterLink} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { User } from '../Model/user';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  route: Router = inject(Router);
  authService: AuthService = inject(AuthService );
  isLoggedIn:boolean = false;
  private userSubject: Subscription;

  ngOnInit(){
    this.userSubject = this.authService.user.subscribe((user: User) =>{
      console.log(user)
      this.isLoggedIn = user? true: false
    })
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe()
  }
  
  // navigate(){
  //   this.route.navigate(['Home']);
  // }
}

