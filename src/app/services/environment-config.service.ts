import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EnvironmentConfig {

    public isProd = false;

    constructor() {}

    getBaseApiUrl() {
        if (this.isProd === true) {
            return 'https://track-it-your-way.herokuapp.com/api';
        }
        else {
            return 'http://localhost:3000/api';
        }
    }
}
