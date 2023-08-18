import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { environment } from 'src/environment/environment';
import { User } from '../models/user';

export const mockUser: User = {
  id: 1,
  name: 'John',
  email: 'tes@te.com',
  gender: 'male',
  status: 'active',
};

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users', () => {
    const mockUsers: User[] = [];

    const page = 1;
    const pageSize = 10;

    service.getUsers(page, pageSize).subscribe((users) => {
      expect(users.length).toBe(mockUsers.length);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      `${service['apiURL']}?page=${page}&per_page=${pageSize}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should retrieve a user by ID', () => {
    const userId = 1;

    service.getUser(userId).subscribe((user) => {
      expect(user).toEqual(mockUser as User);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should remove a user by ID', () => {
    const userId = 1;

    service.removeUser(userId).subscribe(() => {
      // Expect nothing here, as we're just testing the request
    });

    const req = httpMock.expectOne(`${service['apiURL']}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // Add more tests for other methods similarly

  // ...
});
