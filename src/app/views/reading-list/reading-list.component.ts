import { Component, OnInit } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {

  constructor(
    private searchService: NbSearchService
  ) {
    this.savedProjects = JSON.parse(localStorage.getItem('savedItems'));
    this.savedProjectsObject = JSON.parse(localStorage.getItem('savedItemsObject'));

    localStorage.setItem('savedItems', JSON.stringify(this.savedProjects));
    localStorage.setItem('savedItemsObject', JSON.stringify(this.savedProjectsObject));

    this.searchService.onSearchSubmit()
    .subscribe((data: any) => {
      this.searchValue = data.term;
    })
   }
   
  searchValue = '';
  savedProjects = JSON.parse(localStorage.getItem('savedItems'));
  savedProjectsObject = JSON.parse(localStorage.getItem('savedItemsObject'));

  clearSearch(){
    this.searchValue = '';
  }

  formatDate(date){
    var ts = new Date(date);
    return ts.toDateString()
  }

  readLater(project, state, index){
    project.saved = state;
    if(state === false){ 
      if (this.savedProjects.indexOf(project.name) > -1) {
        this.savedProjects.splice(index, 1);
      }

      if (this.savedProjectsObject.indexOf(project) > -1) {
        this.savedProjectsObject.splice(index, 1);
      }
    }
    else{
      this.savedProjects = this.savedProjects || [];
      this.savedProjects.push(project.name);

      this.savedProjectsObject = this.savedProjectsObject || [];
      this.savedProjectsObject.push(project);
    }
    localStorage.setItem('savedItems', JSON.stringify(this.savedProjects));
    localStorage.setItem('savedItemsObject', JSON.stringify(this.savedProjectsObject));
  }

  copyCloneUrl(url){
    navigator.clipboard.writeText(url).then(() => {
      alert('Clone URL copied!');
    });
  }

  ngOnInit(): void {
     
  }

}
