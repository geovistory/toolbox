import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTreeNodeOptionsComponent } from './content-tree-node-options.component';

describe('ContentTreeNodeOptionsComponent', () => {
  let component: ContentTreeNodeOptionsComponent;
  let fixture: ComponentFixture<ContentTreeNodeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTreeNodeOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTreeNodeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
