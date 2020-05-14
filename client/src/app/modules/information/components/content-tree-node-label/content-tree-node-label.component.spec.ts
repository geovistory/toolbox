import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTreeNodeLabelComponent } from './content-tree-node-label.component';

describe('ContentTreeNodeLabelComponent', () => {
  let component: ContentTreeNodeLabelComponent;
  let fixture: ComponentFixture<ContentTreeNodeLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTreeNodeLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTreeNodeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
