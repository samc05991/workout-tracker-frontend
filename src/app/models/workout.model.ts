import { Exercise } from './exercise.model';

export class Workout {

    public _id?: number;
    public name?: string;
    public exercises?: Exercise[];
    public created_by?: string;
    public date?: any;

    constructor(workout: any) {
        if (workout) {
            this._id = workout._id;
            this.name = workout.name;
            this.exercises = workout.exercises;
            this.created_by = workout.created_by;

            if (workout.date) {
                this.date = workout.date;
            }
        }
    }
}
