import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/Components/Interfaces/user';
import { UsersService } from 'src/app/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private userSVC: UsersService) {}
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
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
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
