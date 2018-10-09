import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCtrlComponent } from './type-ctrl.component';

describe('TypeCtrlComponent', () => {
  let component: TypeCtrlComponent;
  let fixture: ComponentFixture<TypeCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
