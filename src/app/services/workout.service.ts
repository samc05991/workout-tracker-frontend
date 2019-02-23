import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Workout } from '../models/workout.model';
import { EnvironmentConfig } from '../services/environment-config.service';
import { AuthService } from '../services/auth.service';
import { DataProviderService } from './data-provider.service';
// import { User } from '../models/user.model';

@Injectable()

export class WorkoutService {

    // Objects
    workouts: Workout[] = [];

    // Events
    workoutIsEdit = new EventEmitter<Workout>();

    updateWorkoutListSubscriber: Subject<Workout> = new Subject<Workout>();

    constructor(
        private _http: HttpClient,
        private _envConfig: EnvironmentConfig,
        private _authService: AuthService,
        private _dataProvider: DataProviderService
    ) {
        this.updateWorkoutListSubscriber.subscribe(
            (workout: Workout) => {
                this.workouts.push(workout);
            }
        );
    }

    updateWorkoutsList(workout: Workout) {
        this.updateWorkoutListSubscriber.next(workout);
    }

    handleAddWorkout(workout: Workout) {
        this.addWorkout(workout).subscribe((response: any) => {
            const newWorkout = new Workout(response.json().obj);
            this.workouts.push(newWorkout);

            return newWorkout;
        });
    }

    handleGetWorkouts() {
        if (this.workouts.length > 0) {
            return this.workouts;
        }

        return this.getWorkouts().subscribe((response: any) => {
            const workouts = response.obj;

            for (const workout of workouts) {
                const workoutObject = new Workout(workout);

                this.updateWorkoutsList(workoutObject);
            }

            return workouts;
        });
    }

    addWorkout(workout: Workout): Observable<Workout>  {
        const params = {
            workout: workout
        };

        return this._http.post<Workout>(this._envConfig.getBaseApiUrl() + '/workouts/create-workout', { workout });
    }

    getWorkouts() {
        return this._http.get<Workout[]>(this._envConfig.getBaseApiUrl() + '/workouts/' + this._authService.getCurrentUserId(), {});
    }
}
