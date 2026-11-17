import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { AuthProvider } from './lib/AuthProvider'
import { RequireAuth } from './components/console/guards'
import HomePage from './pages/HomePage'
import ModelsPage from './pages/ModelsPage'
import PricingPage from './pages/PricingPage'
import SolutionsPage from './pages/SolutionsPage'
import { DocsLayout } from './pages/DocsLayout'
import DocsIndexPage from './pages/DocsIndexPage'
import DocDetailPage from './pages/DocDetailPage'
import StatusPage from './pages/StatusPage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ConsoleHome from './pages/console/ConsoleHome'
import ApiKeysPage from './pages/console/ApiKeysPage'
import UsagePage from './pages/console/UsagePage'
import PlaygroundPage from './pages/console/PlaygroundPage'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'models', element: <ModelsPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'solutions', element: <SolutionsPage /> },
      {
        path: 'docs',
        element: <DocsLayout />,
        children: [
          { index: true, element: <DocsIndexPage /> },
          { path: ':slug', element: <DocDetailPage /> },
        ],
      },
      { path: 'status', element: <StatusPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        path: 'console',
        element: (
          <RequireAuth>
            <ConsoleHome />
          </RequireAuth>
        ),
      },
      {
        path: 'console/keys',
        element: (
          <RequireAuth>
            <ApiKeysPage />
          </RequireAuth>
        ),
      },
      {
        path: 'console/usage',
        element: (
          <RequireAuth>
            <UsagePage />
          </RequireAuth>
        ),
      },
      {
        path: 'console/playground',
        element: (
          <RequireAuth>
            <PlaygroundPage />
          </RequireAuth>
        ),
      },
      { path: '*', element: <HomePage /> },
    ],
  },
])

export function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}
