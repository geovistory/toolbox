import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'gv-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet]
})
export class MainComponent {
  isNavbarCollapsed: boolean;
}
