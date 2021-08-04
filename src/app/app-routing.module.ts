import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../app/main/main.component';
import { DashboardComponent } from '../app/pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProcedureComponent } from './pages/procedure/procedure.component';
import { SelectProductsComponent } from './pages/select-products/select-products.component';
import { ProcedureListComponent } from './pages/procedure-list/procedure-list.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SuperAdminPanelComponent } from './pages/super-admin-panel/super-admin-panel.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset', component: ResetPasswordComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'procedure/:procedureId/:version',
        component: ProcedureComponent,
      },
      { path: 'procedure-list/:userId', component: ProcedureListComponent },
      { path: 'selectProducts/:cat_id', component: SelectProductsComponent },
      { path: 'superAdminPanel', component: SuperAdminPanelComponent },
      { path: 'addAdmin', component: AddAdminComponent },
      { path: 'edit-admin/:user_id', component: EditAdminComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
