import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post!: Post;

  postId!: string;

  currentUser!: User;

  constructor(
    private postService: PostService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    });
    // let postId = String(this.activeRoute.snapshot.paramMap.get('postId'));
    // if (postId) this.getSinglePost(postId);
    this.activeRoute.paramMap
      .pipe(
        switchMap((params) => {
          let postId = String(params.get('postId'));
          return this.postService.getSinglePost(postId);
        })
      )
      .subscribe(
        (post) => {
          this.post = post;
        },
        (error) => {
          this.snackbarService.openFailSnackBar(error.message);
        }
      );
  }

  // getSinglePost(postId: string) {
  //   this.postService.getSinglePost(postId).subscribe(
  //     (post: Post) => {
  //       this.post = post;
  //     },
  //     (error) => {
  //       this.snackbarService.openFailSnackBar(error.error);
  //     }
  //   );
  // }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(
      (res) => {
        this.snackbarService.openSuccessSnackBar(res);
        this.route.navigate(['/home']);
      },
      (err) => this.snackbarService.openFailSnackBar(err.message)
    );
  }
}
