import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
    private router: Router
  ) {}

  isLoading = true;

  totalArtigos = 0;
  totalUsuarios = 0;
  totalCategorias = 0;
  totalVisualizacoes = 0;

  ngOnInit() {
    // Simula carregamento
    setTimeout(() => {
      this.totalArtigos = 120;
      this.totalUsuarios = 45;
      this.totalCategorias = 8;
      this.totalVisualizacoes = 980;

      this.isLoading = false;
    }, 1500);
  }

  goTo(page: string) {
    this.router.navigate([`/admin/${page}`]);
  }
}
