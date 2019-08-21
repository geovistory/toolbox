import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPreviewAddListComponent } from './entity-preview-add-list.component';

describe('EntityPreviewAddListComponent', () => {
  let component: EntityPreviewAddListComponent;
  let fixture: ComponentFixture<EntityPreviewAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPreviewAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPreviewAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
