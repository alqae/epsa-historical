import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsGraphComponent } from './clients-graph.component';

describe('ClientsGraphComponent', () => {
  let component: ClientsGraphComponent;
  let fixture: ComponentFixture<ClientsGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientsGraphComponent]
    });
    fixture = TestBed.createComponent(ClientsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
