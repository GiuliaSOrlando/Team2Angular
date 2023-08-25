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
  newPost: Partial<IPost> = { text: '' };
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

  createMyPost() {
    this.postSVC.getPost().subscribe((postlist) => {
      this.posts = postlist;
    });
    this.postSVC.createPost(this.newPost).subscribe(
      (response) => {
        console.log('response:', response);
        this.posts.push(response);
        console.log('post dopo push', this.posts);
        console.log('il nuovo post:', this.newPost);
      },
      (error) => {
        console.error('Error creating experience:', error);
      }
    );

    (error: any) => {
      console.error('Error fetching user data:', error);
    };
  }
}
