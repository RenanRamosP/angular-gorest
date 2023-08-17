import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { environment } from 'src/environment/environment';

export type QueryPost = {
  page: number;
  pageSize: number;
  userId?: number;
  title?: string;
};

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

  getPosts(query: QueryPost): Observable<Post[]> {
    const params: any = {
      page: query.page.toString(),
      per_page: query.pageSize.toString(),
    };
    query.userId && (params.user_id = query.userId.toString());
    query.title && (params.title = query.title.toString());
    return this.http.get<Post[]>(this.apiURL, {
      headers: this.headers,
      params,
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
