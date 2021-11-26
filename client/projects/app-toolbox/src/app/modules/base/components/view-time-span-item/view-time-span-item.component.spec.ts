import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSpanItemComponent } from './view-time-span-item.component';

describe('ViewTimeSpanItemComponent', () => {
  let component: ViewTimeSpanItemComponent;
  let fixture: ComponentFixture<ViewTimeSpanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeSpanItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
