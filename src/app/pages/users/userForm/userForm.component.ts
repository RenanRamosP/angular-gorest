import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { DialogEditUserComponent } from '../list/dialog-edit-user/dialog-edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() dialogRef: MatDialogRef<DialogEditUserComponent> | undefined;

  form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.form = this.fb.group<Partial<User>>({
      name: undefined,
      email: undefined,
      gender: undefined,
      status: undefined,
    });
  }

  ngOnInit() {
    console.log(
      '🚀 ~ file: userForm.component.ts:16 ~ UserFormComponent ~ ngOnInit ~ this.user:',
      this.user
    );
    if (this.user) {
      // do something with the user data
      this.form.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      const formData = this.form.value;
      console.log(
        '🚀 ~ file: userForm.component.ts:38 ~ UserFormComponent ~ onSubmit ~ formData:',
        formData
      );
      if (this.user) {
        this.userService.updateUser(this.user.id, formData).subscribe((res) => {
          console.log(
            '🚀 ~ file: userForm.component.ts:49 ~ UserFormComponent ~ .subscribe ~ res:',
            res
          );
          this.dialogRef?.close();
        });
      } else {
        this.userService.createUser(formData).subscribe((res) => {
          console.log(
            '🚀 ~ file: userForm.component.ts:26 ~ UserFormComponent ~ this.userService.createUser ~ res:',
            res
          );
        });
      }
    }
  }
}
