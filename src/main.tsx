import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/redux/store.ts'
import  {RouterProvider} from 'react-router-dom'
import { router } from './router/router.tsx'
import { Toaster } from 'sonner'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Provider store={store}>
   <Toaster />
   <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
