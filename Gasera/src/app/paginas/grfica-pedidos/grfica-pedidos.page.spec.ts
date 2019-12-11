import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrficaPedidosPage } from './grfica-pedidos.page';

describe('GrficaPedidosPage', () => {
  let component: GrficaPedidosPage;
  let fixture: ComponentFixture<GrficaPedidosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrficaPedidosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrficaPedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
