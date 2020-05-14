import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafItemListComponent } from './leaf-item-list.component';

describe('LeafItemListComponent', () => {
  let component: LeafItemListComponent;
  let fixture: ComponentFixture<LeafItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeafItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeafItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
