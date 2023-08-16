import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = ['name', 'email', 'gender', 'status', 'actions'];

  pageSize = 10;
  pageIndex = 0;
  length = 3000;

  constructor(private userService: UsersService) {
    this.getUsers(1, 10);
  }
  ngOnInit(): void {}

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUsers(e.pageIndex + 1, e.pageSize);
  }

  getUsers(page: number, pageSize: number): void {
    this.userService
      .getUsers(page, pageSize)
      .subscribe((users) => (this.users = users));
  }

  removeUser(id: number): void {
    this.userService.removeUser(id).subscribe(() => {
      this.getUsers(this.pageIndex + 1, this.pageSize);
    });
  }
}
