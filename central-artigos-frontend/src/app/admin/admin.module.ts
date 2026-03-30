import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './dialog/users/users.component';
import { MaterialModule } from '../shared/material-module';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // para botões mat-raised-button
import Quill from 'quill';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { ArticleComponent } from './dialog/article/article.component';
import { ViewArticleComponent } from './dialog/view-article/view-article.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent,
    ManageUsersComponent,
    UsersComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageArticleComponent,
    ArticleComponent,
    ViewArticleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    QuillModule.forRoot(),
    SharedModule
  ]
})
export class AdminModule { }
