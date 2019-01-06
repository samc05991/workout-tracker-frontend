import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class EnvironmentConfig {

    public isProd = false;

    constructor() {}

    getBaseApiUrl() {
        if ( this.isProd === true ) {
            return 'https://stark-shore-81887.herokuapp.com';
        } else {
            return 'http://localhost:3000';
        }
    }
}
