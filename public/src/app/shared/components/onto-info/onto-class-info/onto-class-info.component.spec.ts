import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntoClassInfoComponent } from './onto-class-info.component';

describe('OntoClassInfoComponent', () => {
  let component: OntoClassInfoComponent;
  let fixture: ComponentFixture<OntoClassInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntoClassInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntoClassInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
