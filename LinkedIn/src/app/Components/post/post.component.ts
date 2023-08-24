import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPost } from '../Interfaces/post';
import { UsersService } from '../../users.service';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  // @ViewChild('content') content!: any;

  isPostPage: boolean = false;
  newPost: Partial<IPost> = {
    _id: '',
    text: '',
    username: '',
    createdAt: '',
    updatedAt: '',
  };
  posts: IPost[] = [];
  post!: IPost;
  selectedPostId!: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private postSVC: PostsService,
    private usersSVC: UsersService
  ) {
    this.route.url.subscribe((urlSegments) => {
      this.isPostPage = urlSegments[0]?.path === 'post';
    });
  }

  ngOnInit() {
    this.usersSVC.getOwnInfo().subscribe(
      (user) => {
        const userId = user._id;
        this.getMyPost(userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getMyPost(userId: string): void {
    this.postSVC.getPost(userId).subscribe(
      (data) => {
        this.posts = data;
        console.log('Post list:', this.posts);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  // MODALE
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Funzione sezione esperienze
  // buttonHandler() {
  //   if (this.isPostPage) {
  //     this.open(this.content);
  //   } else {
  //     this.router.navigate(['/post']);
  //   }
  // }

  createPost() {
    this.usersSVC.getOwnInfo().subscribe(
      (user) => {
        const userId = user._id;
        this.postSVC.createPost(userId, this.newPost).subscribe(
          (response: any) => {
            console.log('New post added:', response);
            this.getMyPost(userId);
          },
          (error: any) => {
            console.error('Error creating post:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.modalService.dismissAll();
  }

  // @ViewChild('content') modalContent!: any;

  // openModifyModal(postId: string) {
  //   const selectedPost = this.post.find(
  //     (post: { _id: string }) => post._id === postId
  //   );
  //   if (selectedPost) {
  //     this.newPost = { ...selectedPost };
  //     this.selectedPostId = postId;
  //     this.modalService.open(this.modalContent, { size: 'lg' });
  //   }
  // }

  // Method to modify an experience
  modifyMyPost(postId: string, formData: Partial<IPost>): void {
    this.usersSVC.getOwnInfo().subscribe(
      (user) => {
        const userId = user._id;
        this.postSVC.modifyPost(userId, postId, formData).subscribe(
          () => {
            console.log(`Post with ID ${postId} modified successfully.`);
            this.getMyPost(userId);
            this.modalService.dismissAll();
          },
          (error: any) => {
            console.error(`Failed to modify post with ID ${postId}.`, error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  deletePost(postId: string) {
    console.log('Delete button clicked for experience ID:', postId);
    this.usersSVC.getOwnInfo().subscribe(
      (user) => {
        const userId = user._id;
        console.log('postId:', postId);
        this.postSVC.deletePostSvc(userId, postId).subscribe(
          () => {
            console.log('this.posts:', this.posts);
            this.posts = this.posts.filter((post) => post._id !== postId);
            this.getMyPost(userId);
          },
          (error: any) => {
            console.error(
              `Failed to delete experience with ID ${postId}.`,
              error
            );
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  calculateDateDifference(startDateStr: string, endDateStr: string) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const timeDifference = end.getTime() - start.getTime();
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(months / 12);

    return `${years} years, ${months % 12} months`;
  }
}

// function ViewChild(
//   arg0: string
// ): (target: PostComponent, propertyKey: 'content') => void {
//   throw new Error('Function not implemented.');
// }
