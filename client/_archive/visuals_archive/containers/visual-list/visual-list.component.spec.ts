import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualListComponent } from './visual-list.component';

describe('VisualListComponent', () => {
  let component: VisualListComponent;
  let fixture: ComponentFixture<VisualListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
