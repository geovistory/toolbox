import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalPreviewComponent } from './digital-preview.component';

describe('DigitalPreviewComponent', () => {
  let component: DigitalPreviewComponent;
  let fixture: ComponentFixture<DigitalPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
