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
  experience!: IExperience;
  selectedExperienceId!: string;

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
        console.log('Added experience', this.experiences);
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
    this.experienceSVC
      .createExperience('64e30d0c1f175c0014c558b6', this.newExperience)
      .subscribe((response) => {
        console.log('New experience added:', response);
        this.getMyExperience();
      });

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
  modifyExperience(
    userId: string,
    expId: string,
    formData: Partial<IExperience>
  ): void {
    console.log(this.newExperience);
    this.experienceSVC.modifyExperience(userId, expId, formData).subscribe(
      () => {
        console.log(`Experience with ID ${expId} modified successfully.`);
        this.getMyExperience();
        this.modalService.dismissAll();
        console.log(this.newExperience);
      },
      (error) => {
        console.error(`Failed to modify experience with ID ${expId}.`, error);
      }
    );
  }

  deleteExperience(experienceId: string) {
    const userId = '64e30d0c1f175c0014c558b6';
    this.experienceSVC.deleteExperience(userId, experienceId).subscribe(
      () => {
        console.log(`Experience with ID ${experienceId} deleted successfully.`);
        this.experiences = this.experiences.filter(
          (exp) => exp._id !== experienceId
        );
        this.getMyExperience();
      },
      (error) => {
        console.error(
          `Failed to delete experience with ID ${experienceId}.`,
          error
        );
      }
    );
  }
}
