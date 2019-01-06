import { Exercise } from './exercise.model';
import { Workout } from './workout.model';

export class User {

    public _id: string;
    public username: string;
    public exercises: Exercise[];
    public workouts: Workout[];
    public password = '';

    constructor() {}
}
