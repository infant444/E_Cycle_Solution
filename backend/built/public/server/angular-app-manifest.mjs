
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-IG4KJATS.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/login"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-WSBHVQCH.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/inventory"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-7E3N4TR7.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-34AXRH62.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-SPEOST55.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/time-sheet"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-TKEKXGCH.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-SPEOST55.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/time-sheet/weak-view"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-UI6DGMAM.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-SPEOST55.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/time-sheet/report"
  },
  {
    "renderMode": 2,
    "redirectTo": "/time-sheet",
    "route": "/time-sheet/**"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-KP2SU7VA.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-34AXRH62.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/client"
  },
  {
    "renderMode": 2,
    "preload": [
      {
        "path": "chunk-4XR2HJVL.js",
        "dynamicImport": false
      },
      {
        "path": "chunk-CAAQ6VVT.js",
        "dynamicImport": false
      }
    ],
    "route": "/project"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 33786, hash: '1340659638c37b2a26fb0065d3f065c4f5522627ce194a56265096e92f5f1c23', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17401, hash: 'e8b9ebf34dd5eef390eabc3afb39138b23444a676e01276e42c2ed4035bc1d36', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 44084, hash: 'a00e82a95e41f5be334a77c074fc7979a4ada8e0af81df75f51cac73c094bbb4', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'project/index.html': {size: 44185, hash: 'a6e2f5b2edc11859caed140b75fd1e00f042cca92060f5dd43f4eb1a5fa2f085', text: () => import('./assets-chunks/project_index_html.mjs').then(m => m.default)},
    'inventory/index.html': {size: 44185, hash: 'a6e2f5b2edc11859caed140b75fd1e00f042cca92060f5dd43f4eb1a5fa2f085', text: () => import('./assets-chunks/inventory_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 44084, hash: 'a00e82a95e41f5be334a77c074fc7979a4ada8e0af81df75f51cac73c094bbb4', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'client/index.html': {size: 44235, hash: '770da5520a206e557402387c1215c2cc3efaad313a9b5163c207ab5b2cb71824', text: () => import('./assets-chunks/client_index_html.mjs').then(m => m.default)},
    'time-sheet/index.html': {size: 44285, hash: '34689ca2dbd0303224f53656b36743b5fd1d6ee4fa1f2ef224010359f89def36', text: () => import('./assets-chunks/time-sheet_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 44185, hash: 'a6e2f5b2edc11859caed140b75fd1e00f042cca92060f5dd43f4eb1a5fa2f085', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'time-sheet/weak-view/index.html': {size: 44235, hash: '770da5520a206e557402387c1215c2cc3efaad313a9b5163c207ab5b2cb71824', text: () => import('./assets-chunks/time-sheet_weak-view_index_html.mjs').then(m => m.default)},
    'time-sheet/report/index.html': {size: 44235, hash: '770da5520a206e557402387c1215c2cc3efaad313a9b5163c207ab5b2cb71824', text: () => import('./assets-chunks/time-sheet_report_index_html.mjs').then(m => m.default)},
    'styles-Q77ZHGQ5.css': {size: 22319, hash: 'emzIinQ9w+M', text: () => import('./assets-chunks/styles-Q77ZHGQ5_css.mjs').then(m => m.default)}
  },
};
