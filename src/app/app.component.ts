import { Component, OnInit } from '@angular/core';

// Services
import { WorkoutService } from './services/workout.service';
import { ExerciseService } from './services/exercise.service';
import { AuthService } from './services/auth.service';
import { DataProviderService } from './services/data-provider.service';
import { EnvironmentConfig } from './services/environment-config.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { User } from './models/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ WorkoutService, ExerciseService, AuthService, DataProviderService, EnvironmentConfig, HttpErrorHandler]
})

export class AppComponent implements OnInit {
    title = 'workout-tracker-frontend';
    public isUserLoggedIn: Boolean;

    constructor(private _authService: AuthService) {}

    ngOnInit() {
        const currentUser: User = this._authService.getCurrentUser();

        this.isUserLoggedIn = false;

        this._authService.userLoggedInChange.subscribe(value => {
            this.isUserLoggedIn = value;
        });
    }
}
