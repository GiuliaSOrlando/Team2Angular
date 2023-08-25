import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class CommentsInterceptor implements HttpInterceptor {
  private authToken: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NmNmOTY4NWVjNDAwMTQ1MGI4Y2YiLCJpYXQiOjE2OTI5NTM4NDksImV4cCI6MTY5NDE2MzQ0OX0.ID4czUCEXyGc9_IrBRF2ce2r7Sz1REBjmXsKejvpopg';

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.authToken}`),
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
