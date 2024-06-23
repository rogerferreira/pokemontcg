import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import {ConfigApiService} from "../services/config-api.service";

export const sessionStoreGuard: CanActivateFn = () => {
  const configService: ConfigApiService = inject(ConfigApiService);
  const router: Router = inject(Router);

  if (configService.getConfig() === null) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
