export class Exercise {

    public _id?: string;
    public name = '';
    public metrics: any[] = [];
    public created_by?: string;

    constructor(exercise?: any) {

        if (exercise) {
            this._id = exercise._id;
            this.name = exercise.name;
            this.metrics = exercise.metrics;
            this.created_by = exercise.created_by;
        }
    }
}
