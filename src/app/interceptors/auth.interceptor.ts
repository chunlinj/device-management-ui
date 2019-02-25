import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/internal/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('拦截器已执行');
    const token = localStorage.getItem('token');
    const cloneReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next.handle(cloneReq).pipe(tap(
      () => {},
      error => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    ));
  }

}
