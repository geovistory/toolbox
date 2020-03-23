import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTreeNodeTypeComponent } from './content-tree-node-type.component';

describe('ContentTreeNodeTypeComponent', () => {
  let component: ContentTreeNodeTypeComponent;
  let fixture: ComponentFixture<ContentTreeNodeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTreeNodeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTreeNodeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
