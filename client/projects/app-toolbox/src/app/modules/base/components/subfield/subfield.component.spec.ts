import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubfieldComponent } from './subfield.component';

describe('SubfieldComponent', () => {
  let component: SubfieldComponent;
  let fixture: ComponentFixture<SubfieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
