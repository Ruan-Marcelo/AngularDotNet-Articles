/*
 * Copyright (c) 2026 ruan Marcelo Ramacioti Luz.
 * Todos os direitos reservados.
 */
import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  settheme(theme:string){
    this.applyTheme(theme);
    localStorage.setItem('themeColor',theme);
  }

  private applyTheme(theme:string){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('primary-theme','accent-theme','warn-teheme');
    body.classList.add(`${theme}-theme`);
  }

  getTheme():ThemePalette{
    if(localStorage.getItem('themeColor') === null || localStorage.getItem('themeColor') === undefined){
      return 'primary'
    }
    else{
      const storedThemeColor = localStorage.getItem('themeColor')
      return storedThemeColor as ThemePalette;
    }
  }
}
