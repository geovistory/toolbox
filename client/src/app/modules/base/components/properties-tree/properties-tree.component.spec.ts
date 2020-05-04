import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesTreeComponent } from './properties-tree.component';

describe('PropertiesTreeComponent', () => {
  let component: PropertiesTreeComponent;
  let fixture: ComponentFixture<PropertiesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
