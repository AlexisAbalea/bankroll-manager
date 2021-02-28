import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBankrollComponent } from './card-bankroll.component';

describe('CardBankrollComponent', () => {
  let component: CardBankrollComponent;
  let fixture: ComponentFixture<CardBankrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardBankrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBankrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
