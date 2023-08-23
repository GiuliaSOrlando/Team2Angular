import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, concatMap, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class UsersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = environment.apiKey;

    let modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`),
    });

    if (request.method === 'POST') {
      modifiedReq = modifiedReq.clone({
        headers: modifiedReq.headers.set('Content-Type', 'application/json'),
      });
    }

    return next.handle(modifiedReq).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && request.method === 'POST') {
          console.log('Intercepted POST response:', event.body);
        }
      })
    );
  }
}
