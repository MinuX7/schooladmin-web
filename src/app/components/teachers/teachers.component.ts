import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import { SchoolAdminService } from '../../services/schooladmin.service';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../../model/teacher.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {

  schoolId: number;
  teachers: Array<Teacher> = new Array();

  constructor(private schoolAdminService: SchoolAdminService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.schoolId = Number(this.route.snapshot.paramMap.get('id'));
    this.schoolAdminService.getAllTeachers(this.schoolId)
      .subscribe({
      next: (data) =>  {
        this.teachers = data;
        this.teachers.map(teacher => { 
          if (teacher.photoFileName)  teacher.profilePictureData = encodeURI(environment.baseUrl + "public/profile-picture/" + teacher.photoFileName); 
          });
      },
      error: (err) => alert ('Error loading teachers')
    })
  }
  
 
  
}
