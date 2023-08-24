import { Component, TemplateRef } from '@angular/core';
import { IUser } from '../Interfaces/user';
import { UsersService } from 'src/app/users.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private userSVC: UsersService,
    private offcanvasService: NgbOffcanvas
  ) {}
  userId: string = '';
  user!: IUser;
  email: string = '';
  name: string = '';
  surname: string = '';
  fullName: string = '';
  title: string = '';
  users: IUser[] = [];
  searchInput: string = '';

  ngOnInit() {
    this.getMyProfile();
    this.getAllUsers();
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

  // Offcanvas
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
