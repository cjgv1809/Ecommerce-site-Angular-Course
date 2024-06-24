import { Routes } from '@angular/router';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // nested routes, shared layout by all children
    children: [
      {
        path: '',
        // lazy loading the list component
        loadComponent: () =>
          import('@products/pages/list/list.component').then(
            (m) => m.ListComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('@info/pages/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import(
            '@products/pages/product-detail/product-detail.component'
          ).then((m) => m.ProductDetailComponent),
      },
    ],
  },
  // This route will be used when the user navigates to a non-existing route, it should be the last one as it will match any route
  {
    path: '**',
    component: NotFoundComponent,
  },
];
