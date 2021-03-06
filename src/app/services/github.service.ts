import { Injectable } from '@angular/core';

// Class imports
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GithubService {

  constructor(
    private http: HttpClient,
  ) { }

  headers = {
    headers: new HttpHeaders()
      .set('Authorization', "token 75122e983e1123c665ff0f9828e4cd1c6dcd57e3")
  };

  getRepos() {
    return this.http
      .get(`https://api.github.com/users/nicmeister/repos`)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getRepoInfo(repo) {
    return this.http
      .get(`https://api.github.com/repos/nicmeister/${repo}`, this.headers)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getRepoReadme(repo) {
    return this.http
      .get(`https://api.github.com/repos/nicmeister/${repo}/readme`, this.headers)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getRepoLanguage(repo) {
    return this.http
      .get(`https://api.github.com/repos/NicmeisteR/${repo}/languages`, this.headers)
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  getCommitHistory(repo) {
    return this.http
    .get(`https://api.github.com/repos/NicmeisteR/${repo}/stats/commit_activity`, this.headers)
    .pipe(
      map(data => {
        return data;
      })
    );
  }
}
