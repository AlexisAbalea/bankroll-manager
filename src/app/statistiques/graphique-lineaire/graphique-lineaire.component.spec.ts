import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueLineaireComponent } from './graphique-lineaire.component';

describe('GraphiqueLineaireComponent', () => {
  let component: GraphiqueLineaireComponent;
  let fixture: ComponentFixture<GraphiqueLineaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphiqueLineaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphiqueLineaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
