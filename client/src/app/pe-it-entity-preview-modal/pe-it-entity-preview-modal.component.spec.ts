import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItEntityPreviewModalComponent } from './pe-it-entity-preview-modal.component';

describe('PeItEntityPreviewModalComponent', () => {
  let component: PeItEntityPreviewModalComponent;
  let fixture: ComponentFixture<PeItEntityPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItEntityPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItEntityPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
