import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePeItFormComponent } from './create-pe-it-form.component';

describe('CreatePeItFormComponent', () => {
  let component: CreatePeItFormComponent;
  let fixture: ComponentFixture<CreatePeItFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePeItFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePeItFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
