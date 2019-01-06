import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    user: User;
    submitted = false;

    constructor(private _fb: FormBuilder, private _auth: AuthService) {#
        this.user = new User();
    }

    submit() {
        this._auth.addUser( this.user )
        .subscribe(
            result => console.log(result)
        );
    }

    ngOnInit() {
    }
}
