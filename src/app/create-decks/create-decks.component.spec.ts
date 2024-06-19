import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDecksComponent } from './create-decks.component';

describe('CreateDecksComponent', () => {
  let component: CreateDecksComponent;
  let fixture: ComponentFixture<CreateDecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDecksComponent]
    });
    fixture = TestBed.createComponent(CreateDecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
