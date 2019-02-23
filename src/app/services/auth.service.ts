import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { EnvironmentConfig } from './environment-config.service';
import { DataProviderService } from './data-provider.service';

@Injectable()

export class AuthService {
    public currentUser: User;

    isUserLoggedIn: Boolean;

    userLoggedInChange: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _router: Router,
        private _dataProvider: DataProviderService
    ) {
        this.userLoggedInChange.subscribe((value) => {
            this.isUserLoggedIn = value;
        });
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        if(token) {
            return true;

            // @TODO:: Check token expire time
        }
    }

    toggleUserIsLoggedIn() {
        this.userLoggedInChange.next(!this.isUserLoggedIn);
    }

    handleAddUser(user: User) {
        this.addUser(user).subscribe(
            (data: any) => {
                this.currentUser = data['user'];

                localStorage.setItem('user', JSON.stringify(this.currentUser));
                localStorage.setItem('token', JSON.stringify(data.token));

                this.toggleUserIsLoggedIn();

                this._router.navigate(['/dashboard']);
            },
            (error: any) => {}
        );
    }

    handleUserLogin (user: User) {
        console.log(user);
        this.loginUser(user).subscribe(
            (data: any) => {
                const userObject = new User();
                userObject.username = data['user'].username;
                userObject._id = data['user']._id;

                this.currentUser = userObject;

                localStorage.setItem('user', JSON.stringify(this.currentUser));
                localStorage.setItem('token', JSON.stringify(data['token']));

                this.toggleUserIsLoggedIn();

                this._router.navigate(['/dashboard']);
            },
            (error: any) => {}
        );
    }

    addUser(user: User): Observable<User> {
        return this._http.post<User>(this._envConfig.getBaseApiUrl() + '/users/sign-up', {user});
    }

    loginUser(user: User): Observable<User> {
        console.log(user);
        return this._http.post<User>(this._envConfig.getBaseApiUrl() + '/users/login', {user});
    }

    refreshCurrentUser(): Observable<Object> {
        return this._http.post(this._envConfig.getBaseApiUrl() + '/users/me', {});
    }

    getCurrentUserId() {
        const user = this.getCurrentUser();

        if (user && user._id) {
            return user._id;
        }
    }

    getCurrentUser() {
        if (this.currentUser) {
            return this.currentUser;
        }

        if (this.isAuthenticated()) {
            this.refreshCurrentUser().subscribe(
                (response: any) => {
                    // NEED TO REMOVE PASSWORD FROM API SEND
                    const user = new User();

                    user._id = response.obj[0]._id;
                    user.exercises = response.obj[0].exercises;
                    user.workouts = response.obj[0].workouts;

                    this.currentUser = user;

                    this.toggleUserIsLoggedIn();

                    return this.currentUser;
                }
            );
        } else {
            // return a message here too saying not auth
            this._router.navigate(['/']);
        }
    }
}
