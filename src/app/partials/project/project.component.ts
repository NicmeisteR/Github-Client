import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationStart } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';
import { fixName, setColors } from '../../services/helpers.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubService: GithubService,
  ) {

    // Make use of ActivatedRoute route to target the requested project.
    this.project = this.router.events.subscribe((evt) => {
      if (evt instanceof ActivationStart) {
        this.getProjectInfo(this.route.snapshot.params['id']);
      }
    });

    this.getProjectInfo(this.route.snapshot.params['id']);
  }

  project: any;
  readme: any;
  projectInfo: any;
  projectLanguages = [];

  ngOnInit() {}

  getProjectInfo(repoName){
    // Call the fixName function to replace dashes with spaces for proper names
    this.project = fixName(repoName);

    this.getRepoReadme(repoName);
    this.getRepoInfo(repoName);
    this.getRepoLanguage(repoName);
    this.colorScheme.domain = setColors(this.projectLanguages);
  }

  getRepoReadme(repoName){
    // Retrieve readme from Repo to render as HTML 
    this.githubService.getRepoReadme(repoName).subscribe((res : any)=>{
      this.readme = atob(res.content);
    });
  }

  getRepoInfo(repoName){
    // API Call to get the information of the repo
    this.githubService.getRepoInfo(repoName).subscribe((res : any)=>{
      this.projectInfo = res;
    });
  }

  getRepoLanguage(repoName){
    // Retrieve the languages used in the repo
    this.githubService.getRepoLanguage(repoName).subscribe((res : any)=>{
      let projectLanguages = [];
      Object.keys(res).forEach((key) => {
        projectLanguages.push({
          "name": key,
          "value": res[key]
        })
      });
      this.projectLanguages = projectLanguages;
    });
  }

  ngOnDestroy(): void {
    // this.project.unsubscribe();
  }
                                
  view: any[] = [500, 400];
  legend: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: []
  };
}