import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntExistenceTimeComponent } from './te-ent-existence-time.component';

describe('TeEntExistenceTimeComponent', () => {
  let component: TeEntExistenceTimeComponent;
  let fixture: ComponentFixture<TeEntExistenceTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntExistenceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntExistenceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
