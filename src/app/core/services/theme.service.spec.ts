import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { PLATFORM_ID } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(ThemeService);

    spyOn(document.body.classList, 'toggle');
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.returnValue('false');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería establecer isBrowser en true cuando el PLATFORM_ID es "browser"', () => {
    expect(service.isBrowser).toBeTrue();
  });

  it('toggleDarkMode debería alternar el modo oscuro', () => {
    service.toggleDarkMode();

    expect(service.isDarkMode).toBeTrue();
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-mode', true);
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'true');

    service.toggleDarkMode();
    expect(service.isDarkMode).toBeFalse();
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-mode', false);
    expect(localStorage.setItem).toHaveBeenCalledWith('darkMode', 'false');
  });

  it('initializeTheme con valor "false" en localStorage', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('false');

    service.initializeTheme();

    expect(service.isDarkMode).toBeFalse();
    expect(document.body.classList.toggle).toHaveBeenCalledWith('dark-mode', false);
  });

});
