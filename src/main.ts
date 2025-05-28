import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// src/main.ts

const firebaseConfig = {
  apiKey: "AIzaSyAgGmbpt-QnM18ppcLdsutshT82Tx7Z6ng",
  authDomain: "swapnasheelaportfolio.firebaseapp.com",
  projectId: "swapnasheelaportfolio",
  storageBucket: "swapnasheelaportfolio.firebasestorage.app",
  messagingSenderId: "45922674774",
  appId: "1:45922674774:web:e15a071790330b5e2273f7",
  measurementId: "G-HL7454BWDX"
};

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
});