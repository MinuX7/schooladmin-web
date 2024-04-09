import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Course } from '../../../model/course.model';
import { SchoolAdminService } from '../../../services/schooladmin.service';
import { FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from './add-course/add-course.component';

@Component({
  selector: 'class-courses',
  templateUrl: './class-courses.component.html',
  styleUrl: './class-courses.component.scss'
})
export class ClassCoursesComponent implements OnInit, OnChanges {

  @Input() 
  schoolId: number;
  @Input() 
  classId: number;

  courses: Array<Course>;
  classIdToCourseMap: Map<number, Array<Course>> = new Map();

  constructor(private schoolAdminService: SchoolAdminService, private matDialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['classId'].currentValue !== changes['classId'].previousValue) {
      if (this.classIdToCourseMap.has(this.classId)) {
        this.courses = this.classIdToCourseMap.get(this.classId) as Array<Course>;
      } else {
        this.getClassCourses(this.classId);
      }

    }
  }
  
  ngOnInit(): void {
    this.getClassCourses(this.classId);
  }

  getClassCourses(id: number) {
    this.schoolAdminService.getClassCourses(this.schoolId, id).subscribe({
      next: (data) => {
        this.classIdToCourseMap.set(id, data);
        this.courses = this.classIdToCourseMap.get(id) as Array<Course>;
      }, 
      error: (err) => {
        console.error(err);
        this.courses = [];
      }
    })
  }

  openAddCourseDialog() {
    let addCourseDialogRef =  this.matDialog.open(AddCourseComponent, {
      width: '80vh',
      height: '90vh',
      disableClose: true,
      data: {
        schoolId: this.schoolId,
        classId: this.classId
      }
    });
    addCourseDialogRef.afterClosed().subscribe({
      next: (data)=> {
        if (data) {
          this.courses.push(data);
        }
      },
      error: (err) => console.error(err)
    })
  }

}
