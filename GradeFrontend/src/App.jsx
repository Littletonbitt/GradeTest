import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PrivateRoute, AdminRoute } from './components/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import About from './components/About';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Admin from './components/Admin';
import Forbidden from './components/Forbidden';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Contacts from './components/Contacts';
import BugReport from './components/Report';
import Review from './components/Review';
import TestCreation from './components/TestCreation';
import Results from './components/Results';
import TestSolve from './components/TestSolve';
import TestEditWrapper from './components/TestEditWrapper';

function AppContent() {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }
    
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/report" element={<BugReport />} />
                <Route path="/review" element={<Review />} />
                <Route path="/forbidden" element={<Forbidden />} />

                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                    } 
                />
                <Route path="/testcreate" element={
                    <PrivateRoute>
                        <TestCreation />
                    </PrivateRoute>
                    } 
                />
                <Route path="/results" element={
                    <PrivateRoute>
                        <Results />
                    </PrivateRoute>
                    } 
                />
                <Route path="/test/:testId" element={
                    <PrivateRoute>
                        <TestSolve />
                    </PrivateRoute>
                    } 
                />

                <Route path="/admin" element={
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                    } 
                />
                <Route path="/test/:testId/edit" element={
                    <PrivateRoute>
                        <TestEditWrapper />
                    </PrivateRoute>
                    }
                />

                <Route path="/" element={user ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        <Footer />
    </BrowserRouter>
  );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;

