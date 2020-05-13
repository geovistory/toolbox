import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamFormComponent } from './ram-form.component';

describe('RamFormComponent', () => {
  let component: RamFormComponent;
  let fixture: ComponentFixture<RamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
