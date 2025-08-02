import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorFilterComponent } from './monitor-filter.component';

describe('MonitorFilterComponent', () => {
  let component: MonitorFilterComponent;
  let fixture: ComponentFixture<MonitorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
