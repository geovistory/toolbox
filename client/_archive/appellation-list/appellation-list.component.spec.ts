import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationListComponent } from './appellation-list.component';

describe('AppellationListComponent', () => {
  let component: AppellationListComponent;
  let fixture: ComponentFixture<AppellationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
