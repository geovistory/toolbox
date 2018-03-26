import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationLabelEditComponent } from './appellation-label-edit.component';

describe('AppellationLabelEditComponent', () => {
  let component: AppellationLabelEditComponent;
  let fixture: ComponentFixture<AppellationLabelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationLabelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationLabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
