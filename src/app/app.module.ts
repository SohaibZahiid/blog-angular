import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WriteComponent } from './pages/write/write.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { MatIconModule } from '@angular/material/icon';
import { QuillModule } from 'ngx-quill';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatButtonModule} from '@angular/material/button';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { MyPostsComponent } from './pages/my-posts/my-posts.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostComponent,
    WriteComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    SanitizeHtmlPipe,
    MyPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    QuillModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatRadioModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
