import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeachersComponent } from './components/teachers/teachers.component';
import { RouterModule } from '@angular/router';
import { ClassesComponent } from './components/classes/classes.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { CreateTeacherComponent } from './components/teachers/create-teacher/create-teacher.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddClassComponent } from './components/classes/add-class/add-class.component';
import { ClassDisplayPipe } from './pipes/class-display.pipe';
import { ClassCoursesComponent } from './components/classes/class-courses/class-courses.component';
import { ClassStudentsComponent } from './components/classes/class-students/class-students.component';
import { AddCourseComponent } from './components/classes/class-courses/add-course/add-course.component';
import { AddStudentComponent } from './components/classes/class-students/add-student/add-student.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageCropper1Component } from './components/image-cropper1/image-cropper1.component';

@NgModule({
  declarations: [
    AppComponent,
    TeachersComponent,
    ClassesComponent,
    CatalogComponent,
    ImageCropperComponent,
    CreateTeacherComponent,
    AddClassComponent,
    ClassDisplayPipe,
    ClassCoursesComponent,
    ClassStudentsComponent,
    AddCourseComponent,
    AddStudentComponent,
    ImageCropper1Component
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    ImageCropperModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
