import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { EditPostDialogComponent } from '../posts-list/edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css'],
})
export class PostsFormComponent implements OnInit {
  @Input() post: Post | undefined;
  @Input() dialogRef: MatDialogRef<EditPostDialogComponent> | undefined;

  form: FormGroup;
  constructor(private fb: FormBuilder, private postsService: PostsService) {
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
        this.postsService
          .updatePost(this.post.id, formData)
          .subscribe((res) => {
            this.dialogRef?.close();
          });
      } else {
        console.log(formData);
        this.postsService.createPost(formData).subscribe((res) => {
          console.log(
            '🚀 ~ file: userForm.component.ts:26 ~ UserFormComponent ~ this.userService.createUser ~ res:',
            res
          );
        });
      }
    }
  }

  changedUser(idUser: number) {
    this.form.patchValue({ user_id: idUser });
  }
}
