import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItCreateFormComponent } from './pe-it-create-form.component';

describe('PeItCreateFormComponent', () => {
  let component: PeItCreateFormComponent;
  let fixture: ComponentFixture<PeItCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
