import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";

import './index.css'
import RootRouter from "./router/rootRouter.jsx";
import {APIProvider} from "./contexts/APIProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <APIProvider>
          <RootRouter/>
      </APIProvider>
      </BrowserRouter>
  </StrictMode>,
)
