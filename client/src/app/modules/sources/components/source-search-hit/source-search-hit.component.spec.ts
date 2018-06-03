import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSearchHitComponent } from './source-search-hit.component';

describe('SourceSearchHitComponent', () => {
  let component: SourceSearchHitComponent;
  let fixture: ComponentFixture<SourceSearchHitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceSearchHitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceSearchHitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
