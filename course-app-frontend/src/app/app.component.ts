import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'course-app-frontend';
  currentUser!: User;

  constructor(private userService: UserService, private router: Router){
    this.userService.currentUser.subscribe(data =>{
      this.currentUser = data;
    });
  }

  logOut(){
    this.userService.logout().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
