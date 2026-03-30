import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ArticleService } from 'src/app/services/article.service';
import { CategoryService } from 'src/app/services/categoria.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Globalconstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  onAddArticle = new EventEmitter();
  onEditArticle = new EventEmitter();
  articleForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  categorys: any;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public ddialogRef: MatDialogRef<ArticleComponent>,
    private snaclbarService: SnackbarService,
    public themeService: ThemeService,
    private articleService: ArticleService,
    private ngxService: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      titulo: [null, Validators.required],
      conteudo: [null, Validators.required],
      categoryId: [null, Validators.required],
      status: [null, Validators.required],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.articleForm.patchValue(this.dialogData.data);
    }
  }
  handleSubmit() {
    if (this.dialogAction === 'Add') {
      this.onAddArticle.emit(this.articleForm.value);
    } else if (this.dialogAction === 'Edit') {
      this.onEditArticle.emit(this.articleForm.value);
    }
    this.getAllCategorias();
    this.ngxService.start();
  }

  getAllCategorias() {
    this.categoryService.getAllCategorias().subscribe(
      (response: any) => {
        this.categorys = response;
        this.ngxService.stop();
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = Globalconstants.genericError;
        }
        this.snaclbarService.openSnackbar(this.responseMessage);
      },
    );
  }
}
