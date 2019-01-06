import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateExerciseComponent } from './components/create-exercise/create-exercise.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { CreateWorkoutComponent } from './components/create-workout/create-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

// Services
import { WorkoutService } from './services/workout.service';
import { ExerciseService } from './services/exercise.service';
import { AuthService } from './services/auth.service';
import { DataProviderService } from './services/data-provider.service';
import { EnvironmentConfig } from './services/environment-config.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    CreateExerciseComponent,
    DatePickerComponent,
    CreateWorkoutComponent,
    WorkoutListComponent,
    WorkoutService,
    ExerciseService,
    AuthService,
    DataProviderService,
    EnvironmentConfig
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
