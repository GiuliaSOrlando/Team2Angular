import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  @ViewChild('content') content!: any;

  isExperiencePage: boolean = false;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.url.subscribe((urlSegments) => {
      this.isExperiencePage = urlSegments[0]?.path === 'experience';
    });
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
}
