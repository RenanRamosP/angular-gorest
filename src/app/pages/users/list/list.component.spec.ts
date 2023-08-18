import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { ListComponent } from './list.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { mockUser } from 'src/app/services/users.service.spec';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockUserService: jasmine.SpyObj<UsersService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    mockUserService = jasmine.createSpyObj('UsersService', [
      'getUsers',
      'removeUser',
      'getUser',
    ]);
    mockUserService.getUsers.and.returnValue(of([mockUser]));
    mockUserService.removeUser.and.returnValue(of(undefined));
    mockUserService.getUser.and.returnValue(of(mockUser));

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [MatDialogModule, MatPaginatorModule, BrowserAnimationsModule],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should open dialog on openDialog', () => {
    component.openDialog(mockUser);
    expect(mockDialog.open).toHaveBeenCalledWith(DialogEditUserComponent, {
      data: mockUser,
    });
  });

  it('should handle page event and get users', () => {
    const pageEvent = { pageIndex: 1, pageSize: 10 } as any;
    component.handlePageEvent(pageEvent);
    expect(component.pageSize).toBe(pageEvent.pageSize);
    expect(component.pageIndex).toBe(pageEvent.pageIndex);
    expect(mockUserService.getUsers).toHaveBeenCalledWith(
      pageEvent.pageIndex + 1,
      pageEvent.pageSize
    );
  });

  it('should get users on initialization', () => {
    expect(mockUserService.getUsers).toHaveBeenCalledWith(1, 10);
  });

  it('should remove user and refresh users list', () => {
    const userId = 1;
    component.removeUser(userId);
    expect(mockUserService.removeUser).toHaveBeenCalledWith(userId);
    expect(mockUserService.getUsers).toHaveBeenCalledWith(
      component.pageIndex + 1,
      component.pageSize
    );
  });

  it('should change user and refresh users list', () => {
    const userId = 1;
    component.changedUser(userId);
    expect(mockUserService.getUser).toHaveBeenCalledWith(userId);
    expect(component.users).toEqual([mockUser]);
  });

  it('should refresh users list if user id is undefined', () => {
    component.changedUser(undefined);
    expect(mockUserService.getUsers).toHaveBeenCalledWith(
      component.pageIndex + 1,
      component.pageSize
    );
  });
});
