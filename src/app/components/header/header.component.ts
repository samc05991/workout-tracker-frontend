import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserLoggedIn: Boolean;

    constructor(private _authService: AuthService) {
        this.isUserLoggedIn = false;

        this._authService.userLoggedInChange.subscribe(value => {
            this.isUserLoggedIn = value;
        });
    }

    ngOnInit() {}

    logout() {
        this._authService.handleUserLogout();
    }
}
