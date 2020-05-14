import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentioningListComponent } from './mentioning-list.component';

describe('MentioningListComponent', () => {
  let component: MentioningListComponent;
  let fixture: ComponentFixture<MentioningListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentioningListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentioningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
