import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfhIdComponent } from './dfh-id.component';

describe('DfhIdComponent', () => {
  let component: DfhIdComponent;
  let fixture: ComponentFixture<DfhIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfhIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfhIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
