import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CourseService } from '../../services/course.service';
import { Transaction } from '../../models/transaction';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  currentUser: User | null;
  transactionList!: Array<Transaction>;
  

  constructor(private userService: UserService, private courseService: CourseService, private router: Router){
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit(): void {
    if(!this.currentUser){
      this.router.navigate(['/login']);
return;    
    }
    this.findTransactionsOfUser();
  }

  findTransactionsOfUser(){
    this.courseService.findTransactionsOfUser(this.currentUser!.id).subscribe(data =>{
      this.transactionList = data;
    })
  }

  logOut(){
    this.userService.logout().subscribe(data =>{
      this.router.navigate(['/login']);
    });
  }

}
