import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyBmW6na3eZ6zV7WNb20JufFTym0xTS4sAw',
  authDomain: 'kitkat-1f4a0.firebaseapp.com',
  projectId: 'kitkat-1f4a0',
  storageBucket: 'kitkat-1f4a0.appspot.com',
  messagingSenderId: '911776176765',
  appId: '1:911776176765:web:0d31481b5a9b3255286f14',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth()),
    ]),
  ],
};
