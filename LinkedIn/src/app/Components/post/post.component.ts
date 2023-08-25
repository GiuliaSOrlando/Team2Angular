import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPost } from '../Interfaces/post';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  openModifyModal(arg0: any) {
    throw new Error('Method not implemented.');
  }
  newPost: Partial<IPost> = { text: '' };
  isExperiencePage: any;
  experience: any;
  constructor(private postSVC: PostsService) {}
  posts!: IPost[];
  post!: IPost;
  text!: string;

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
