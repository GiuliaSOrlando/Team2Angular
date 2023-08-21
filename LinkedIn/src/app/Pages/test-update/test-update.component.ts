import { Component } from '@angular/core';
import { IUser } from 'src/app/Components/Interfaces/user';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-test-update',
  templateUrl: './test-update.component.html',
  styleUrls: ['./test-update.component.scss'],
})
export class TestUpdateComponent {
  constructor(private userSVC: UsersService) {}

  user: any;
  name: string = '';
  surname: string = '';

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile() {
    this.userSVC.getSingleUser().subscribe(
      (user: IUser) => {
        console.log('User info', user);
        this.user = user;
        this.name = this.user.name;
        this.surname = this.user.surname;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateProfile() {
    this.userSVC
      .updateUser({ name: this.name, surname: this.surname })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
