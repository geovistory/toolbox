import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationLabelCreateComponent } from './appellation-label-create.component';

describe('AppellationLabelCreateComponent', () => {
  let component: AppellationLabelCreateComponent;
  let fixture: ComponentFixture<AppellationLabelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationLabelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationLabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
