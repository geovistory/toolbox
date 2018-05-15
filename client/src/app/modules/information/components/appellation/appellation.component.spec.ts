import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationComponent } from './appellation.component';

describe('AppellationComponent', () => {
  let component: AppellationComponent;
  let fixture: ComponentFixture<AppellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
