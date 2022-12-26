import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { environment as env } from "../../../environments/environment";
import { ShowToast } from "../helpers/helper-functions";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

    constructor(private toast: ToastController,
        private authSrv: AuthService,
        private router: Router) { }

    private get authHeader() {
        const token = this.authSrv.currentUserDetails?.token;
        return token ? new HttpHeaders({
            Authorization: `Token ${token}`
        }) : null;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = request.clone({
            url: env.baseUrl + request.url,
            headers: this.authHeader
        });
        return next.handle(authReq).pipe(
            catchError(error => {
                if (error.status === 0 && error.error instanceof ProgressEvent) {
                    error.error = {
                        status: 0,
                        message: 'Network error, please check your internet connection.'
                    };
                }
                if (error.status === 401) {
                    ShowToast(this.toast, 'Your login has been expired, please login again.');
                    this.authSrv.logoutUser().then();
                    this.router.navigate(['/login'], { replaceUrl: true });
                }
                return throwError(error);
            })
        );
    }
}