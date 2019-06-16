import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import Chart from 'chart.js';
import { stat } from 'fs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    @Input() selectedWorkout: Workout;

    exerciseKeys: any = {};
    statistics: any = {
        // add dates
        labels: [],

        // add data
        datasets: []
    };

    constructor() { }

    ngOnInit() {
        console.log(this.selectedWorkout);
        this.getExerciseKeys();
        this.prepareWorkoutStatistics();

        let chart = this.prepareChart();
    }

    getExerciseKeys() {
        //loop through each occurrence
        for(let i = 0; i < this.selectedWorkout.statistics.length; i++) {

            // loop through each exercise
            for(let j = 0; j < this.selectedWorkout.statistics[i].exercises.length; j++) {

                // loop true each metric
                for(let k = 0; k < this.selectedWorkout.statistics[i].exercises[j].metrics.length; k++) {

                    // if the metric doesn't already exist
                    if(!this.exerciseKeys[this.selectedWorkout.statistics[i].exercises[j].metrics[k].name]) {
                        this.exerciseKeys[this.selectedWorkout.statistics[i].exercises[j].metrics[k].name] = {
                            active: k === 0 ? true : false,
                            key: this.selectedWorkout.statistics[i].exercises[j].metrics[k].name
                        };
                    }
                }
            }
        }
    }

    randomRGB() {
        return 'rbga(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ', 1)';
    }

    getDataSet() {
        return {
            // metric name
            label: '',

            // metric value
            data: [],

            backgroundColor: [this.randomRGB()],
            borderColor: [this.randomRGB()],
            borderWidth: 1
        }
    }

    prepareWorkoutStatistics() {
        // add date labels
        for(let i = 0; i < this.selectedWorkout.statistics.length; i++) {
            let date = this.selectedWorkout.statistics[i].date.day + '/' + this.selectedWorkout.statistics[i].date.month;

            this.statistics.labels.push(date);

            for(let j = 0; j < this.selectedWorkout.statistics[i].exercises.length; j++) {
                let dataset = this.getDataSet();

                dataset.label = this.selectedWorkout.statistics[i].exercises[j].name;

                for(let k = 0; k < this.selectedWorkout.statistics[i].exercises[j].metrics.length; k++) {
                    for(let key in this.exerciseKeys) {
                        if(this.selectedWorkout.statistics[i].exercises[j].metrics[k].name === this.exerciseKeys[key].key && this.exerciseKeys[key].active) {
                            dataset.data.push(this.selectedWorkout.statistics[i].exercises[j].metrics[k].value)
                        }
                    }
                }

                this.statistics.datasets.push(dataset);
            }
        }
        console.log(this.statistics);
    }

    prepareChart() {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: this.statistics,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
}
