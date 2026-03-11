import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.apiKey;
  const excludedRoutes = environment.apiKeyExcludedRoutes ?? [];

  // Skip API key injection on excluded routes and preserve explicit header overrides.
  if (!apiKey || req.headers.has('x-api-key') || excludedRoutes.some(route => req.url.includes(route))) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { 'x-api-key': apiKey }
    })
  );
};
