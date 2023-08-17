import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiURL = 'https://gorest.co.in/public/v2/posts';
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${environment.apiKey}`
  );
  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL, {
      headers: this.headers,
      params: { page: page.toString(), per_page: pageSize.toString() },
    });
  }

  removePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`, {
      headers: this.headers,
    });
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiURL, post, {
      headers: this.headers,
    });
  }
}
