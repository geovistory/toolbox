import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDrawerHeaderComponent } from './list-drawer-header.component';

describe('ListDrawerHeaderComponent', () => {
  let component: ListDrawerHeaderComponent;
  let fixture: ComponentFixture<ListDrawerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDrawerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDrawerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
