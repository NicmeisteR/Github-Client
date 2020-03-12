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

  savedProjects;

  constructor(
    private githubService: GithubService,
    private searchService: NbSearchService
    ) {

      const savedProjects = [
        "Github Client",
        "Halo Caster Toolkit",
        "Halo Streamer Tools"
      ];

      this.savedProjects = savedProjects;

      this.githubService.getRepos().subscribe((res : Array<any>)=>{
        res.filter(item => {
          if(item.fork === false){
            item.name = fixName(item.name);
              this.projects.push(item);
          }
      });
      // Sort the projects array by last commit.
      this.projects.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
      
      savedProjects.forEach(element => {
        let savedProjects = this.projects.find(object => object.name === element);
        savedProjects.saved = true;
      });
      
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

  // projects = [
  //   {
  //     name: "HaloStatsBot",
  //     description: "Halo",
  //     accent: "basic",
  //     details: "Hosted On Twitter",
  //     link: "dkfmdkslf"
  //   },
  //   {
  //     name: "Halo South Africa",
  //     description: "Halo",
  //     accent: "primary",
  //     details: "Hosted On Web",
  //     link: "dkfmdkslf"
  //   }
  // ];
  clearSearch(){
    this.searchValue = '';
  }

  formatDate(date){
    var ts = new Date(date);
    return ts.toDateString()
  }

  readLater(project, state){
    console.log(project);
    project.saved = state;
    this.savedProjects.push(project.name)
    
  }

  ngOnInit(): void {

  }

}
