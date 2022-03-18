import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldTreeItemDropZoneComponent } from './view-field-tree-item-drop-zone.component';

describe('ViewFieldTreeItemDropZoneComponent', () => {
  let component: ViewFieldTreeItemDropZoneComponent;
  let fixture: ComponentFixture<ViewFieldTreeItemDropZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldTreeItemDropZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldTreeItemDropZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
