import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {

  constructor() {

   }

  projects = JSON.parse(localStorage.getItem('savedItems'));

  ngOnInit(): void {
    console.log(this.projects);
    
  }

}
