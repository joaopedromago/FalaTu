import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'chat',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./chat/chat.module').then(m => m.ChatModule)
      }
    ]
  },
  {
    path: 'match',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./match/match.module').then(m => m.MatchModule)
      }
    ]
  },
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
