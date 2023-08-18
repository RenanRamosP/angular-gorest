import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { EditPostDialogComponent } from '../posts-list/edit-post-dialog/edit-post-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css'],
})
export class PostsFormComponent implements OnInit {
  @Input() post: Post | undefined;
  @Input() dialogRef: MatDialogRef<EditPostDialogComponent> | undefined;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group<Partial<Post>>({
      title: undefined,
      body: undefined,
      user_id: undefined,
    });
  }
  ngOnInit() {
    if (this.post) {
      this.form.patchValue(this.post);
    }
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      const formData = this.form.value;

      if (this.post) {
        this.postsService.updatePost(this.post.id, formData).subscribe(
          () => {
            this._snackBar.open('Post updated successfully', 'Close');
            this.dialogRef?.close();
          },
          () => {
            this.failedPostReq();
          }
        );
      } else {
        console.log(formData);
        this.postsService.createPost(formData).subscribe(
          () => {
            this._snackBar.open('Post created successfully', 'Close');
            this.form.reset();
          },
          () => {
            this.failedPostReq(true);
          }
        );
      }
    }
  }

  failedPostReq(isCreate?: boolean) {
    this._snackBar.open(
      `Failed to ${isCreate ? 'create' : 'update'} post`,
      'Close'
    );
  }

  changedUser(idUser: number) {
    this.form.patchValue({ user_id: idUser });
  }
}
