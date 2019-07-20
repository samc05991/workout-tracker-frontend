import { Component, OnInit, Output, EventEmitter, Input, ɵConsole } from '@angular/core';
import { Workout } from 'src/app/models/workout.model';
import Chart from 'chart.js';
import * as moment from "moment";

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
        this.getExerciseKeys();
        this.prepareWorkoutStatistics();

        let chart = this.prepareChart();
    }

    betterColors() {
        this.statistics.labels=[];
        this.statistics.datasets = [];
        this.prepareWorkoutStatistics();
        this.prepareChart();
    }

    getExerciseKeys() {
        //loop through each occurrence
        for(let i = 0; i < this.selectedWorkout.statistics.length; i++) {

            // loop through each exercise
            for(let j = 0; j < this.selectedWorkout.statistics[i].exercises.length; j++) {

                // loop true each metric
                for(let k = 0; k < this.selectedWorkout.statistics[i].exercises[j].metrics.length; k++) {

                    // if the metric doesn't already exist
                    if(!this.exerciseKeys[this.selectedWorkout.statistics[i].exercises[j].metrics[k].metricName]) {
                        this.exerciseKeys[this.selectedWorkout.statistics[i].exercises[j].metrics[k].metricName] = {
                            active: k === 0 ? true : false,
                            key: this.selectedWorkout.statistics[i].exercises[j].metrics[k].metricName
                        };
                    }
                }
            }
        }
    }

    randomRGB() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    getDefaultDataSet() {
        return {
            // metric name
            label: '',

            // metric value
            data: [],
            fill: false,
            id: 0,

            backgroundColor: this.randomRGB(),
            borderColor: [this.randomRGB()],
            borderWidth: 5
        }
    }

    prepareWorkoutStatistics() {
        this.setUpDateLabels();
        this.setUpDataSets();
        this.addWorkoutData();
    }

    setUpDateLabels() {
        for(let i = 0; i < this.selectedWorkout.statistics.length; i++) {
            this.statistics.labels.push(moment(this.selectedWorkout.statistics[i].date).format("DD-MM"));
        }
    }

    setUpDataSets() {
        for(let i = 0; i < this.selectedWorkout.statistics.length; i++) {
            for(let j = 0; j < this.selectedWorkout.statistics[i].exercises.length; j++) {
                let dataSetIndex = this.findDataSet(this.selectedWorkout.statistics[i].exercises[j].name);
                
                if(dataSetIndex === -1) {
                    let dataSet = this.getDefaultDataSet();

                    dataSet.label = this.selectedWorkout.statistics[i].exercises[j].name;
                    dataSet.id = j;

                    this.statistics.datasets.push(dataSet);
                }
            }
        }
    }

    addWorkoutData() {
        // loop through stats
        for(let i = 0; i < this.selectedWorkout.statistics.length; i++) {

            // loop through the exercises
            for(let j = 0; j < this.selectedWorkout.statistics[i].exercises.length; j++) {

                // loop through the exercises metrics
                for(let k = 0; k < this.selectedWorkout.statistics[i].exercises[j].metrics.length; k++) {

                    // get the index of the exercise from the dataset
                    let dataSetIndex = this.findDataSet(this.selectedWorkout.statistics[i].exercises[j].name);

                    if(dataSetIndex >= 0 && this.exerciseKeys[this.selectedWorkout.statistics[i].exercises[j].metrics[k].metricName].active) {
                        let val = this.selectedWorkout.statistics[i].exercises[j].metrics[k].metricValue;

                        if(this.selectedWorkout.statistics[i].exercises[j].metrics[k].metricType === 'time') {
                            val = ((val.hours * 60) * 60) + (val.minutes * 60) + val.seconds
                        }
                        this.statistics.datasets[dataSetIndex].data.push(val);
                    }
                }
            }
        }
    }

    findDataSet(key) {
        for(let k = 0; k <= this.statistics.datasets.length; k++) {
            if(this.statistics.datasets[k] && this.statistics.datasets[k].label == key) {
                return k;
            }
        }

        return -1;
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
