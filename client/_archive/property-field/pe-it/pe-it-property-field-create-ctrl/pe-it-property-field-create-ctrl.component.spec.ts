import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItPropertyFieldCreateCtrlComponent } from './pe-it-property-field-create-ctrl.component';

describe('PeItPropertyFieldCreateCtrlComponent', () => {
  let component: PeItPropertyFieldCreateCtrlComponent;
  let fixture: ComponentFixture<PeItPropertyFieldCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItPropertyFieldCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItPropertyFieldCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
