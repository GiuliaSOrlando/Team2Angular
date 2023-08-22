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
        this.experiences.push(data);
        console.log(this.experiences);
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
}
