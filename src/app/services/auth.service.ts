import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';

import { User } from '../models/user.model';
import { EnvironmentConfig } from './environment-config.service';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable()

export class AuthService {
    private handleError: HandleError;
    public currentUser: User;

    isUserLoggedIn: Boolean;

    userLoggedInChange: Subject<boolean> = new Subject<boolean>();

    constructor(private _http: HttpClient, private _envConfig: EnvironmentConfig, private _router: Router) {
        this.userLoggedInChange.subscribe((value) => {
            this.isUserLoggedIn = value;
        });
    }

    toggleUserIsLoggedIn() {
        this.userLoggedInChange.next(!this.isUserLoggedIn);
    }

    handleAddUser(user: User) {
        this.addUser(user).subscribe(
            (data: User) => {
                this.currentUser = data['user'];

                this.toggleUserIsLoggedIn();

                this._router.navigate(['/dashboard']);
            },
            (error: any) => {}
        );
    }

    addUser(user: User) {
        const params = new HttpParams().set('username', user.username).set('password', user.password);

        return this._http.post<User>(this._envConfig.getBaseApiUrl() + '/users/sign-up', {user}).pipe(
            catchError(this.handleError('addUser', user))
        );
    }

    handleUserLogin (user: User) {
        this.loginUser(user).subscribe(
            (data: User) => {
                const userObject = new User();
                userObject.username = data['user'].username;

                this.currentUser = userObject;

                this.toggleUserIsLoggedIn();

                this._router.navigate(['/dashboard']);
            },
            (error: any) => {}
        );
    }

    loginUser(user: User): Observable<User> {
        const body = JSON.stringify(user);

        return this._http.post<User>(this._envConfig.getBaseApiUrl() + '/users/login', body).pipe(
            catchError(this.handleError('loginUser', user))
        );
    }

    // refreshCurrentUser(token) {
    //     return this._http.get(this._envConfig.getBaseApiUrl() + '/users/me/' + token)
    //         .subscribe((response: Response) => {
    //             const result: any = response.json();
    //             this.currentUser = result.obj[0];

    //             this.toggleUserIsLoggedIn();

    //             return this.currentUser;
    //         }
    //     );
    // }

    // getCurrentUser() {
    //     if (this.currentUser) {
    //         return this.currentUser;
    //     }

    //     if (this.getCookie('token')) {
    //         // this.refreshCurrentUser(this.getCookie('token')).subscribe(
    //         //     (response) => {
    //         //         console.log(response);
    //         //         this._router.navigate(['/dashboard']);
    //         //     },
    //         //     (error) => {
    //         //         throw error;
    //         //     }
    //         // );
    //     } else {
    //         // return a message here too saying not auth
    //         this._router.navigate(['/login']);
    //     }
    // }

    // getCookie(name) {
    //     const value = '; ' + document.cookie;
    //     const parts = value.split('; ' + name + '=');

    //     if (parts.length === 2) {
    //         return parts.pop().split(';').shift();
    //     }
    // }

    private handleError(error: string) {
        // console.log('Error!!');
        return 'Error!!';
    }
}
