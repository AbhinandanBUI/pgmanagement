import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoadingService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     this.loaderService.show();
     this.loaderService.addRequest();

     return next.handle(request).pipe(
           finalize(() => {
            this.loaderService.removeRequest();
            this.loaderService.requests.subscribe(count=>{
              if(count==0){
                this.loaderService.hide();
              }
            })
           }),
     );
  }
}
