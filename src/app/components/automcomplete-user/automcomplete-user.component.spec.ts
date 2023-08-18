import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AutomcompleteUserComponent } from './automcomplete-user.component';
import { UsersService } from 'src/app/services/users.service';
import { mockUser } from 'src/app/services/users.service.spec';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AutomcompleteUserComponent', () => {
  let component: AutomcompleteUserComponent;
  let fixture: ComponentFixture<AutomcompleteUserComponent>;
  let mockUsersService: jasmine.SpyObj<UsersService>;

  const mockFilteredOptions: Observable<any> = of([
    { label: 'User A', id_user: 1 },
    { label: 'User B', id_user: 2 },
    // ... add more mock options as needed
  ]);

  beforeEach(waitForAsync(() => {
    mockUsersService = jasmine.createSpyObj('UsersService', [
      'getUser',
      'autocompleteUsers',
    ]);
    mockUsersService.autocompleteUsers.and.returnValue(mockFilteredOptions);
    mockUsersService.getUser.and.returnValue(of(mockUser));

    TestBed.configureTestingModule({
      declarations: [AutomcompleteUserComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatAutocompleteModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomcompleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set initial value for myControl based on userId input', () => {
    const userId = 1;
    component.userId = userId;
    component.ngOnInit();

    expect(mockUsersService.getUser).toHaveBeenCalledWith(userId);
    expect(component.myControl.value).toBe(mockUser[component.filterBy]);
  });

  it('should change filterBy value on button toggle change', () => {
    const event: MatButtonToggleChange = {
      value: 'email',
      source: null as unknown as MatButtonToggle,
    };
    component.changeFilterBy(event);

    expect(component.filterBy).toBe(event.value);
  });

  it('should emit selected user ID on selection change', () => {
    const selectedUserId = 2;
    const mockOption = { label: 'User B', id_user: selectedUserId };

    spyOn(component.selectedUser, 'emit');
    component.onSelectionChange(mockOption);

    expect(component.selectedUser.emit).toHaveBeenCalledWith(selectedUserId);
  });
});
