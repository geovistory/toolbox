import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityCreateModalComponent } from './entity-create-modal.component';

describe('EntityCreateModalComponent', () => {
  let component: EntityCreateModalComponent;
  let fixture: ComponentFixture<EntityCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
