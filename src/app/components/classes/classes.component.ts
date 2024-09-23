import { Component, OnInit } from '@angular/core';
import { Class } from '../../model/class.model';
import { SchoolAdminService } from '../../services/schooladmin.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddClassComponent } from './add-class/add-class.component';
import { Course } from '../../model/course.model';
import { forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {

  schoolId: number;
  classes: Array<Class> = new Array();
  selectedClass: Class;
  selectedClassIndex: number;
  classIdWithDetailsMap: Map<number, any> = new Map();
  selectedClassCourses: Array<Course>;
  selectedClassStudents: Array<any>;

  
  constructor(private schoolAdminService: SchoolAdminService, private utilService: UtilService, private route: ActivatedRoute, private matDialog: MatDialog )  {

  }

  ngOnInit(): void {
    this.schoolId = Number(this.route.snapshot.paramMap.get('id'));
    this.schoolAdminService.getAllClasses(this.schoolId)
      .subscribe({
      next: (data) =>   {
        this.classes = data;
        this.selectedClassIndex =0;
        this.changeClassData();
      },
      error: (err) => {
        console.error(err);
        this.utilService.showErrorMessage(err.error, 'Error loading list of classes.')
      }
    })
  }

  openCreateClassModal() {
   let addClassDialogRef =  this.matDialog.open(AddClassComponent, {
      width: '80vh',
      height: '90vh',
      disableClose: true,
      data: {
        schoolId: this.schoolId
      },
    });

    addClassDialogRef.afterClosed().subscribe({
      next: (data) => {
        this.classes.push(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  moveClassLeft() {
    if (this.selectedClassIndex >= 1) {
      this.selectedClassIndex --;
      this.changeClassData();
    }
  }

  moveClassRight() {
    if (this.selectedClassIndex <= this.classes.length -2) {
      this.selectedClassIndex ++;
      this.changeClassData();
    }
  }

  private changeClassData() {
    this.selectedClass = this.classes[this.selectedClassIndex];
    if (this.classIdWithDetailsMap.has(this.selectedClass.id)) {
      let selectedClassDetails = this.classIdWithDetailsMap.get(this.selectedClass.id); 
      this.selectedClassCourses = selectedClassDetails.courses;
      this.selectedClassStudents = selectedClassDetails.students;
    } else {
      let classDetails$ = this.schoolAdminService.getClassCourses(this.schoolId, this.selectedClass.id);
      let studentDetails$ = this.schoolAdminService.getClassStudents(this.schoolId, this.selectedClass.id);
      forkJoin([classDetails$, studentDetails$]).subscribe ({
        next: (data) => {
          let coursesMaped = data[0].map(course => { 
            if (course.teacher.photoFileName) {
              course.teacher.profilePictureData = encodeURI(environment.baseUrl + "public/profile-picture/" + course.teacher.photoFileName); 
            }
            return course;
          });
 
          let classDetails =  {
            loadSuccess: true,
            courses: coursesMaped, 
            students: data[1]
          };
          this.classIdWithDetailsMap.set( this.selectedClass.id, classDetails );
          this.selectedClassCourses = classDetails.courses;
          this.selectedClassStudents = classDetails.students;
        },
        error: (err) => {
          let classDetails =  {
            loadSuccess: false,
            courses: [], 
            students: []
          };
          this.selectedClassCourses = classDetails.courses;
          this.selectedClassStudents = classDetails.students;
          console.log(err);
          alert('Error loading class details')
        }
      })
    }

  
  }
}
