import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  // Id passed as QUERYYY parameter
  idPassed!: string;

  post!: Post;

  // Categoires for radio buttons
  categories: string[] = [
    'Art',
    'Science',
    'Technology',
    'Cinema',
    'Design',
    'Food',
  ];

  postForm!: FormGroup;

  // Changes button to publish or update
  updatePublish!: string;

  // Form was submitted?
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private postService: PostService,
    private route: Router,
    private snackBarService: SnackbarService
  ) {
    this.postForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      desc: [null, [Validators.required]],
      cat: [null, [Validators.required]],
      img: [null],
    });
  }

  ngOnInit(): void {
    // Checks if id is passed as query parameter and sets inputs of title and desc of that post
    // Else it will set empty values
    this.activeRoute.queryParams.subscribe((queryParams) => {
      this.idPassed = queryParams['id'];
      if (queryParams['id']) {
        this.getSinglePost(queryParams['id']);
        this.updatePublish = 'Update';
      } else {
        this.postForm.reset();
        this.updatePublish = 'Publish';
      }
    });

    // this.activeRoute.queryParamMap
    //   .pipe(
    //     switchMap((params) => {
    //       let postId = String(params.get('postId'));
    //       if (!postId) {
    //         this.updatePublish = 'Publish';
    //         this.postForm.reset();
    //       } else {
    //         this.updatePublish = 'Update';
    //       }
    //       return this.postService.getSinglePost(postId);
    //     })
    //   )
    //   .subscribe(
    //     (post: Post) => {
    //       this.post = post;
    //       // Setting inputs of title desc and category of post selected
    //       this.postForm.patchValue({
    //         title: post.title,
    //         desc: post.desc,
    //         cat: post.cat,
    //       });
    //     },
    //     (err) => {
    //       this.snackBarService.openFailSnackBar(err.error);
    //     }
    //   );
  }
  // Gets single post by id
  getSinglePost(postId: string) {
    this.postService.getSinglePost(postId).subscribe(
      (post: Post) => {
        this.post = post;
        // Setting inputs of title desc and category of post selected
        this.postForm.patchValue({
          title: post.title,
          desc: post.desc,
          cat: post.cat,
        });
      },
      (error) => {
        this.snackBarService.openFailSnackBar(error.message);
      }
    );
  }

  handleFileInput(event: Event) {
    // const target = event.target as HTMLInputElement;
    // const files = target.files as FileList;
    // this.file = files.item(0);

    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files.item(0);
      this.postForm.get('img')!.setValue(file);
    }
  }

  // uploadImage() {
  //   const formData = new FormData();
  //   formData.append('file', this.file!);

  // }

  // async uploadImage() {
  //   const base64 = await this.convertToBase64(this.file!)
  //   console.log(base64);
  // }

  async createPost() {
    // For showing error messages only when form is submitted
    this.submitted = true;
    this.postForm.markAllAsTouched();

    if (this.postForm.valid) {
      // Gets file selected by user and converts to base64
      let base64;
      if (this.postForm.get('img')?.value) {
        base64 = await this.convertToBase64(this.postForm.get('img')!.value);
      }

      if (this.updatePublish === 'Publish') {
        const post: Post = {
          title: this.postForm.value.title ?? '',
          desc: this.postForm.value.desc ?? '',
          img: base64 ?? '',
          cat: this.postForm.value.cat ?? '',
        };

        this.postService.createPost(post).subscribe(
          (res) => {
            this.snackBarService.openSuccessSnackBar(res);
            this.route.navigate(['/home']);
          },
          (error) => {
            this.snackBarService.openFailSnackBar(error.message);
          }
        );
      } else if (this.updatePublish === 'Update') {
        const post: Post = {
          _id: this.idPassed,
          title: this.postForm.value.title ?? '',
          desc: this.postForm.value.desc ?? '',
          img: base64 ?? '',
          cat: this.postForm.value.cat ?? '',
        };

        this.postService.updatePost(post).subscribe(
          (res) => {
            this.snackBarService.openSuccessSnackBar(res);
            this.route.navigate(['/home']);
          },
          (error) => {
            this.snackBarService.openFailSnackBar(error.message);
          }
        );
      }
    }
  }

  convertToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  clearInputs() {
    this.postForm.reset();
  }
}
