import { Component } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { IUser } from '../Interfaces/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  constructor(private userSVC: UsersService, private route: ActivatedRoute) {}
  user!: IUser;
  username!: string;
  _id!: string;
  suggestedProfiles: IUser[] = [];

  ngOnInit() {
    this.getMyProfile();
    this.getSuggestedProfiles();
  }

  getMyProfile() {
    this.userSVC.getOwnInfo().subscribe((user: IUser) => {
      this.user = user;
      this.username = user.username;
    });
  }

  getSuggestedProfiles() {
    this.userSVC.getUsers().subscribe((users: IUser[]) => {
      const shuffledUsers = users.sort(() => 0.5 - Math.random());
      this.suggestedProfiles = shuffledUsers.slice(0, 5);
      console.log(this.suggestedProfiles);
    });
  }
}
