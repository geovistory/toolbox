import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityModalComponent } from './create-entity-modal.component';

describe('CreateEntityModalComponent', () => {
  let component: CreateEntityModalComponent;
  let fixture: ComponentFixture<CreateEntityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEntityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
