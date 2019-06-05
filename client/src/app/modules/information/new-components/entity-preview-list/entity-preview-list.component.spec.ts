import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPreviewListComponent } from './entity-preview-list.component';

describe('EntityPreviewListComponent', () => {
  let component: EntityPreviewListComponent;
  let fixture: ComponentFixture<EntityPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPreviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
