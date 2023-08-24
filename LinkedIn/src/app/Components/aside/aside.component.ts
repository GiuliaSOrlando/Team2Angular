import { Component } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { IUser } from '../Interfaces/user';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  constructor(private userSVC: UsersService) {}
  user!: IUser;
  username!: string;
  _id!: string;

  ngOnInit() {
    this.getMyProfile();
  }

  getMyProfile() {
    this.userSVC.getSingleUser().subscribe((user: IUser) => {
      this.user = user;
      this.username = user.username;
    });
  }
}
