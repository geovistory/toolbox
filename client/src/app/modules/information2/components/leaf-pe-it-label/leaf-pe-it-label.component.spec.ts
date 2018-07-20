import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntLabelComponent } from './te-ent-label.component';

describe('TeEntLabelComponent', () => {
  let component: TeEntLabelComponent;
  let fixture: ComponentFixture<TeEntLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
