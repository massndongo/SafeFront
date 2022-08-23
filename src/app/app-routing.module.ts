import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'command',
    pathMatch: 'full'
  },
  {
    path: 'command',
    loadChildren: () => import('./command/command.module').then( m => m.CommandPageModule)
  },
  {
    path: 'ponctuel',
    loadChildren: () => import('./ponctuel/ponctuel.module').then( m => m.PonctuelPageModule)
  },
  {
    path: 'ordonnance',
    loadChildren: () => import('./ordonnance/ordonnance.module').then( m => m.OrdonnancePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
