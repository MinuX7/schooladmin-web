import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../../model/teacher.model';
import { SchoolAdminService } from '../../../services/schooladmin.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.scss'
})
export class AddClassComponent implements OnInit {

  availableLabels = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ];
  labelIdx: number=0;
  step = 1;
  allTeachers: Array<Teacher>  = new Array();

  createClassForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AddClassComponent>, private schoolAdminService: SchoolAdminService) {
    this.createClassForm =  new FormGroup({
      studentClass: new FormGroup({
        grade: new FormControl(1, Validators.required),
        useLabel: new FormControl(true),
        label: new FormControl({ value: this.availableLabels[this.labelIdx], disabled: false}, Validators.required)
      }),
      courses: new FormArray([ ])
    
    })

    this.studentClassForm.controls['useLabel'].valueChanges.subscribe({
      next: (value: boolean) =>  {
        if (value)
         this.studentClassForm.controls['label'].enable();
        else {
          this.studentClassForm.controls['label'].disable();
        }
      }
  })
  }

  ngOnInit(): void {
    this.schoolAdminService.getAllTeachers(this.data.schoolId).subscribe({
      next: (data) => this.allTeachers = data,
      error: (err) => console.log('Error laoding school teachers.', err)
    })
  }

  get studentClassForm() {
    return this.createClassForm.controls['studentClass'] as FormGroup;
  }

  get coursesFormArray() {
    return this.createClassForm.controls['courses'] as FormArray;
  }

  addNewCourse() {
    const courseForm = new FormGroup({
      courseName: new FormControl('', Validators.required),
      teacher: new FormControl( null, Validators.required)
    });
    this.coursesFormArray.push(courseForm);
  }

  removeCourse(idx: number) {
     if (this.coursesFormArray.length > 0) {
      this.coursesFormArray.removeAt(idx)
     }
  }

  toStep(step: number) {
    if (step >=1 && step <= 3) {
      this.step = step;
    }
  }

  increaseGrade() {
    this.studentClassForm.controls['grade'].setValue(this.studentClassForm.controls['grade'].value -1); 
  }

  decreaseGrade() {
    this.studentClassForm.controls['grade'].setValue(this.studentClassForm.controls['grade'].value +1); 
  }

  moveLabelLeft() {
    if (this.labelIdx > 0) {
      this.labelIdx--;
      this.studentClassForm.controls['label'].setValue(this.availableLabels[this.labelIdx]);
    }
  }

  moveLabelRight() {
    if (this.labelIdx < this.availableLabels.length -1) {
      this.labelIdx++;
      this.studentClassForm.controls['label'].setValue(this.availableLabels[this.labelIdx]);
    }
  }

  createClassWithCourses() {
    let  createCourseFormValue = Object.assign ({}, this.createClassForm.value);
    createCourseFormValue.courses.forEach((course: any) => {
       delete course.teacher.description;
       delete course.teacher.birthDate;
       delete course.teacher.photoFileName;
    });
    this.schoolAdminService.createClassWithCourses(this.data.schoolId, createCourseFormValue).subscribe({
      next: (data) => {
        console.log('Successfully added class with courses', data);
        this.dialogRef.close(data);
      },
      error: (err) => console.error(err)
    })
  }

  close() {
    this.dialogRef.close();
  }

}
