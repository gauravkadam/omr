import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportFormComponents } from './component/report-form/report-form.component';


const routes: Routes = [
  { path: 'generate-content', component: ReportFormComponents },
  { path: '', redirectTo: 'generate-content', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
