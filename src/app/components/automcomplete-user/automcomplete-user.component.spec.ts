import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomcompleteUserComponent } from './automcomplete-user.component';

describe('AutomcompleteUserComponent', () => {
  let component: AutomcompleteUserComponent;
  let fixture: ComponentFixture<AutomcompleteUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutomcompleteUserComponent]
    });
    fixture = TestBed.createComponent(AutomcompleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
