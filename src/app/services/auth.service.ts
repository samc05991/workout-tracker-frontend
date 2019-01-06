import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { EnvironmentConfig } from './environment-config.service';

@Injectable()

export class AuthService {

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

    addUser( user ) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post( this._envConfig.getBaseApiUrl() + '/users/sign-up', body)
            .subscribe((response: Response) => {
                const result: any = response.json();
                const newUser = new User();
                this.currentUser = newUser;

                this.toggleUserIsLoggedIn();

                return newUser;
            }
        );
    }

    loginUser(user) {
        const body = JSON.stringify(user);
        // const headers = new Headers({'Content-type':'application/json'});

        return this._http.post(this._envConfig.getBaseApiUrl() + '/users/login', body)
            .subscribe((response: Response) => {
                const result: any = response.json();
                this.currentUser = result.user;

                this.toggleUserIsLoggedIn();
                document.cookie = 'token=' + result.token + ';';

                this._router.navigate(['/dashboard']);
            }
        );
    }

    refreshCurrentUser(token) {
        return this._http.get(this._envConfig.getBaseApiUrl() + '/users/me/' + token)
            .subscribe((response: Response) => {
                const result: any = response.json();
                this.currentUser = result.obj[0];

                this.toggleUserIsLoggedIn();

                return this.currentUser;
            }
        );
    }

    getCurrentUser() {
        if (this.currentUser) {
            return this.currentUser;
        }

        if (this.getCookie('token')) {
            // this.refreshCurrentUser(this.getCookie('token')).subscribe(
            //     (response) => {
            //         console.log(response);
            //         this._router.navigate(['/dashboard']);
            //     },
            //     (error) => {
            //         throw error;
            //     }
            // );
        } else {
            // return a message here too saying not auth
            this._router.navigate(['/login']);
        }
    }

    getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');

        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }
}
