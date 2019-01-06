import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Workout } from '../models/workout.model';
import { EnvironmentConfig } from '../services/environment-config.service';
import { AuthService } from '../services/auth.service';
// import { User } from '../models/user.model';

@Injectable()

export class WorkoutService {

    // Objects
    workouts: Workout[] = [];

    // Events
    workoutIsEdit = new EventEmitter<Workout>();

    updateWorkoutListSubscriber: Subject<Workout> = new Subject<Workout>();

    constructor(private http: HttpClient, private _envConfig: EnvironmentConfig, private _authService: AuthService) {
        this.updateWorkoutListSubscriber.subscribe(
            (workout: Workout) => {
                this.workouts.push(workout);
            }
        );
    }

    updateWorkoutsList(workout: Workout) {
        this.updateWorkoutListSubscriber.next(workout);
    }

    addWorkout(workout: Workout) {
        const body = JSON.stringify(workout);

        return this.http.post( this._envConfig.getBaseApiUrl() + '/workouts/create-workout', body)
            .subscribe((response: any) => {
                const newWorkout = new Workout(response.json().obj);
                this.workouts.push(workout);

                return workout;
            }
        );
    }

    // handleGetWorkouts() {
    //     const user = this._authService.getCurrentUser();

    //     if (this.workouts.length > 0) {
    //         return this.workouts;
    //     }

    //     if (user) {
    //         return this.http.get(this._envConfig.getBaseApiUrl() + '/workouts/' + user._id)
    //             .subscribe((response: any) => {
    //                 const workouts = response.json().obj;

    //                 for (const workout of workouts) {
    //                     const workoutObject = new Workout(workout);

    //                     this.updateWorkoutsList(workoutObject);
    //                 }

    //                 return workouts;
    //             }
    //         );
    //     }
    // }
}
