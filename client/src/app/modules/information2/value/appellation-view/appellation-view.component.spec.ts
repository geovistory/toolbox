import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationViewComponent } from './appellation-view.component';

describe('AppellationViewComponent', () => {
  let component: AppellationViewComponent;
  let fixture: ComponentFixture<AppellationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
