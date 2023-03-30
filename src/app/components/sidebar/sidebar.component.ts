import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // category passed from postcomponent
  @Input() category!: string;

  posts: Post[] = [];

  constructor(
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.postService.getPostsByCategory(this.category).subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
