import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { Contact } from '../pages/contact/Contact';
import { Info } from '../pages/info/Info';
import { Home } from '../pages/home/Home';
import { Subject } from '../pages/subject/Subject';
import Instalaciones from '../pages/info/instalaciones/Instalaciones';
import Docentes from '../pages/info/docentes/Docentes';
import Alumni from '../pages/info/alumni/Alumni';

import ErrorComponent from '../components/ErrorComponent';
import { ThemeProvider } from '../components/ThemeContext';
import useSession from '../hooks/useSession';

export const AppRouter = () => {
    const [isLogged] = useSession();

    if (isLogged === null) {
        return <div>Loading...</div>; // Mostrar un loading mientras se verifica la sesión
    }

    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    {isLogged ? (
                        <>
                            <Route path='/' element={<Navigate to='/home' />} />
                            <Route path='/home' element={<Home />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/info' element={<Info />} />
                            <Route path='/subject' element={<Subject />} />
                            <Route path='/instalaciones' element={<Instalaciones />} />
                            <Route path='/docentes' element={<Docentes />} />
                            <Route path='/alumni' element={<Alumni />} />
                            <Route path='*' element={<ErrorComponent />} />
                        </>
                    ) : (
                        <>
                            <Route path='/' element={<Navigate to='/login' />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/contact' element={<Contact />} />
                            <Route path='/info' element={<Info />} />
                            <Route path='*' element={<ErrorComponent />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};
