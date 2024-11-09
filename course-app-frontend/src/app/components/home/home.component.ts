import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { User } from '../../models/user';
import { Course } from '../../models/course';
import { Transaction } from '../../models/transaction';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule, DatePipe } from '@angular/common';
import { TooltipDirective } from '../../common/ui/tooltip.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DatePipe, TooltipDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  courseList!: Array<Course>;
  errorMessage: string | null = null;
  infoMessage: string | null = null;
  currentUser: User | null;


  constructor(private userService: UserService, private courseService: CourseService, private router: Router){
    this.currentUser = this.userService.currentUserValue;

  }
  
  ngOnInit(): void {
   this.findAllCourses();
  }

  findAllCourses(){
    this.courseService.findAllCourses().subscribe(data => {
      this.courseList = data;
    });
  }

  enroll(course: Course){
    if(!this.currentUser){
      this.errorMessage = "You should sign in to enroll the course";
      return;
    }
    var transaction = new Transaction();
    transaction.userId = this.currentUser.id;
    transaction.course = course;
    
    this.courseService.enroll(transaction).subscribe(data => {
      this.infoMessage = "Course succesfully enrolled!";
      setTimeout(() => {
        this.infoMessage = null;
      }, 3000);
    }, err => {
      this.errorMessage = "Could not enroll the course. Please try again later.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
    });
  }


  detail(course: Course){
    localStorage.setItem("currentCourse", JSON.stringify(course));
    this.router.navigate(['/detail', course.id]);
  }
}
