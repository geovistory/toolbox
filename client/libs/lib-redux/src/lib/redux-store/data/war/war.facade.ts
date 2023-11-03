import { Injectable } from '@angular/core';
import { WarEntityPreviewFacade } from './entity_preview/war-entity-preview.facade';

@Injectable({
  providedIn: 'root'
})
export class WarFacade {
  constructor(
    public entityPreview: WarEntityPreviewFacade,
  ) { }
}
