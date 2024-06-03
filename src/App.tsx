import { BrowserRouter, Route, Routes  } from 'react-router-dom';

import { Dashboard } from './pages/dashboard';
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { Signout } from './pages/signout';

import './App.css';

function App() {
  return (
    <>

      <BrowserRouter>
        <header className="w-screen bg-black text-white py-4 px-6 sm:px-8 md:px-10 flex flex-row justify-between">
          <div className='flex justify-between w-full'>
            <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">Expense Tracker</h1>
            {localStorage.getItem('token-expense-tracker') 
             ?
             <button 
              type="submit" 
              onClick={() => {
                localStorage.removeItem('token-expense-tracker')
                window.location.reload();
              }}
              >
                Signout
              </button>
            : 
              <></>
            }

          </div>
        </header>
        <Routes>
          <Route
            path='/'
            element={<Dashboard/>}
          />
          <Route
            path='/signin'
            element={<Signin/>}
          />
          <Route
            path='/signup' 
            element={<Signup/>}
          />
          <Route
            path='/signout' 
            element={<Signout/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
