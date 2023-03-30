import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  // posts: Post[] = [
  //   {
  //     _id: '1',
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     _id: '2',
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     _id: '3',
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     _id: '4',
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  // ];

  getPosts(): Observable<Post[]> {
    // return this.posts;
    return this.http.get<Post[]>(`${this.apiURL}/posts`);
  }

  getSinglePost(id: string): Observable<Post> {
    // return this.posts.find(post => post._id === id)!;
    return this.http.get<Post>(`${this.apiURL}/posts/${id}`);
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/posts?cat=${category}`);
  }

  getPostsByUser(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/posts?author=${id}`)
  }

  deletePost(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiURL}/posts/${id}`, {
      withCredentials: true,
    });
  }

  createPost(post: Post): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/posts/create`, post, {
      withCredentials: true,
    });
  }

  updatePost(post: Post): Observable<string> {
    const { _id, ...rest } = post;
    return this.http.put<string>(`${this.apiURL}/posts/${post._id}`, rest, {
      withCredentials: true,
    });
  }

  uploadImage(file: FormData): Observable<string> {
    return this.http.post<string>(`${this.apiURL}/upload`, file, {
      withCredentials: true,
    });
  }
}
