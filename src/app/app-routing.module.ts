import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    { path: 'bracket', loadChildren: () => import('./bracket/bracket.module').then(m => m.BracketModule) },
    { path: 'bracket/:name', loadChildren: () => import('./bracket/bracket.module').then(m => m.BracketModule) },
    { path: '**', redirectTo: 'bracket' },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
