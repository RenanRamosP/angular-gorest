import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environment/environment';
import { handleError } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiURL = 'https://gorest.co.in/public/v2/users';
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${environment.apiKey}`
  );

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL, {
      headers: this.headers,
      params: { page: page.toString(), per_page: pageSize.toString() },
    });
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiURL}/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(handleError));
  }

  removeUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, {
      headers: this.headers,
    });
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiURL}`, user, {
      headers: this.headers,
    });
  }

  updateUser(userId: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiURL}/${userId}`, user, {
      headers: this.headers,
    });
  }

  autocompleteUsers(
    filter: string,
    filterBy: 'name' | 'email'
  ): Observable<User[]> {
    let params = {};
    if (filterBy === 'name') {
      params = { name: filter };
    } else {
      params = { email: filter };
    }
    return this.http.get<User[]>(`${this.apiURL}`, {
      params,
      headers: this.headers,
    });
  }
}
