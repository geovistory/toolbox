import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityMatcherComponent } from './entity-matcher.component';

describe('EntityMatcherComponent', () => {
  let component: EntityMatcherComponent;
  let fixture: ComponentFixture<EntityMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityMatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
