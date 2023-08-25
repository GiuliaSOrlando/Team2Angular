import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './Components/Interfaces/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  // Get post
  getPost(): Observable<IPost[]> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/posts/`;
    return this.http.get<IPost[]>(apiUrl);
  }

  // Create post
  createPost(data: Partial<IPost>): Observable<IPost> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/posts/`;
    return this.http.post<IPost>(apiUrl, data);
  }

  // Delete post
  deletePostSvc(postId: string, expId: string): Observable<void> {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/posts/${postId}`;
    return this.http.delete<void>(apiUrl);
  }
  // Put post
  modifyPost(postId: string, postData: Partial<IPost>): Observable<IPost> {
    const url = `https://striveschool-api.herokuapp.com/api/posts/${postId}`;
    return this.http.put<IPost>(url, postData);
  }
}
