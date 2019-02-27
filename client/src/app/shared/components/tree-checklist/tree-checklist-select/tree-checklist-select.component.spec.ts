import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeChecklistSelectComponent } from './tree-checklist-select.component';

describe('TreeChecklistSelectComponent', () => {
  let component: TreeChecklistSelectComponent;
  let fixture: ComponentFixture<TreeChecklistSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeChecklistSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeChecklistSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
