import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HbfPanelComponent } from './hbf-panel.component';

describe('HbfPanelComponent', () => {
  let component: HbfPanelComponent;
  let fixture: ComponentFixture<HbfPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HbfPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HbfPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
