import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { School } from './model/school';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'schooladmin';
  schools: School[] = [];
  baseUrl: string;

  constructor(private httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.baseUrl = environment.baseUrl;
    let url = this.baseUrl + 'schools'
    this.httpClient.get<School[]>(url).subscribe({
      next: (data) => this.schools = data,
      error: (errr) => console.error(errr)
    })
  }

}
