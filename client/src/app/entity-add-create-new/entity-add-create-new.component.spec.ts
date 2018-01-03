import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddCreateNewComponent } from './entity-add-create-new.component';

describe('EntityAddCreateNewComponent', () => {
  let component: EntityAddCreateNewComponent;
  let fixture: ComponentFixture<EntityAddCreateNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAddCreateNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAddCreateNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
