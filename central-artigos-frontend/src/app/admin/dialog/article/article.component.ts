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
  categorias: any;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ArticleComponent>,
    private snaclbarService: SnackbarService,
    public themeService: ThemeService,
    private articleService: ArticleService,
    private ngxService: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      titulo: [null, Validators.required],
      conteudo: [null, Validators.required],
      categoriaId: [null, Validators.required],
      status: [null, Validators.required],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.articleForm.patchValue({
        titulo: this.dialogData.data.titulo,
        conteudo: this.dialogData.data.conteudo,
        categoriaId: this.dialogData.data.categoriaId,
        status: this.dialogData.data.status,
      });
    }

      this.getAllCategorias();

  }
  getAllCategorias() {
    this.ngxService.start();
    this.categoryService.getAllCategorias().subscribe(
      (response: any) => {
        this.categorias = response;
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

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    this.ngxService.start();
    var formData = this.articleForm.value;
    var data = {
      titulo: formData.titulo,
      conteudo: formData.conteudo,
      categoriaId: formData.categoriaId,
      status: formData.status,
    };
    this.articleService.addNewArtigo(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.ngxService.stop();
        this.onAddArticle.emit();
        this.responseMessage = response.message;
        this.snaclbarService.openSnackbar(this.responseMessage);
      },
      (error: any) => {
        this.dialogRef.close();
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
  edit() {
    this.ngxService.start();
    var formData = this.articleForm.value;
    var data = {
      id: this.dialogData.data.id,
      titulo: formData.titulo,
      conteudo: formData.conteudo,
      categoriaId: formData.categoriaId,
      status: formData.status,
    };
    this.articleService.updateArtigo(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.ngxService.stop();
        this.onEditArticle.emit();
        this.responseMessage = response.message;
        this.snaclbarService.openSnackbar(this.responseMessage);
      },
      (error: any) => {
        this.dialogRef.close();
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
