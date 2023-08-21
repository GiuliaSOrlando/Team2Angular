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

  ngOnInit() {
    this.getAllUsers();
    this.getMyProfile();
  }

  getAllUsers() {
    this.userSVC.getUsers().subscribe(
      (users: IUser[]) => {
        console.log(users);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getMyProfile() {
    this.userSVC.getSingleUser().subscribe(
      (user: IUser) => {
        console.log(user);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSpecificProfile(userId: string) {
    console.log(userId);
    this.userSVC.getSpecificUser(this.userId).subscribe(
      (user: IUser) => {
        console.log(user);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
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
