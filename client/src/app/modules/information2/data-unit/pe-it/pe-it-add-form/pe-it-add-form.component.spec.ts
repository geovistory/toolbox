import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItAddFormComponent } from './pe-it-add-form.component';

describe('PeItAddFormComponent', () => {
  let component: PeItAddFormComponent;
  let fixture: ComponentFixture<PeItAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
