import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTopBarComponent } from './detail-top-bar.component';

describe('DetailTopBarComponent', () => {
  let component: DetailTopBarComponent;
  let fixture: ComponentFixture<DetailTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
