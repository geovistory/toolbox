import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPreviewComponent } from './data-unit-preview.component';

describe('EntityPreviewComponent', () => {
  let component: EntityPreviewComponent;
  let fixture: ComponentFixture<EntityPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
