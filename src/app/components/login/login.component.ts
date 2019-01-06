import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

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

    constructor( private _fb: FormBuilder, private _auth: AuthService, private _router: Router ) {
        this.user = new User();
    }

    ngOnInit() {
    }

    submit() {
        this._auth.loginUser(this.user);
    }
}
