import React from 'react'
import {Routes, Route} from "react-router-dom";
import './scss/app.scss';
import Header from "./components/Header";
import Home from "./pages/Home"; 
import {Cart} from "./pages/Cart"; 
import { NotFoundBlock } from './components/NotFoundBlock';

export const SearchContext = React.createContext('')

  function App() {
    const [searchValue, setSearchValue] = React.useState('')
    // const count = useSelector((state) => state.counter.value)
    // const dispatch = useDispatch()
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header />
      <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<NotFoundBlock/>}/>
            </Routes>
        </div>
        </SearchContext.Provider>
      </div>
    
  );
}

export default App;
