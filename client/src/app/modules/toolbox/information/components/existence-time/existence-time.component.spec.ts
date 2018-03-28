import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeComponent } from './existence-time.component';

describe('ExistenceTimeComponent', () => {
  let component: ExistenceTimeComponent;
  let fixture: ComponentFixture<ExistenceTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
