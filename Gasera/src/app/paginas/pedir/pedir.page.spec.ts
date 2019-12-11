import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirPage } from './pedir.page';

describe('PedirPage', () => {
  let component: PedirPage;
  let fixture: ComponentFixture<PedirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
