import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { CustomReuseStrategy } from './customReuseStrategy';

const routes: Routes = [
{path: '', component: HomeComponent},
{path: '**', component: ErrorComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload"})],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: CustomReuseStrategy}],
})
export class AppRoutingModule { }
