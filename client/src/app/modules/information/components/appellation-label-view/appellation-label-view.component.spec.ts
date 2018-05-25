import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationLabelViewComponent } from './appellation-label-view.component';

describe('AppellationLabelViewComponent', () => {
  let component: AppellationLabelViewComponent;
  let fixture: ComponentFixture<AppellationLabelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationLabelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationLabelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
