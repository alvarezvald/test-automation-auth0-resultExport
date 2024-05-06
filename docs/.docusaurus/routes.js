import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '98d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '58c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '0c0'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'e90'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '0f6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '53d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'bf2'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '635'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '9fd'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '637'),
            routes: [
              {
                path: '/docs/wiki/',
                component: ComponentCreator('/docs/wiki/', '407'),
                exact: true,
                sidebar: "wiki"
              },
              {
                path: '/docs/wiki/playwright/configure',
                component: ComponentCreator('/docs/wiki/playwright/configure', '90d'),
                exact: true,
                sidebar: "wiki"
              },
              {
                path: '/docs/wiki/playwright/running',
                component: ComponentCreator('/docs/wiki/playwright/running', 'ace'),
                exact: true,
                sidebar: "wiki"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '346'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
