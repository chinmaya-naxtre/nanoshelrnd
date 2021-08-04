import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import { FooterComponent } from './includes/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProcedureComponent } from './pages/procedure/procedure.component';
import { HomeComponent } from './pages/home/home.component';
import { ProcedureListComponent } from './pages/procedure-list/procedure-list.component';
import { SelectProductsComponent } from './pages/select-products/select-products.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SuperAdminPanelComponent } from './pages/super-admin-panel/super-admin-panel.component';
import { AddAdminComponent } from './pages/add-admin/add-admin.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditAdminComponent } from './pages/edit-admin/edit-admin.component';

//import * as Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ProcedureComponent,
    HomeComponent,
    ProcedureListComponent,
    SelectProductsComponent,
    ResetPasswordComponent,
    SuperAdminPanelComponent,
    AddAdminComponent,
    EditAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
