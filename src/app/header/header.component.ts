import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public isUserLoggedIn: Boolean;

    constructor() {
        this.isUserLoggedIn = false;
        // this._authService.userLoggedInChange.subscribe(value => {
        //     this.isUserLoggedIn = value;
        // });
    }

    ngOnInit() {
    }
}
