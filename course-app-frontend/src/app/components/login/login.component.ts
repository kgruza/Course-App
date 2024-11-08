import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
user:User = new User();
errorMessage!: string;

constructor(private userService: UserService, private router: Router){}
 
ngOnInit(){if(this.userService.currentUserValue){
    this.router.navigate(['/home']);
    return;
  }
}


login(){
  this.userService.login(this.user).subscribe(data => {
    this.router.navigate(['/profile']);
  }, err => {
    this.errorMessage = "Username or password is incorrect.";
  });
}

}
