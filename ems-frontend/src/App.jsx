
import './App.css'
import EventComponents from './components/EventComponents'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEventComponent from './components/ListEventComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
 

  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
        <Routes>
          {/* // http://localhost:3000 */}
            <Route path='/' element = {<ListEventComponent/>}></Route>
            {/* // http://localhost:3000/event  */}
            <Route path='/event' element = {<ListEventComponent/>}></Route>
            {/* //http://localhost:3000/add-event */}
            <Route path='/add-event' element={<EventComponents/>}></Route>
            {/* //http://localhost:3000/add-event */}
            <Route path='/edit-event/:id' element = {<EventComponents/>}></Route>
        </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
