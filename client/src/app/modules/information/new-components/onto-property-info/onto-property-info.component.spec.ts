import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntoPropertyInfoComponent } from './onto-property-info.component';

describe('OntoPropertyInfoComponent', () => {
  let component: OntoPropertyInfoComponent;
  let fixture: ComponentFixture<OntoPropertyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntoPropertyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntoPropertyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
