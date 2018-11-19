import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrAddPeItComponent } from './create-or-add-pe-it.component';

describe('CreateOrAddPeItComponent', () => {
  let component: CreateOrAddPeItComponent;
  let fixture: ComponentFixture<CreateOrAddPeItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrAddPeItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrAddPeItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
