import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
