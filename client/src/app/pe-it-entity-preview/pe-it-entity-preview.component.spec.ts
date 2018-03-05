import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItEntityPreviewComponent } from './pe-it-entity-preview.component';

describe('PeItEntityPreviewComponent', () => {
  let component: PeItEntityPreviewComponent;
  let fixture: ComponentFixture<PeItEntityPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItEntityPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItEntityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
