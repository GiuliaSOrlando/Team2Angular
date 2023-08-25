import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPost } from '../Interfaces/post';
import { PostsService } from '../../posts.service';
import { CommentsService } from 'src/app/comments.service';
import { IComments } from '../Interfaces/comments';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(
    private postSVC: PostsService,
    private commentsSVC: CommentsService
  ) {}
  posts!: IPost[];
  post!: IPost;
  text!: string;
  postCommentsMap: { [postId: string]: IComments[] } = {};

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postSVC.getPost().subscribe(
      (data) => {
        this.posts = data;
        console.log('Post list:', this.posts);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  showComments(postId: string) {
    this.commentsSVC.getCommentsForPost(postId).subscribe(
      (comments: IComments[]) => {
        this.postCommentsMap[postId] = comments;
      },
      (error) => {
        console.error(`Error loading comments for post ${postId}:`, error);
      }
    );
  }
}
