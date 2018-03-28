import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySearchHitComponent } from './entity-search-hit.component';

describe('EntitySearchHitComponent', () => {
  let component: EntitySearchHitComponent;
  let fixture: ComponentFixture<EntitySearchHitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitySearchHitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySearchHitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
