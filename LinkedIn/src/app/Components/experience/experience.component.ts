import { ExperienceService } from './../../experience.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from '../Interfaces/experience';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  @ViewChild('content') content!: any;

  isExperiencePage: boolean = false;
  newExperience: Partial<IExperience> = {
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    area: '',
  };
  experiences: IExperience[] = [];
  experience!: IExperience;
  selectedExperienceId!: string;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private experienceSVC: ExperienceService,
    private usersSVC: UsersService
  ) {
    this.route.url.subscribe((urlSegments) => {
      this.isExperiencePage = urlSegments[0]?.path === 'experience';
    });
  }

  ngOnInit() {
    this.usersSVC.getSingleUser().subscribe(
      (user) => {
        const userId = user._id;
        this.getMyExperience(userId);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  getMyExperience(userId: string): void {
    this.experienceSVC.getExperience(userId).subscribe(
      (data: IExperience) => {
        this.experiences = [];
        this.experiences = this.experiences.concat(data);
        console.log('Experiences list:', this.experiences);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // MODALE
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  // Funzione sezione esperienze
  buttonHandler() {
    if (this.isExperiencePage) {
      this.open(this.content);
    } else {
      this.router.navigate(['/experience']);
    }
  }

  createExperience() {
    this.usersSVC.getSingleUser().subscribe(
      (user) => {
        const userId = user._id;
        this.experienceSVC
          .createExperience(userId, this.newExperience)
          .subscribe(
            (response) => {
              console.log('New experience added:', response);
              this.getMyExperience(userId);
            },
            (error) => {
              console.error('Error creating experience:', error);
            }
          );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.modalService.dismissAll();
  }

  @ViewChild('content') modalContent!: any;

  openModifyModal(experienceId: string) {
    const selectedExperience = this.experiences.find(
      (exp) => exp._id === experienceId
    );
    if (selectedExperience) {
      this.newExperience = { ...selectedExperience };
      this.selectedExperienceId = experienceId;
      this.modalService.open(this.modalContent, { size: 'lg' });
    }
  }

  // Method to modify an experience
  modifyMyExperience(expId: string, formData: Partial<IExperience>): void {
    this.usersSVC.getSingleUser().subscribe(
      (user) => {
        const userId = user._id;
        this.experienceSVC.modifyExperience(userId, expId, formData).subscribe(
          () => {
            console.log(`Experience with ID ${expId} modified successfully.`);
            this.getMyExperience(userId);
            this.modalService.dismissAll();
          },
          (error) => {
            console.error(
              `Failed to modify experience with ID ${expId}.`,
              error
            );
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  deleteExperience(experienceId: string) {
    this.usersSVC.getSingleUser().subscribe(
      (user) => {
        const userId = user._id;
        console.log('experienceId:', experienceId);
        this.experienceSVC.deleteExperienceSvc(userId, experienceId).subscribe(
          () => {
            console.log('this.experiences:', this.experiences);
            this.experiences = this.experiences.filter(
              (exp) => exp._id !== experienceId
            );
            this.getMyExperience(userId);
          },
          (error) => {
            console.error(
              `Failed to delete experience with ID ${experienceId}.`,
              error
            );
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  calculateDateDifference(startDateStr: string, endDateStr: string) {
    const start = new Date(startDateStr);
    const end = new Date(endDateStr);

    const timeDifference = end.getTime() - start.getTime();
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(months / 12);

    return `${years} years, ${months % 12} months`;
  }
}
