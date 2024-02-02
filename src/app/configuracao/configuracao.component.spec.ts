import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoComponent } from './configuracao.component';

describe('ConfiguracaoComponent', () => {
  let component: ConfiguracaoComponent;
  let fixture: ComponentFixture<ConfiguracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
