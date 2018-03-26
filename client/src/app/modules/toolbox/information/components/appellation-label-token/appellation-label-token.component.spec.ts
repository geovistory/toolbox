import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePartInputComponent } from './name-part-input.component';

describe('NamePartInputComponent', () => {
  let component: NamePartInputComponent;
  let fixture: ComponentFixture<NamePartInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamePartInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamePartInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
