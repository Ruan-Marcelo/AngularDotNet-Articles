import { TestBed } from '@angular/core/testing';

import { AppUserService } from './app-user.service';

describe('AppUserService', () => {
  let service: AppUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
/*
 * Copyright (c) 2026 ruan Marcelo Ramacioti Luz.
 * Todos os direitos reservados.
 */
