import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorstGraphComponent } from './worst-graph.component';

describe('WorstGraphComponent', () => {
  let component: WorstGraphComponent;
  let fixture: ComponentFixture<WorstGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorstGraphComponent]
    });
    fixture = TestBed.createComponent(WorstGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
