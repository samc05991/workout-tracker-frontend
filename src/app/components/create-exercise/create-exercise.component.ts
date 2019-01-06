import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Exercise } from '../../models/exercise.model';
import { User } from '../../models/user.model';

import { ExerciseService } from '../../services/exercise.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

  user: User;
  exercise?: Exercise;
  submitted = false;

  metricName = '';
  metricType = 'none';
  metrics: any = {};
  newMetric: any = {};

    constructor(
        private _exerciseService: ExerciseService,
        private _authService: AuthService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;

        // this.user = this._authService.getCurrentUser();
        this.exercise = new Exercise();
    }

    ngOnInit() {}

    addMetric() {
        this.metrics[this.metricName] = {};
        this.metrics[this.metricName] = this.newMetric;
        console.log('metrics', this.metrics);

        // this.testVariable += '-bar';
        this.exercise.metrics = this.metrics;
        console.log('exercise', this.exercise);
    }

    saveExercise() {
        this._exerciseService.addExercise(this.exercise);
    }

    open(content) {
        this.modalService.open(content);
    }
}
