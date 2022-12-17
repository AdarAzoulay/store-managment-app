import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './orders/orders.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { CoreModule } from './modules/core.module';
import { OrderTableComponent } from './order-table/order-table.component';
import { CutLongTitlePipe } from './pipes/cut-long-title.pipe';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { DraftsComponent } from './drafts/drafts.component';
import { DraftsTableComponent } from './drafts-table/drafts-table.component';
import { DraftsModalComponent } from './drafts-modal/drafts-modal.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { ProductsManagementComponent } from './admin/products-management/products-management.component';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    OrdersComponent,
    HomeComponent,
    SettingsComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    OrderTableComponent,
    CutLongTitlePipe,
    OrderModalComponent,
    DraftsComponent,
    DraftsTableComponent,
    DraftsModalComponent,
    PhotoEditorComponent,
    ProductDetailComponent,
    ProductsComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    ProductsManagementComponent,
    RolesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    Ng2SearchPipeModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorInterceptor, 
      multi: true                 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
