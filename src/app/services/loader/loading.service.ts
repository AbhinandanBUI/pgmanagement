import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SpinnerOverlayService } from './spinner-overlay.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  ref: any;
  requests = new BehaviorSubject(0);
  count: number = 0;
  constructor(private _overlay: SpinnerOverlayService) {
  }
  addRequest() {
    this.count=this.count+1
    console.log(this.count);
    this.requests.next(this.count);
  }
  removeRequest() {
    this.count=this.count-1
    console.log(this.count);
    this.requests.next(this.count);
  }
  show() {
    this._overlay.show();
  }

  hide() {
    this._overlay.hide();
  }
}