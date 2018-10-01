import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAddFormComponent } from './type-add-form.component';

describe('TypeAddFormComponent', () => {
  let component: TypeAddFormComponent;
  let fixture: ComponentFixture<TypeAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
