import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from './material-module';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ListComponent } from './pages/users/list/list.component';
import { UserFormComponent } from './pages/users/userForm/userForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from './pages/posts/posts-list/posts-list.component';
import { PostsFormComponent } from './pages/posts/posts-form/posts-form.component';
import { UserDialogComponent } from './pages/posts/posts-list/user-dialog/user-dialog.component';
import { AutomcompleteUserComponent } from './components/automcomplete-user/automcomplete-user.component';
import { DialogEditUserComponent } from './pages/users/list/dialog-edit-user/dialog-edit-user.component';
import { EditPostDialogComponent } from './pages/posts/posts-list/edit-post-dialog/edit-post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    UsersComponent,
    PostsComponent,
    ListComponent,
    UserFormComponent,
    PostsListComponent,
    PostsFormComponent,
    UserDialogComponent,
    AutomcompleteUserComponent,
    DialogEditUserComponent,
    EditPostDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
