import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiURL = 'https://gorest.co.in/public/v2/posts';

  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL);
  }
}
