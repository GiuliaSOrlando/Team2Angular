import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent {
  isResourcesPage: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe((urlSegments) => {
      this.isResourcesPage = urlSegments[0]?.path === 'resources';
    });
  }

  // Funzione sezione risorse
  buttonHandler() {
    this.router.navigate(['/resources']);
  }
}
