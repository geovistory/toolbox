import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeVisualComponent } from './existence-time-visual.component';

describe('ExistenceTimeVisualComponent', () => {
  let component: ExistenceTimeVisualComponent;
  let fixture: ComponentFixture<ExistenceTimeVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
