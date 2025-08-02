import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { dataReducer } from './core/state/data.reducer';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { monitorReducer } from './core/state/monitor.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore({ data: dataReducer, monitor: monitorReducer }),]
};
