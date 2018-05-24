import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntExistenceTimeAddComponent } from './te-ent-existence-time-add.component';

describe('TeEntExistenceTimeAddComponent', () => {
  let component: TeEntExistenceTimeAddComponent;
  let fixture: ComponentFixture<TeEntExistenceTimeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntExistenceTimeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntExistenceTimeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
