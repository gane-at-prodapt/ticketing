import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentStatsComponent } from './component-stats.component';

describe('ComponentStatsComponent', () => {
  let component: ComponentStatsComponent;
  let fixture: ComponentFixture<ComponentStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentStatsComponent]
    });
    fixture = TestBed.createComponent(ComponentStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
