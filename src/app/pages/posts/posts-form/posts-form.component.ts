import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.css'],
})
export class PostsFormComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private postsService: PostsService) {
    this.form = this.fb.group<Partial<Post>>({
      title: undefined,
      body: undefined,
      user_id: undefined,
    });
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      const formData = this.form.value;

      console.log(formData);
      this.postsService.createPost(formData).subscribe((res) => {
        console.log(
          '🚀 ~ file: userForm.component.ts:26 ~ UserFormComponent ~ this.userService.createUser ~ res:',
          res
        );
      });
    }
  }

  changedUser(idUser: number) {
    this.form.patchValue({ user_id: idUser });
  }
}
