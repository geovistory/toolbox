import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeHelpComponent } from './existence-time-help.component';

describe('ExistenceTimeHelpComponent', () => {
  let component: ExistenceTimeHelpComponent;
  let fixture: ComponentFixture<ExistenceTimeHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
