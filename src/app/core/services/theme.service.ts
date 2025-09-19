import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDarkMode = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isBrowser) {
      document.body.classList.toggle('dark-mode', this.isDarkMode);
      localStorage.setItem('darkMode', this.isDarkMode.toString());
    }
  }

  initializeTheme(): void {
    if (this.isBrowser) {
      const savedMode = localStorage.getItem('darkMode') === 'true';
      this.isDarkMode = savedMode;
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }

  get currentMode(): boolean {
    return this.isDarkMode;
  }

}
