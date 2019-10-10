import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntHeaderComponent } from './te-ent-header.component';

describe('TeEntHeaderComponent', () => {
  let component: TeEntHeaderComponent;
  let fixture: ComponentFixture<TeEntHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
