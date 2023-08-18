import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { mockPost } from 'src/app/services/posts.service.spec';
import { PostsFormComponent } from './posts-form.component';

describe('PostsFormComponent', () => {
  let component: PostsFormComponent;
  let fixture: ComponentFixture<PostsFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<any, any>>;
  let mockPostsService: jasmine.SpyObj<PostsService>;
  let formBuilder: FormBuilder;

  beforeEach(waitForAsync(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockPostsService = jasmine.createSpyObj('PostsService', [
      'updatePost',
      'createPost',
    ]);
    mockPostsService.updatePost.and.returnValue(of(mockPost));
    mockPostsService.createPost.and.returnValue(of(mockPost));

    TestBed.configureTestingModule({
      declarations: [PostsFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: PostsService, useValue: mockPostsService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.dialogRef = mockDialogRef;
    component.form = formBuilder.group({
      title: undefined,
      body: undefined,
      user_id: undefined,
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with post data when post is provided', () => {
    component.post = mockPost;
    fixture.detectChanges();

    expect(component.form.value).toEqual(mockPost);
  });

  it('should call updatePost and close dialog when form is submitted with post', () => {
    component.post = mockPost;
    fixture.detectChanges();

    const submitSpy = spyOn(component.dialogRef!, 'close');
    component.form.patchValue({
      title: 'New Title',
      body: 'New Body',
      user_id: 2,
    });

    component.onSubmit();

    expect(mockPostsService.updatePost).toHaveBeenCalledWith(
      mockPost.id,
      component.form.value
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should call createPost when form is submitted without post', () => {
    component.form.patchValue({
      title: 'New Title',
      body: 'New Body',
      user_id: 2,
    });

    component.onSubmit();

    expect(mockPostsService.createPost).toHaveBeenCalledWith(
      component.form.value
    );
  });

  it('should not call updatePost or createPost when form is invalid', () => {
    component.form.patchValue({ title: 'Title' }); // Set form to invalid state
    component.onSubmit();

    expect(mockPostsService.updatePost).not.toHaveBeenCalled();
    expect(mockPostsService.createPost).not.toHaveBeenCalled();
  });

  it('should update user_id value when changedUser is called', () => {
    const userId = 2;
    component.changedUser(userId);

    expect(component.form.value.user_id).toBe(userId);
  });
});
