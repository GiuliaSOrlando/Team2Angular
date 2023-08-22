import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/Components/Interfaces/user';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private userSVC: UsersService, private modalService: NgbModal) {}
  userId: string = '';
  user!: IUser;
  email: string = '';
  name: string = '';
  surname: string = '';
  fullName: string = '';
  users: IUser[] = [];

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile() {
    this.userSVC.getSingleUser().subscribe(
      (user: IUser) => {
        this.user = user;
        console.log(user);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  @ViewChild('contactModal') contactModal!: any;

  openModal() {
    this.modalService
      .open(this.contactModal, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  // updateProfile() {
  //   this.userSVC.updateUser().subscribe(
  //     (user: IUser) => {
  //       console.log(user);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
}
