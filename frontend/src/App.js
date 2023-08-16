import Layout from './components/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Transactions from './components/Transactions/Transactions';
import TransactionDetail from './components/Transactions/TransactionDetail';
import { Routes, Route } from 'react-router-dom';


const App = () => {
 return(  
  <Routes>
      <Route path="/" element={<Layout />} />
      <Route index  element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/transactions' element={<Transactions />} />
      <Route path='/view-transaction-details/:id' element={<TransactionDetail />} />
   </Routes>
 );
}

export default App;
