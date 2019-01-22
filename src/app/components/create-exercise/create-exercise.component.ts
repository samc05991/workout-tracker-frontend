import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Exercise } from '../../models/exercise.model';
import { User } from '../../models/user.model';

import { ExerciseService } from '../../services/exercise.service';
import { AuthService } from '../../services/auth.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

    @Output() exerciseAdded = new EventEmitter<Exercise>();
    // model: Subject<boolean> = new Subject<boolean>();

    user: User;
    exercise?: Exercise;
    submitted = false;

    metricName = '';
    metricType = 'none';
    metricValue: any;
    metrics: any = [];
    newMetric: any = {};

    constructor(
        private _exerciseService: ExerciseService,
        private modalService: NgbModal,
        config: NgbModalConfig,
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;

        this.exercise = new Exercise();
    }

    ngOnInit() {}

    addMetric() {
        const metric = {
            name: this.metricName,
            type: this.metricType,
            value: this.metricValue
        };

        this.exercise.metrics.push(metric);
    }

    saveExercise() {
        this._exerciseService.addExercise(this.exercise).subscribe((response: any) => {
            this.exerciseAdded.emit(this.exercise);
        });
    }

    open(content) {
        this.modalService.open(content);
    }
}
