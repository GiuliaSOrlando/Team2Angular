import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { IPost } from 'src/app/Components/Interfaces/post';
import { IUser } from 'src/app/Components/Interfaces/user';
import { PostsService } from 'src/app/posts.service';
import { UsersService } from 'src/app/users.service';
import { SharedService } from 'src/app/shared.service';
import { Observable, Subscription, map } from 'rxjs';
import { IComments } from 'src/app/Components/Interfaces/comments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  commentsSVC: any;
  postCommentsMap: any;
  constructor(
    private userSVC: UsersService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private postsSVC: PostsService,
    private sharedSVC: SharedService
  ) {
    this.randomNumFirst = Math.floor(Math.random() * 100) + 1;
    this.randomNumSecond = Math.floor(Math.random() * 100) + 1;
    this.randomNumThird = Math.floor(Math.random() * 100) + 1;

    this.selectedUserSubscription = this.sharedSVC.selectedUser$.subscribe(
      (user) => {
        this.selectedUser = user;
        if (this.selectedUser) {
          this.getPostsByUsername(this.selectedUser._id);
        }
      }
    );
  }
  userId: string = '';
  user!: IUser | null;
  name: string = '';
  surname: string = '';
  email: string = '';
  bio: string = '';
  title: string = '';
  area: string = '';
  fullName: string = '';
  users: IUser[] = [];
  randomNumFirst!: number;
  randomNumSecond!: number;
  randomNumThird!: number;
  posts: IPost[] = [];
  newPost: Partial<IPost> = { text: '' };

  private asideSubscription: Subscription | undefined;
  selectedUser: IUser | null = null;
  private selectedUserSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.userId = id;
        this.getUserInfo();
        this.getPostsByUsername(this.userId);
      } else {
        this.getMyProfile();
        this.getMyPosts();
      }
    });
  }

  ngOnDestroy() {
    if (this.asideSubscription) {
      this.asideSubscription.unsubscribe();
    }
  }

  getMyProfile() {
    this.userSVC.getOwnInfo().subscribe(
      (user: IUser) => {
        this.user = user;
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.title = this.user.title;
        console.log(user);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  @ViewChild('contactModal') contactModal!: any;

  openModal() {
    this.modalService.open(this.contactModal, {
      ariaLabelledBy: 'modal-basic-title',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  getUserInfo() {
    this.userSVC.getSpecificUser(this.userId).subscribe(
      (user: IUser) => {
        this.user = user;
        this.name = user.name;
        this.surname = user.surname;
        this.title = user.title;
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  updateProfile() {
    this.userSVC
      .updateUser({ name: this.name, surname: this.surname })
      .subscribe((response) => {});
  }

  // MODALE
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getMyPosts() {
    this.userSVC.getOwnInfo().subscribe(
      (user: IUser) => {
        this.user = user;
        this.postsSVC.getPost().subscribe(
          (posts: IPost[]) => {
            this.posts = posts.filter(
              (post) => post.username === user.username
            );
            console.log('User Posts:', this.posts);
          },
          (error) => {
            console.error('Error fetching all posts:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getPostsByUsername(username: string) {
    this.getPostBySpecificProfile(this.userId);
  }

  getPostBySpecificProfile(userId: string) {
    this.userSVC.getSpecificUser(userId).subscribe(
      (user: IUser) => {
        this.postsSVC.getPost().subscribe(
          (posts: IPost[]) => {
            this.posts = posts.filter(
              (post) => post.username === user.username
            );
            console.log('User Posts:', this.posts);
          },
          (error) => {
            console.error('Error fetching posts:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // CAROSELLO
  slideRight(element: HTMLElement) {
    console.log(element);
    element.scrollLeft = 500;
  }
  slideLeft(element: HTMLElement) {
    console.log(element);
    element.scrollLeft = -500;
  }

  createMyPost() {
    this.postsSVC.getPost().subscribe((postlist) => {
      this.posts = postlist;
    });
    this.postsSVC.createPost(this.newPost).subscribe(
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

  showComments(postId: string) {
    this.commentsSVC
      .getCommentsForPost(postId)
      .subscribe((comments: IComments[]) => {
        this.postCommentsMap[postId] = comments;
      });
  }
}
