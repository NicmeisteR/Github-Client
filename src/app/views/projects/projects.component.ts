import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { NbSearchService } from '@nebular/theme';
import { fixName, titleCase } from '../../services/helpers.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  savedProjects = JSON.parse(localStorage.getItem('savedItems'));
  savedProjectsObject = JSON.parse(localStorage.getItem('savedItemsObject'));

  constructor(
    private githubService: GithubService,
    private searchService: NbSearchService
    ) {

      this.savedProjects = JSON.parse(localStorage.getItem('savedItems'));
      this.savedProjectsObject = JSON.parse(localStorage.getItem('savedItemsObject'));

      this.saveToLocalStorage(this.savedProjects, this.savedProjectsObject);

      this.githubService.getRepos().subscribe((res : Array<any>)=>{
        res.filter(item => {
          if(item.fork === false){
            item.name = fixName(item.name);
              this.projects.push(item);
          }
      });
      // Sort the projects array by last commit.
      this.projects.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      
      if(this.savedProjects != null){
        this.savedProjects.forEach(element => {
          let savedProjects = this.projects.find(object => object.name === element);
          savedProjects.saved = true;
        });
      }

      if(this.savedProjectsObject != null){
        this.savedProjectsObject.forEach(element => {
          let savedProjectsObject = this.projects.find(object => object.name === element);
          savedProjectsObject.saved = true;
        });
      }
      
      this.projects[0].latest = true;
    });
      
      this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.searchValue = data.term;
      })
    }

    searchValue = '';
    projects= [];

    // TODO: Check for Repo Topics and Repo Langaues part of github API
  clearSearch(){
    this.searchValue = '';
  }

  formatDate(date){
    let ts = new Date(date);
    return ts.toDateString()
  }

  readLater(project, state){
    project.saved = state;
    if(state === false){ 
      if (this.savedProjects.indexOf(project.name) > -1) {
        this.savedProjects.splice(project.name, 1);
      }

      if (this.savedProjectsObject.indexOf(project) > -1) {
        this.savedProjectsObject.splice(project, 1);
      }
    }
    else{
      this.savedProjects = this.savedProjects || [];
      this.savedProjects.push(project.name);

      this.savedProjectsObject = this.savedProjectsObject || [];
      this.savedProjectsObject.push(project);
    }
    this.saveToLocalStorage(this.savedProjects, this.savedProjectsObject);
  }

  copyCloneUrl(url){
    navigator.clipboard.writeText(url).then(() => {
      alert('Clone URL copied!');
    });
  }

  saveToLocalStorage(savedProjects, savedProjectsObject){
    localStorage.setItem('savedItems', JSON.stringify(savedProjects));
    localStorage.setItem('savedItemsObject', JSON.stringify(savedProjectsObject));
  }

  ngOnInit(): void {

  }

}