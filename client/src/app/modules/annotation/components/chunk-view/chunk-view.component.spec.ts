import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChunkViewComponent } from './chunk-view.component';

describe('ChunkViewComponent', () => {
  let component: ChunkViewComponent;
  let fixture: ComponentFixture<ChunkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChunkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChunkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
