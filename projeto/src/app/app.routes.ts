import { Routes } from '@angular/router';
import { TelaConsultaComponent } from './tela-consulta/tela-consulta.component';

export const routes: Routes = [
    {path: '', redirectTo: '/consulta', pathMatch:'full'},
    {path: 'consulta', component: TelaConsultaComponent }
];
