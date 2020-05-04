import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSpanListComponent } from './time-span-list.component';

describe('TimeSpanListComponent', () => {
  let component: TimeSpanListComponent;
  let fixture: ComponentFixture<TimeSpanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSpanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSpanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
