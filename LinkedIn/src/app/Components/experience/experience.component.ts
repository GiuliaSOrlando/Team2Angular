import { ExperienceService } from './../../experience.service';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IExperience } from '../Interfaces/experience';

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

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private experienceSVC: ExperienceService
  ) {
    this.route.url.subscribe((urlSegments) => {
      this.isExperiencePage = urlSegments[0]?.path === 'experience';
    });
  }

  ngOnInit() {
    this.getMyExperience();
    console.log(this.experiences);
  }

  getMyExperience(): void {
    const userId = '64e30d0c1f175c0014c558b6';
    this.experienceSVC.getExperience(userId).subscribe(
      (data: IExperience) => {
        this.experiences = this.experiences.concat(data);
        console.log('esperienze aggiunte', this.experiences);
      },
      (error) => {
        console.error('Error fetching experiences:', error);
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
    this.experienceSVC
      .createExperience('64e30d0c1f175c0014c558b6', this.newExperience)
      .subscribe((response) => {
        console.log('New experience added:', response);
      });

    this.modalService.dismissAll();
  }

  deleteExperience() {
    this.experienceSVC
      .deleteExperience('64e30d0c1f175c0014c558b6', '64e4bf94dffb8b0014413c65')
      .subscribe((response) => {
        console.log('Experience deleted:', response);
      });
  }

  @ViewChild('content') modalContent!: any;

  openModal(experienceId: string) {
    const selectedExperience = this.experiences.find(
      (exp) => exp._id === experienceId
    );
    if (selectedExperience) {
      this.newExperience = { ...selectedExperience };
      this.modalService.open(this.modalContent, { size: 'lg' });
    }
  }

  // Method to modify an experience
  modifyExperience(userId: string, expId: string, formData: IExperience): void {
    this.experienceSVC.modifyExperience(userId, expId, formData).subscribe(
      () => {
        console.log(`Experience with ID ${expId} modified successfully.`);
        this.modalService.dismissAll();
      },
      (error) => {
        console.error(`Failed to modify experience with ID ${expId}.`, error);
      }
    );
  }
}
