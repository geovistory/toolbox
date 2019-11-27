import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPreviewsPaginatedDialogComponent } from './entity-previews-paginated-dialog.component';

describe('EntityPreviewsPaginatedDialogComponent', () => {
  let component: EntityPreviewsPaginatedDialogComponent;
  let fixture: ComponentFixture<EntityPreviewsPaginatedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPreviewsPaginatedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPreviewsPaginatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
