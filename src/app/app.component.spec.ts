import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ThemeService } from './core/services/theme.service';

class MockThemeService {
  toggleDarkMode = jasmine.createSpy('toggleDarkMode');
  initializeTheme = jasmine.createSpy('initializeTheme');
}

describe('AppComponent', () => {
  let mockThemeService: MockThemeService;
  let component: AppComponent;

  beforeEach(async () => {
    mockThemeService = new MockThemeService();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ],

    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the app and call initializeTheme', () => {
    expect(component).toBeTruthy();
    expect(mockThemeService.initializeTheme).toHaveBeenCalled(); // Verifica constructor
  });

  it('should call toggleDarkMode when toggleTheme is invoked', () => {
    component.toggleTheme();
    expect(mockThemeService.toggleDarkMode).toHaveBeenCalled();
  });

  it('should toggle theme multiple times correctly', () => {
    component.toggleTheme();
    component.toggleTheme();
    expect(mockThemeService.toggleDarkMode).toHaveBeenCalledTimes(2);
  });

});
