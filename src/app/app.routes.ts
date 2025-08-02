import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'data', pathMatch: 'full' },
    { path: 'data', loadComponent: () => import('./features/data/data-page/data-page.component').then(c => c.DataPageComponent) },
    // { path: 'analysis', loadComponent: () => import('./features/analysis').then(c => c.AnalysisModule) },
    { path: 'monitor', loadComponent: () => import('./features/monitor/monitor-page/monitor-page.component').then(c => c.MonitorPageComponent) },
    // { path: '**', redirectTo: 'data' }
];
