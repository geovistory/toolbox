import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPreviewsPaginatedComponent } from './entity-previews-paginated.component';

describe('EntityPreviewsPaginatedComponent', () => {
  let component: EntityPreviewsPaginatedComponent;
  let fixture: ComponentFixture<EntityPreviewsPaginatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPreviewsPaginatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPreviewsPaginatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
