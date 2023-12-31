import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Observable, debounceTime, map, startWith, switchMap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

type OptionLabel = {
  label: string;
  id_user: number;
};
@Component({
  selector: 'app-automcomplete-user',
  templateUrl: './automcomplete-user.component.html',
  styleUrls: ['./automcomplete-user.component.css'],
})
export class AutomcompleteUserComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions: Observable<OptionLabel[]>;
  @Output() selectedUser = new EventEmitter<number>();
  @Input() userId: number | undefined;

  filterBy: 'name' | 'email' = 'name';

  constructor(private usersService: UsersService) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      switchMap((value) => this._filter(value || ''))
    );
  }
  ngOnInit(): void {
    if (this.userId) {
      this.usersService.getUser(this.userId).subscribe(
        (user) => {
          this.myControl.setValue(user[this.filterBy]);
        },
        (e) => console.log('notify', e)
      );
    }
  }

  changeFilterBy(event: MatButtonToggleChange) {
    this.filterBy = event.value;
  }

  private _filter(value: string): Observable<OptionLabel[]> {
    return this.usersService.autocompleteUsers(value, this.filterBy).pipe(
      map((users) => {
        return users.map((user) => ({
          label: user[this.filterBy],
          id_user: user.id,
        }));
      })
    );
  }

  onSelectionChange(event: OptionLabel | undefined) {
    this.selectedUser.emit(event?.id_user ?? undefined);
  }
}
