import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  private requestsInFlight = 0;

  show() {
    this.requestsInFlight++;
    this._loading.next(true);
  }

  hide() {
    this.requestsInFlight = Math.max(this.requestsInFlight - 1, 0);
    if (this.requestsInFlight === 0) {
      this._loading.next(false);
    }
  }

}
