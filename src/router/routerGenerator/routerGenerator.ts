// lib/routerGenerator.ts

import { TRoute, TuserPath } from "@/app/types/types";


export const routerGenerator = (items: TuserPath[]): TRoute[] => {
  const routes: TRoute[] = [];

  for (const item of items) {
    if (item.path && item.element) {
      routes.push({
        path: item.path,
        element: item.element,
      });
    }

    // Check for children and recursively add them to routes
    if (item.children) {
      const childRoutes = routerGenerator(item.children); // Recursively generate routes for children
      routes.push(...childRoutes); // Spread operator to add child routes
    }
  }

  return routes;
};