import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAddChooseClassComponent } from './entity-add-choose-class.component';

describe('EntityAddChooseClassComponent', () => {
  let component: EntityAddChooseClassComponent;
  let fixture: ComponentFixture<EntityAddChooseClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityAddChooseClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityAddChooseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
