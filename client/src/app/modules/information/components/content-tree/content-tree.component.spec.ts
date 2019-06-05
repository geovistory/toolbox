import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentTreeComponent } from './content-tree.component';

describe('ExpressionComponent', () => {
  let component: ContentTreeComponent;
  let fixture: ComponentFixture<ContentTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
