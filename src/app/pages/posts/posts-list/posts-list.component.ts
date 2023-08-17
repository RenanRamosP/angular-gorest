import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Post } from 'src/app/models/post';
import { PostsService, QueryPost } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  selectedUser: number | undefined = undefined;

  titleFind = new FormControl('');

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
    this.getPosts({ page: 1, pageSize: 10 });
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
    this.getPosts({ page: e.pageIndex + 1, pageSize: e.pageSize });
  }

  getPosts(query: QueryPost): void {
    const { page, pageSize, title, userId } = query;
    this.postsService
      .getPosts({ page, pageSize, title, userId })
      .subscribe((posts) => (this.posts = posts));
  }
  removePost(id: number): void {
    this.postsService.removePost(id).subscribe(() => {
      this.getPosts({ page: this.pageIndex + 1, pageSize: this.pageSize });
    });
  }
  findByUser(id: number): void {
    this.selectedUser = id;
    this.getPosts({
      page: 1,
      pageSize: 10,
      userId: id,
      title: this.titleFind.value || undefined,
    });
  }
  findByTitle(): void {
    this.getPosts({
      page: 1,
      pageSize: 10,
      title: this.titleFind.value || undefined,
      userId: this.selectedUser,
    });
  }
}
