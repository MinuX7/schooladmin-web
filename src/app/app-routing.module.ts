import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CreateTeacherComponent } from './components/teachers/create-teacher/create-teacher.component';

const routes: Routes = [
  { path: 'schools/:id/teachers', component: TeachersComponent },
  { path: 'schools/:id/teachers/create', component: CreateTeacherComponent },
  { path: 'schools/:id/classes', component: ClassesComponent },
  { path: 'catalog', component: CatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }