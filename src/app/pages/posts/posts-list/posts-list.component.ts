import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  displayedColumns: string[] = ['title', 'body', 'actions'];

  pageSize = 10;
  pageIndex = 0;
  length = 3000;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.getPosts(1, 10);
  }

  openDialog(userId: number): void {
    this.usersService.getUser(userId).subscribe(
      (user) => {
        this.dialog.open(UserDialogComponent, {
          data: user,
        });
      },
      () => {
        this._snackBar.open('Error getting User', 'Close');
      }
    );
  }

  ngOnInit(): void {}

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getPosts(e.pageIndex + 1, e.pageSize);
  }

  getPosts(page: number, pageSize: number): void {
    this.postsService
      .getPosts(page, pageSize)
      .subscribe((posts) => (this.posts = posts));
  }
  removePost(id: number): void {
    this.postsService.removePost(id).subscribe(() => {
      this.getPosts(this.pageIndex + 1, this.pageSize);
    });
  }
}
