import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from './assets/Component/Home/Home.jsx';
import { AllProducts } from './assets/Component/AllProducts/AllProducts.jsx';
import { LoginRegister } from './assets/Component/LoginRegister/LoginRegister.jsx';
import { AuthProvider } from './Context/AuthProvider.jsx';
import { MyExports } from './assets/Component/MyExports/MyExports.jsx';
import { MyImports } from './assets/Component/MyImports/MyImports.jsx';
import PrivateRoute from './assets/Route/PrivateRoute.jsx';
import ProductDetails from './assets/Component/ProductDetails/ProductDetails.jsx';
import AddExport from './assets/Component/AddExports/AddExport.jsx';
import { ThemeProvider } from 'next-themes'

const router = createBrowserRouter([
  {
    path: "/",
     Component:App,
     children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'AllProducts',
        Component:AllProducts
      },
      {
        path:"LoginRegister",
        Component:LoginRegister
      },
      {
        path:"MyExports",
        element:<PrivateRoute>
          <MyExports></MyExports>
        </PrivateRoute>
      },
      {
        path:"MyImports",
        element:<PrivateRoute><MyImports></MyImports></PrivateRoute>
        
      },
      {
        path: "products/:id", 
        Component:ProductDetails,
      },
      {
        path:"AddExports",
        Component:AddExport
      }
  
     ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>

      <RouterProvider router={router} />
    
       <Toaster position="top-right" reverseOrder={false} />
     
    </AuthProvider>
    
  </StrictMode>
)
