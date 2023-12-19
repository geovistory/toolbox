import { Component, OnInit } from '@angular/core';
import { PassiveLinkDirective } from '../../directives/passive-link/passive-link.directive';
import { NgIf } from '@angular/common';

@Component({
    selector: 'gv-read-more',
    templateUrl: './read-more.component.html',
    styleUrls: ['./read-more.component.scss'],
    standalone: true,
    imports: [NgIf, PassiveLinkDirective]
})
export class ReadMoreComponent {
  isCollapsed = true;
}
