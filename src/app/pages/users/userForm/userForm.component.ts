import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css'],
})
export class UserFormComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.form = this.fb.group<Partial<User>>({
      name: undefined,
      email: undefined,
      gender: undefined,
      status: undefined,
    });
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      const formData = this.form.value;

      console.log(formData);
      this.userService.createUser(formData).subscribe((res) => {
        console.log(
          '🚀 ~ file: userForm.component.ts:26 ~ UserFormComponent ~ this.userService.createUser ~ res:',
          res
        );
      });
    }
  }
}
