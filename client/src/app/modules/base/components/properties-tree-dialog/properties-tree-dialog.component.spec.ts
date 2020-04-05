import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesTreeDialogComponent } from './properties-tree-dialog.component';

describe('PropertiesTreeDialogComponent', () => {
  let component: PropertiesTreeDialogComponent;
  let fixture: ComponentFixture<PropertiesTreeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesTreeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesTreeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
