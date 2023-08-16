import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store';
import {
  createBrowserRouter,
  Routes,Route, BrowserRouter
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <BrowserRouter>
     <Routes>
         <Route path="/*" element={<App />} />
       
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
)
