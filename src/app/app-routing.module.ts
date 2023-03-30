import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyPostsComponent } from './pages/my-posts/my-posts.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostComponent } from './pages/post/post.component';
import { RegisterComponent } from './pages/register/register.component';
import { WriteComponent } from './pages/write/write.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'myPosts',
    component: MyPostsComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/:postId',
    component: PostComponent,
  },
  {
    path: 'write',
    component: WriteComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
