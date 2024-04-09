import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolAdminService } from '../../../../services/schooladmin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../../../../model/teacher.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {
  createCourseForm:FormGroup;
  availableLabels: any;
  labelIdx: any;
  allTeachers: Array<Teacher>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddCourseComponent>, private schoolAdminService: SchoolAdminService) {
    this.createCourseForm =  new FormGroup({
        courseName: new FormControl(null, Validators.required),
        teacher: new FormControl(null, Validators.required),
        description: new FormControl()
     })
  }
  
  ngOnInit(): void {
    this.schoolAdminService.getAllTeachers(this.data.schoolId).subscribe({
      next: (data) => this.allTeachers = data,
      error: (err) => console.log('Error laoding school teachers.', err)
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  createCourse() {
    this.schoolAdminService.createClassCourse(this.data.schoolId, this.data.classId, this.createCourseForm.value).subscribe({
      next: (data)=> {
        this.dialogRef.close(data);
      },
      error: (err)=> {
        alert("Error craeting course")
      }
    });
  }



}
