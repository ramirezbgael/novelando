import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Property from './pages/Property.tsx'
import PropertiesList from './pages/PropertiesList.tsx'
import Blog from './pages/Blog.tsx'
import BlogPost from './pages/BlogPost.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/property/:id', element: <Property /> },
  { path: '/properties', element: <PropertiesList /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:id', element: <BlogPost /> },
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
