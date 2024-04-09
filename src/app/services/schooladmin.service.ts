import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Teacher } from '../model/teacher.model';
import { Class } from '../model/class.model';
import { Course } from '../model/course.model';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolAdminService {

  constructor(private httpClient: HttpClient) { }

  getAllTeachers(schoolId: number) : Observable<Array<Teacher>> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/teachers';
    return this.httpClient.get<Array<Teacher>>(url);
  }
  
  createTeacher(schoolId: number, teacherFormValue: any): Observable<any> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/teachers';
    return this.httpClient.post(url, teacherFormValue);
  }

  getAllClasses(schoolId: number) : Observable<Array<Class>> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes';
    return this.httpClient.get<Array<Class>>(url);
  }

  createClass(schoolId: number, createClassFormValue: any) : Observable<Class>{
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes';
    return this.httpClient.post<Class>(url, createClassFormValue);
  }

  getClassDetails(schoolId: number, classId: number): Observable<any> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes/' + classId + '/full';
    return this.httpClient.get<any>(url);
  } 

  createClassWithCourses(schoolId: number, createClassWithCoursesFormValue: any) : Observable<Class>{
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes-with-courses';
    return this.httpClient.post<Class>(url, createClassWithCoursesFormValue);
  }

  createClassCourse(schoolId: number, classId: number, createCourseRequest:any) :Observable<Course> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes/' + classId + '/courses';
    return this.httpClient.post<Course>(url, createCourseRequest);
  }


  getClassCourses(schoolId: number, classId: number): Observable<Array<Course>> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes/' + classId + '/courses';
    return this.httpClient.get<Array<Course>>(url);
  } 

  getClassStudents(schoolId: number, classId: number): Observable<Array<Student>> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes/' + classId + '/students';
    return this.httpClient.get<Array<Student>>(url);
  } 

  createStudent(schoolId: number, classId: number, createStudentRequest:any) :Observable<any> {
    let url = environment.baseUrl + 'schools/' + schoolId +'/classes/' + classId + '/students';
    return this.httpClient.post<any>(url, createStudentRequest);
  }
}
