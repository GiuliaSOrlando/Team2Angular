import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { IUser } from '../Interfaces/user';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @Output() userSelected = new EventEmitter<IUser>();
  constructor(
    private userSVC: UsersService,
    private router: Router,
    private sharedSVC: SharedService
  ) {}
  user!: IUser;
  username!: string;
  _id!: string;
  suggestedProfiles: IUser[] = [];
  selectedUser: IUser | null = null;

  ngOnInit() {
    this.getMyProfile();
    this.getSuggestedProfiles();

    this.sharedSVC.getSelectedUser().subscribe((user) => {
      this.selectedUser = user;
    });
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

  selectUser(user: IUser) {
    this.sharedSVC.setSelectedUser(user);
    this.router.navigate(['/profile', user._id]);
  }
}
