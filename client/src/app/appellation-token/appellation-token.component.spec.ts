import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationTokenComponent } from './appellation-token.component';

describe('AppellationTokenComponent', () => {
  let component: AppellationTokenComponent;
  let fixture: ComponentFixture<AppellationTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
