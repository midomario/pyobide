import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'onboard',
    loadComponent: () => import('./pages/onboard/onboard.page').then( m => m.OnboardPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.page').then( m => m.PrivacyPage)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.page').then( m => m.TermsPage)
  },
  {
    path: 'lessons',
    loadComponent: () => import('./lessons/lessons.page').then( m => m.LessonsPage)
  },
  {
    path: 'lesson/:id',
    loadComponent: () => import('./lesson/lesson.page').then( m => m.LessonPage)
  },
  {
    path: 'ide',
    loadComponent: () => import('./ide/ide.page').then( m => m.IdePage)
  },
];
