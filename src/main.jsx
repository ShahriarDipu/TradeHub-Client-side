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
import Dashboard from './assets/Component/Dashboard/Dashboard.jsx';
import DashboardView from './assets/Component/DashboardView/DashboardView.jsx';
import Profile from './assets/Component/Profile/Profile.jsx';
import About from './assets/Component/About/About.jsx';
import Contact from './assets/Component/Contuct/Contact.jsx';


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
path:"/About",
Component:About
      },
      {
        path:"/Contact",
        Component:Contact
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
        element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
      },
      {
        path:"AddExports",
        element:<PrivateRoute><AddExport></AddExport></PrivateRoute>
      },
      
  
     ]

  },
 {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
       Component:DashboardView,
      },
      {
        path: "MyExports",
        Component:MyExports
      },
      {
        path: "AddImports",
       Component:MyImports
      },
      {
        path: "AddExports",
        Component:AddExport,
      },
     
    ],
  },
  {
     
        path:"profile",
        Component:Profile
      
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>

      <RouterProvider router={router} />
    
       <Toaster position="top-right" reverseOrder={false} />
     
    </AuthProvider>
    
  </StrictMode>
)
