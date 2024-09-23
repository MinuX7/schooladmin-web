import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SchoolAdminService } from '../../../services/schooladmin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
import { Student } from '../../../model/student.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'class-students',
  templateUrl: './class-students.component.html',
  styleUrl: './class-students.component.scss'
})
export class ClassStudentsComponent implements OnInit, OnChanges {

  @Input() 
  schoolId: number;
  @Input() 
  classId: number;

  students: Array<Student>;
  classIdToStudentsMap: Map<number, Array<Student>> = new Map();

  constructor(private schoolAdminService: SchoolAdminService, private matDialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['classId'].currentValue !== changes['classId'].previousValue) {
      if (this.classIdToStudentsMap.has(this.classId)) {
        this.students = this.classIdToStudentsMap.get(this.classId) as Array<any>;
      } else {
        this.loadClassStudents(this.classId);
      }

    }
  }

  ngOnInit(): void {
    this.loadClassStudents(this.classId);
  }

  private loadClassStudents(classId: number) {
    this.schoolAdminService.getClassStudents(this.schoolId, classId).subscribe({
      next: (data) => {
        data.map((student:Student) => {
          if (student.photoFileName) {
           student.profilePictureUrl = encodeURI(environment.baseUrl + "public/profile-picture/" + student.photoFileName); 
          }
        });
        console.log(data);
        this.classIdToStudentsMap.set(classId, data);
        this.students = this.classIdToStudentsMap.get(classId) as Array<any>;
      }, 
      error: (err) => {
        console.error(err);
      }
    })
  }

  openAddStudentModal() {
    let addStudentDialogRef = this.matDialog.open(AddStudentComponent, {
      width: '40vw',
      height:'90vh',
      data: {
        schoolId: this.schoolId,
        classId: this.classId
      }
    });
    addStudentDialogRef.afterClosed().subscribe(data => {
      if (data) {
        let newStudent: Student = data;
        if (newStudent.photoFileName) {
          newStudent.profilePictureUrl = encodeURI(environment.baseUrl + "public/profile-picture/" + newStudent.photoFileName); 
        }
        if (this.classIdToStudentsMap.get(this.classId)) {
          this.classIdToStudentsMap.get(this.classId)?.push(newStudent);
        } else {
          let tempStudents = new Array<Student>();
          tempStudents.push(newStudent);
        }
        
        this.students = this.classIdToStudentsMap.get(this.classId) as Student[];
      }
    })
  }

}
