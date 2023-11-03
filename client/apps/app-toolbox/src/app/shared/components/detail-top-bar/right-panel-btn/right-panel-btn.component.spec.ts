import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelBtnComponent } from './right-panel-btn.component';

describe('RightPanelBtnComponent', () => {
  let component: RightPanelBtnComponent;
  let fixture: ComponentFixture<RightPanelBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightPanelBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
