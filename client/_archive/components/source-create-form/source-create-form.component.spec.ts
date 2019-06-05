import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCreateFormComponent } from './source-create-form.component';

describe('SourceCreateFormComponent', () => {
  let component: SourceCreateFormComponent;
  let fixture: ComponentFixture<SourceCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
