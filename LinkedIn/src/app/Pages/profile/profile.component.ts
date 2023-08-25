import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/Components/Interfaces/user';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private userSVC: UsersService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {
    this.randomNumFirst = Math.floor(Math.random() * 100) + 1;
    this.randomNumSecond = Math.floor(Math.random() * 100) + 1;
    this.randomNumThird = Math.floor(Math.random() * 100) + 1;
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

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.userId = id;
        this.getUserInfo();
      } else {
        this.getMyProfile();
      }
    });
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

  // CAROSELLO
  scrollLeft(event: Event) {
    const target = event.target as HTMLInputElement;
    target.scrollLeft = 100;
  }
}
