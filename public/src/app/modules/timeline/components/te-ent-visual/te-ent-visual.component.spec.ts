import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntVisualComponent } from './te-ent-visual.component';

describe('TeEntVisualComponent', () => {
  let component: TeEntVisualComponent;
  let fixture: ComponentFixture<TeEntVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
