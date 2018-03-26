import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntComponent } from './te-ent.component';

describe('TeEntComponent', () => {
  let component: TeEntComponent;
  let fixture: ComponentFixture<TeEntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
