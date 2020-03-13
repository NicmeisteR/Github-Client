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
    this.project = this.router.events.subscribe((evt) => {

      if (evt instanceof ActivationStart) {
        this.project = fixName(evt.snapshot.params.id);
        this.githubService.getRepoReadme(evt.snapshot.params.id).subscribe((res : any)=>{
          this.readme = atob(res.content);
        });
        this.githubService.getRepoInfo(evt.snapshot.params.id).subscribe((res : any)=>{
          this.projectInfo = res;
        });
        // this.githubService.getCommitHistory(evt.snapshot.params.id).subscribe((res : res)=>{
        //   // this.projectInfo = res;
        // });
        this.githubService.getRepoLanguage(evt.snapshot.params.id).subscribe((res : any)=>{
          let projectLanguages = [];
          Object.keys(res).forEach(function(key){
            projectLanguages.push({
              "name": key,
              "value": res[key]
            })
          });
          this.projectLanguages = projectLanguages;
          this.colorScheme.domain = setColors(projectLanguages);
        });
      }
    });

    this.project = fixName(this.route.snapshot.params['id']);
    this.githubService.getRepoReadme(this.route.snapshot.params['id']).subscribe((res : any)=>{
      this.readme = atob(res.content);
    });
    this.githubService.getRepoInfo(this.route.snapshot.params['id']).subscribe((res : any)=>{
      this.projectInfo = res;
    });
    this.githubService.getRepoLanguage(this.route.snapshot.params['id']).subscribe((res : any)=>{
      let projectLanguages = [];
      Object.keys(res).forEach(function(key){
        projectLanguages.push({
          "name": key,
          "value": res[key]
        })
      });
      this.projectLanguages = projectLanguages;
    });
    this.colorScheme.domain = setColors(this.projectLanguages);
  }

  project: any;
  readme: any;
  projectInfo: any;
  projectLanguages = [];

  projectDetails = [{
    "name": "test name",
    "description": "test"
  }]

  ngOnInit() {}

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