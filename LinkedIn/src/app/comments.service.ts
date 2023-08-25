import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComments } from './Components/Interfaces/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseUrl = 'https://striveschool-api.herokuapp.com/api/comments';

  constructor(private http: HttpClient) {}

  getAllComments(): Observable<IComments[]> {
    return this.http.get<IComments[]>(this.baseUrl);
  }

  getCommentsForPost(postId: string): Observable<IComments[]> {
    return this.http.get<IComments[]>(`${this.baseUrl}/${postId}`);
  }

  createComment(comment: IComments): Observable<IComments> {
    return this.http.post<IComments>(this.baseUrl, comment);
  }

  updateComment(
    commentId: string,
    updatedComment: IComments
  ): Observable<IComments> {
    return this.http.put<IComments>(
      `${this.baseUrl}/${commentId}`,
      updatedComment
    );
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`);
  }
}
