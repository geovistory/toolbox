import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabHandleComponent } from './tab-handle.component';

describe('TabHandleComponent', () => {
  let component: TabHandleComponent;
  let fixture: ComponentFixture<TabHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
