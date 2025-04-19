import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

bootstrapApplication(AppComponent).catch((err) => console.error(err));
