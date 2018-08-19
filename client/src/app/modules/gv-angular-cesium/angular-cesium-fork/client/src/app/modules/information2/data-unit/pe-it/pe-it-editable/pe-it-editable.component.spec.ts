import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItEditableComponent } from './pe-it-editable.component';

describe('PeItEditableComponent', () => {
  let component: PeItEditableComponent;
  let fixture: ComponentFixture<PeItEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
