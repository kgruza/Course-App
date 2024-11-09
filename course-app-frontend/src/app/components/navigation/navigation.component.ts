import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  currentUser!: User | null;

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
