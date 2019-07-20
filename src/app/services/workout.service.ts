import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Workout } from '../models/workout.model';
import { EnvironmentConfig } from '../services/environment-config.service';
import { AuthService } from '../services/auth.service';
import { DataProviderService } from './data-provider.service';

@Injectable()

export class WorkoutService {

    // Objects
    workouts: Workout[] = [];

    // Events
    workoutIsEdit = new EventEmitter<Workout>();

    gettingWorkouts: boolean = false;

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
        if (this.workouts.length > 0 || this.gettingWorkouts) {
            return this.workouts;
        }

        this.gettingWorkouts = true;

        return this.getWorkouts().subscribe((response: any) => {
            const workouts = response.obj;

            for (const workout of workouts) {
                const workoutObject = new Workout(workout);

                this.updateWorkoutsList(workoutObject);
            }

            this.gettingWorkouts = false;

            return workouts;
        });
    }

    addWorkout(workout: Workout): Observable<Workout>  {
        return this._http.post<Workout>(this._envConfig.getBaseApiUrl() + '/workouts/create-workout', { workout });
    }

    editWorkout(workout: Workout): Observable<Workout>  {
        return this._http.patch<Workout>(this._envConfig.getBaseApiUrl() + '/workouts/update', { workout });
    }

    addWorkoutOccurrence(workout: Workout): Observable<Workout>  {
        return this._http.patch<Workout>(this._envConfig.getBaseApiUrl() + '/workouts/update', { workout });
    }

    getWorkouts() {
        return this._http.get<Workout[]>(this._envConfig.getBaseApiUrl() + '/workouts/' + this._authService.getCurrentUserId(), {});
    }
}
