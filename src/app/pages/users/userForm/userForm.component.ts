import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { DialogEditUserComponent } from '../list/dialog-edit-user/dialog-edit-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './userForm.component.html',
  styleUrls: ['./userForm.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() dialogRef: MatDialogRef<DialogEditUserComponent> | undefined;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group<Partial<User>>({
      name: undefined,
      email: undefined,
      gender: undefined,
      status: undefined,
    });
  }

  ngOnInit() {
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  failedUserReq(isCreate?: boolean) {
    this._snackBar.open(
      `Failed to ${isCreate ? 'create' : 'update'} user`,
      'Close'
    );
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      const formData = this.form.value;

      if (this.user) {
        this.userService.updateUser(this.user.id, formData).subscribe(
          (res) => {
            this._snackBar.open('User updated successfully', 'Close');
            this.dialogRef?.close();
          },
          () => {
            this.failedUserReq();
          }
        );
      } else {
        this.userService.createUser(formData).subscribe(
          (res) => {
            this._snackBar.open('User created successfully', 'Close');
            this.form.reset();
          },
          () => {
            this.failedUserReq(true);
          }
        );
      }
    }
  }
}
