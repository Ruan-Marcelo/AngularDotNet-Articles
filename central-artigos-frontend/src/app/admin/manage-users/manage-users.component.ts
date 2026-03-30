import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AppUserService } from 'src/app/services/app-user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Globalconstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private appuserService: AppUserService,
    public themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.appuserService.getAllAppUsers().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage);
      },
    );
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
  }
  handleEditAction(values: any) {
  }

  onChange(status: any, id: any) {
    this.ngxService.start();
    var data = {
      id: id,
      status: status.toString(),
    };
    this.appuserService.updateAppUserStatus(data).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackbar(this.responseMessage);
        this.tableData();
      },
      (error) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snackbarService.openSnackbar(this.responseMessage);
      },
    );
  }
}
