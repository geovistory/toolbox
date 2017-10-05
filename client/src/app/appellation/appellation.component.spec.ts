import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelationComponent } from './appelation.component';

describe('AppelationComponent', () => {
  let component: AppelationComponent;
  let fixture: ComponentFixture<AppelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
