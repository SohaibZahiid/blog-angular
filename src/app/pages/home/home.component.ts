import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Post } from '../../interfaces/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  loading: boolean = true;
  
  constructor(private postService: PostService,
    private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts
      this.loading = false;
    },
    (error) => {
      this.snackbarService.openFailSnackBar(error.message)
    });
    
  }

}
