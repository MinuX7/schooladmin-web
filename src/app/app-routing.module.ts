import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ClassesComponent } from './components/classes/classes.component';
import { CatalogComponent } from './components/catalog/catalog.component';

const routes: Routes = [
  { path: 'teachers', component: TeachersComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'catalog', component: CatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }