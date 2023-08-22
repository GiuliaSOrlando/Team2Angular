import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/Components/Interfaces/user';
import { UsersService } from 'src/app/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private userSVC: UsersService, private modalService: NgbModal) {}
  userId: string = '';
  user!: IUser;
  name: string = '';
  surname: string = '';
  email: string = '';
  bio: string = '';
  title: string = '';
  area: string = '';
  fullName: string = '';
  users: IUser[] = [];

  ngOnInit() {
    this.getMyProfile();
  }

  // ngOnInit() {
  //   this.getMyProfile();
  //   this.userSVC.user$.subscribe(updatedUser => {
  //         this.user = updatedUser;
  //        });
  // }

  getMyProfile() {
    this.userSVC.getSingleUser().subscribe(
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

  updateProfile() {
    this.userSVC
      .updateUser({ name: this.name, surname: this.surname })
      .subscribe((response) => {});
  }

  // MODALE
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
