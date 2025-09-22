import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent {

  @Output() themeToggled = new EventEmitter<boolean>();
  logoPath = 'assets/logo/favicon.png';

  constructor(public themeService: ThemeService) {
    this.themeService.initializeTheme();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
    this.themeToggled.emit(this.themeService.currentMode);
  }

}
