import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environment/environment';

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

  removeUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, {
      headers: this.headers,
    });
  }

  createUser(user: Partial<User>): Observable<any> {
    return this.http.post(`${this.apiURL}`, user, { headers: this.headers });
  }
}
