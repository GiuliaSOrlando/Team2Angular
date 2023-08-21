import { Component } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private userSVC: UsersService) {}
  userId: string = '';
  user!: IUser;
  email: string = '';
  name: string = '';
  surname: string = '';
  fullName: string = '';
  users: IUser[] = [];
  searchInput: string = '';

  ngOnInit() {
    this.getAllUsers();
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

  searchProfile(input: string) {
    if (input.includes('@')) {
      this.getSpecificProfileByEmail(input);
    } else {
      this.getSpecificProfileByNameAndSurname(input);
    }
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
}
