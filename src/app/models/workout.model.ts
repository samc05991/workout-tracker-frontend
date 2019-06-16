import { Exercise } from './exercise.model';

export class Workout {

    public _id?: number;
    public name?: string = '';
    public created_by?: string;
    public date?: any;
    public parent_workout?: any;
    public statistics?: any;
    public type?: string = 'custom';

    constructor(workout?: any) {
        if (workout) {
            this._id = workout._id;
            this.name = workout.name;
            this.created_by = workout.created_by;
            this.parent_workout = workout.parent_workout || undefined;
            this.statistics = workout.statistics || {};
            this.date = workout.date || {};
        }
    }
}
