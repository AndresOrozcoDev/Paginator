import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería emitir true cuando se llama show()', (done) => {
    service.loading$.subscribe(value => {
      if (value === true) {
        expect(value).toBeTrue();
        done();
      }
    });
    service.show();
  });

  it('should output false when show() and then hide() are done', (done) => {
    let emissions: boolean[] = [];
    service.loading$.subscribe(value => {
      emissions.push(value);

      if (emissions.length === 2) {
        expect(emissions).toEqual([false, true]);
      }

      if (emissions.length === 3) {
        expect(emissions).toEqual([false, true, false]);
        done();
      }
    });
    service.show();
    service.hide();
  });

});
