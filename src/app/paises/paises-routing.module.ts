import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeletorComponent } from './pages/seletor/seletor.component';

const routes: Routes = [
  {
    path: '',
   children: [
     {
       path: 'seletor',
       component: SeletorComponent
     },
     {
       path: '**',
       redirectTo: 'seletor'
     }
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }
