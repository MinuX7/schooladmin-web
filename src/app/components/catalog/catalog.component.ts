import { Component, OnInit } from '@angular/core';
import {Class} from './../../model/class.model';
import {SchoolAdminService } from './../../services/schooladmin.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {


  classes: Class[];
  curentClass :Class;
  public constructor(private saService: SchoolAdminService) {
    

  }
  ngOnInit(): void {
    this.saService.getAllClasses(1).subscribe({
      next: (data) =>  {
        this.classes = data;
        this.curentClass = this.classes[0];
        console.log('Loading catalogs');
      },
      error: (err) => alert('Error loading classes')
    });
}
}
