import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafItemAddListComponent } from './leaf-item-add-list.component';

describe('LeafItemAddListComponent', () => {
  let component: LeafItemAddListComponent;
  let fixture: ComponentFixture<LeafItemAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafItemAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafItemAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
