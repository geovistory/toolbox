import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualDetailComponent } from './visual-detail.component';

describe('VisualDetailComponent', () => {
  let component: VisualDetailComponent;
  let fixture: ComponentFixture<VisualDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
