import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueAreaComponent } from './graphique-area.component';

describe('GraphiqueAreaComponent', () => {
  let component: GraphiqueAreaComponent;
  let fixture: ComponentFixture<GraphiqueAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphiqueAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphiqueAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
