import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';





bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

