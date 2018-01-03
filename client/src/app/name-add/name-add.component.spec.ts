import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAddComponent } from './name-add.component';

describe('NameAddComponent', () => {
  let component: NameAddComponent;
  let fixture: ComponentFixture<NameAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
