import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddModalComponent } from './entity-add-modal.component';

describe('EntityAddModalComponent', () => {
  let component: EntityAddModalComponent;
  let fixture: ComponentFixture<EntityAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
