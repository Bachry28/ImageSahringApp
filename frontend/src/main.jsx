import React from 'react'
import ReactDOM from 'react-dom/client'
import{
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

import App from './App.jsx'
import LandingPages from './pages/LandingPage.jsx';
import './index.css'


const router = createBrowserRouter([
  {
    path:"/",
      element: <App/>,
  },
  {path:"/landingpage",
      element: <LandingPages/>,
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
  </>
);
