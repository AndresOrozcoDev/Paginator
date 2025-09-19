import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'home',
        loadChildren: () => import('./features/paginator/paginator.module').then(m => m.PaginatorModule)
    },

    { path: '**', redirectTo: 'home' }
];
