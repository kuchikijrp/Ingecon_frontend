import React from 'react';

import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';
import 'react-table-v6/react-table.css'
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      
      <Routes />
     
      <GlobalStyles />
    </>
  );
}

export default App;
