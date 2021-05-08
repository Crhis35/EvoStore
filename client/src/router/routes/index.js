import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/signIn',
    component: lazy(() => import('../../views/SignIn')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/verificar',
    component: lazy(() => import('../../views/VerifiedUser')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
