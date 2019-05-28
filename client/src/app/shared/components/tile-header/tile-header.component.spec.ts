import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileHeaderComponent } from './tile-header.component';

describe('TileHeaderComponent', () => {
  let component: TileHeaderComponent;
  let fixture: ComponentFixture<TileHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
