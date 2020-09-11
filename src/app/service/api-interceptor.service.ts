import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

	constructor(private router: Router, private authService: AuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(tap(() => {
			return request;
		},
			(err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						console.log('token expired');
						this.authService.removeStorage();
						this.router.navigateByUrl('/user-pages/login');
					}
				}
			}
		))

	}

}
