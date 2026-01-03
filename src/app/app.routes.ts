import { Routes } from '@angular/router';
import { Enfants } from './Components/Parents/enfants/enfants';
import { Paiements } from './Components/Parents/paiements/paiements';
import { Auth } from './Components/auth/auth';
import { App } from './app';

export const routes: Routes = [
    {
         path: '',
         loadComponent: () => import('./Components/auth/auth').then(a => a.Auth)
    },
    {
         path: 'login',
         loadComponent: () => import('./Components/auth/auth').then(a => a.Auth)
    },
    //Dashboard
    {
         path: 'dashboard-admin',
         loadComponent: () => import('./Components/Admin/dashboard/dashboard').then(d => d.Dashboard)
    },
     {
         path: 'dashboard-enseignant',
         loadComponent: () => import('./Components/Enseignant/dashboard/dashboard').then(d => d.Dashboard)
    },
     {
         path: 'dashboard-parent',
         loadComponent: () => import('./Components/Parents/dashboard/dashboard').then(d => d.Dashboard)
    },
     {
         path: 'dashboard-eleve',
         loadComponent: () => import('./Components/Eleve/dashboard/dashboard').then(e => e.Dashboard)
    },

    //Parent 
    {
         path: 'parent-dashboard',
         loadComponent: () => import('./Components/Parents/dashboard/dashboard').then(d => d.Dashboard)
    },
    {
        path : 'parent-enfant', 
        loadComponent: () => import('./Components/Parents/enfants/enfants').then(e => e.Enfants)
    }, 
    
     {
        path : 'parent-offre-repetition', 
        loadComponent: () => import('./Components/Parents/offre-repetition/offre-repetition').then(o => o.OffreRepetition)
    }, 
     {
        path : 'parent-paiements', 
        loadComponent: () => import('./Components/Parents/paiements/paiements').then(p => p.Paiements)
    },

    //Enseignant 
     {
         path: 'enseignant-session-repetition',
         loadComponent: () => import('./Components/Enseignant/repetition/repetition').then(r => r.Repetition)
    },
    
    {
         path: 'enseignant-marketplace',
         loadComponent: () => import('./Components/Enseignant/market-place/market-place').then(m => m.MarketPlace)
    },
    {
         path: 'enseignant-enfant',
         loadComponent: () => import('./Components/Enseignant/enfant/enfant').then(e => e.Enfant)
    },
    {
         path: 'enseignant-evaluation',
         loadComponent: () => import('./Components/Enseignant/evaluation/evaluation').then(e => e.Evaluation)
    },
];
