import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPeItEditableStateComponent } from './init-pe-it-editable-state.component';

describe('InitPeItEditableStateComponent', () => {
  let component: InitPeItEditableStateComponent;
  let fixture: ComponentFixture<InitPeItEditableStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitPeItEditableStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPeItEditableStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
