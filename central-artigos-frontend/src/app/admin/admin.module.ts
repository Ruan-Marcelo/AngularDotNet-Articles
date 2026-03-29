import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    DashboardComponent,
    LayoutComponent,
    HelpDetailsComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule
  ]
})
export class AdminModule { }
