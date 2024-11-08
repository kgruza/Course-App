import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

courseId!: number;
currentCourse: Course;
studentList!: Array<string>;

constructor(private courseService: CourseService, private route: ActivatedRoute ){
  this.currentCourse = JSON.parse(localStorage.getItem('currentCourse')!);
}

  ngOnInit(): void {
   this.route.paramMap.subscribe(params =>{
    if(params.has('id')){
      this.courseId = Number.parseInt(params.get('id')!);
      this.findStudentsOfCourse();
    }
   });
  }

  findStudentsOfCourse(){
    this.courseService.findStudentsOfCourse(this.courseId).subscribe(data =>{
        this.studentList = data;
    });
  }

}
