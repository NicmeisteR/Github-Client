import { Component } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';
import { NbMenuService } from '@nebular/theme';
import { fixName, titleCase } from '../../services/helpers.service';

interface res {
  name: string,
  clone_url: string,
  created_at: string,
  description: string,
  fork: boolean
};

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(
    private githubService: GithubService,
    private menuService: NbMenuService
    ) {
      this.githubService.getRepos().subscribe((res : Array<res>)=>{
        res.filter(item => {
          if(item.fork === false){
              this.projects.push(
                {
                  title: fixName(item.name),
                  link: [`/projects/${item.name}`],
                });
          }
      });
    });
  }

  projects = [
    {
      title: 'Projects Overview',
      link: ["/projects"],
    },
  ];

  items = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: ["/home"],
    },
    {
      title: 'Projects',
      icon: 'archive-outline',
      children: this.projects,
    },
    {
      title: 'Reading List',
      icon: 'bookmark-outline',
      link: ["/reading-list"],
    },
    {
      title: 'About',
      icon: { icon: 'info-outline', pack: 'eva' },
      link: ["/about"],
    }
  ];
}