import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ThemeService } from '../../../../core/services/theme.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ThemeService', 
      ['initializeTheme', 'toggleDarkMode'],
      { currentMode: false }
    );

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: ThemeService, useValue: spy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a toggleDarkMode() del servicio cuando se ejecuta toggleTheme()', () => {
    component.toggleTheme();
    expect(themeServiceSpy.toggleDarkMode).toHaveBeenCalled();
  });

});
