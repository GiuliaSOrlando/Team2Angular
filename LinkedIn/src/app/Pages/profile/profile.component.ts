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
  email: string = '';
  name: string = '';
  surname: string = '';
  fullName: string = '';
  users: IUser[] = [];

  ngOnInit() {
    this.getAllUsers();
    this.getMyProfile();
  }

  getAllUsers() {
    this.userSVC.getUsers().subscribe(
      (users: IUser[]) => {
        this.users = users;
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

  getSpecificProfileByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    console.log('Found user:', user);

    if (user) {
      console.log('User ID:', user._id);
      this.getSpecificProfile(user._id);
    } else {
      console.log('User not found');
    }
  }

  getSpecificProfileByNameAndSurname(fullName: string) {
    const [name, surname] = fullName.split(' ');

    const user = this.users.find(
      (user) => user.name === name && user.surname === surname
    );
    console.log('Found user:', user);

    if (user) {
      console.log('User ID:', user._id);
      this.getSpecificProfile(user._id);
    } else {
      console.log('User not found');
    }
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
