import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSpanItemEditBtnComponent } from './view-time-span-item-edit-btn.component';

describe('ViewTimeSpanItemEditBtnComponent', () => {
  let component: ViewTimeSpanItemEditBtnComponent;
  let fixture: ComponentFixture<ViewTimeSpanItemEditBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeSpanItemEditBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanItemEditBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
