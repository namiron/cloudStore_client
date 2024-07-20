import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import styles from './app.module.scss'
import Navbar from './components/navbar/Navbar'
import { useAppSelector } from './components/hooks/hooks';
import '../reset.scss'
import Disk from './components/pages/Disk';

const RegistrationPage = lazy(() => import('../src/components/registration/Registration'));
const LayoutPage = lazy(() => import('../src/components/Layout/Layout'));
const LoginPage = lazy(() => import('../src/components/login/Login'));



const App: React.FC = () => {
  //---------------------------------------
  const isAuth = useAppSelector((state) => state.users.isAuth)
  //---------------------------------------


  return (
    <div className={styles.app}>
      <Navbar />
      {
        !isAuth ?
          <Routes>
            <Route path="/" element={<Suspense fallback={'loading...'}> <LayoutPage /></Suspense>}>
              <Route path="/registration" element={<Suspense fallback={'loading...'}> <RegistrationPage /></Suspense>} />
              <Route path="/login" element={<Suspense fallback={'loading...'}> <LoginPage /></Suspense>} />
            </Route>
          </Routes>
          :
          <Disk />
      }

    </div>
  )
}

export default App
