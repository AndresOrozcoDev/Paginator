import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('loadingInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => loadingInterceptor(req, next));

  beforeEach(() => {
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LoadingService, useValue: loadingServiceSpy },
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should call show() at startup and hide() at shutdown.', () => {
    http.get('/fake-endpoint').subscribe();

    const req = httpMock.expectOne('/fake-endpoint');
    expect(loadingServiceSpy.show).toHaveBeenCalled();

    req.flush({});

    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  });

});
