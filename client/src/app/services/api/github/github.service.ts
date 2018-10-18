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
  ) {}

  postTrendingGitHubRepos = function(): Observable<any> {
    return this.http.post(`${environment.url}/api/trending/github`)
    .pipe(map((response: Response) => response));
  };
}
