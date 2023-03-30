import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['../home/home.component.scss']
})
export class MyPostsComponent {

  posts: Post[] = [];
  loading: boolean = true;
  
  constructor(private postService: PostService,
    private snackbarService: SnackbarService, private authService: AuthService) {}

  ngOnInit() {

    this.authService.getCurrentUser$().pipe(
      switchMap(user => {
        return this.postService.getPostsByUser(user._id!)
      }
    )
    ).subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    },
    (error) => {
      this.snackbarService.openFailSnackBar(error.message)
    })
    
  }

}
