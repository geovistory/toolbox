import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleBtnComponent } from './toggle-btn.component';

describe('ToggleBtnComponent', () => {
  let component: ToggleBtnComponent;
  let fixture: ComponentFixture<ToggleBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
