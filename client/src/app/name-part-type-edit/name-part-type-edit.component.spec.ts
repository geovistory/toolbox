import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePartComponent } from './name-part.component';

describe('NamePartComponent', () => {
  let component: NamePartComponent;
  let fixture: ComponentFixture<NamePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
