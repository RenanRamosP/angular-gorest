import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { UserFormComponent } from './userForm.component';
import { of } from 'rxjs';
import { mockUser } from 'src/app/services/users.service.spec';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any>>;
  let mockUserService: jasmine.SpyObj<UsersService>;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockUserService = jasmine.createSpyObj('UsersService', [
      'updateUser',
      'createUser',
    ]);
    mockUserService.updateUser.and.returnValue(of(mockUser));
    mockUserService.createUser.and.returnValue(of(mockUser));

    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.dialogRef = mockDialogRef;
    component.form = formBuilder.group({
      name: undefined,
      email: undefined,
      gender: undefined,
      status: undefined,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with user data when user is provided', () => {
    component.user = mockUser;
    fixture.detectChanges();

    expect(component.form.value).toEqual(mockUser);
  });

  it('should call updateUser and close dialog when form is submitted with user', () => {
    component.user = mockUser;
    fixture.detectChanges();

    const submitSpy = spyOn(component.dialogRef!, 'close');
    component.form.patchValue({
      name: 'New Name',
      email: 'new@example.com',
      gender: 'female',
      status: 'inactive',
    });

    component.onSubmit();

    expect(mockUserService.updateUser).toHaveBeenCalledWith(
      mockUser.id,
      component.form.value
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should call createUser when form is submitted without user', () => {
    component.form.patchValue({
      name: 'New User',
      email: 'newuser@example.com',
      gender: 'male',
      status: 'active',
    });

    component.onSubmit();

    expect(mockUserService.createUser).toHaveBeenCalledWith(
      component.form.value
    );
  });

  it('should not call updateUser or createUser when form is invalid', () => {
    component.form.patchValue({ name: 'Name' }); // Set form to invalid state
    component.onSubmit();

    expect(mockUserService.updateUser).not.toHaveBeenCalled();
    expect(mockUserService.createUser).not.toHaveBeenCalled();
  });
});
