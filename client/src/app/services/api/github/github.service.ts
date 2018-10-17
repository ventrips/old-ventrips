import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from './../../../../environments/environment';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private headers: any;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  getTrendingGitHubRepos = function(): Observable<any> {
    return this.http.get(`${environment.url}/api/trending/github`, { headers: this.headers })
    .pipe(map((response: Response) => response));
  };
}
