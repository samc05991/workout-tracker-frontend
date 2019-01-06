import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    // Objects
    user: User;

    // Controls
    submitted = false;

    constructor(private _auth: AuthService) {
        this.user = new User();
    }

    ngOnInit() {
    }

    submit() {
        this._auth.handleUserLogin(this.user);
    }
}
