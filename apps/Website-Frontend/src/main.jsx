import React from 'react';
import ReactDOM from 'react-dom/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './pages/App';
import './index.css';
import HeaderProvider from './context/HeaderProvider';
import AboutUsPage from './pages/AboutUs';
import ContactUsPage from './pages/ContactUs';
import LoginPage from './components/Signin/Login';
import SignupPage from './components/signup';
import HiringPage from './pages/Hire';
import UserProfile from './pages/UserProfileSection';
import OurAlumni from './pages/OurAlumini';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <AboutUsPage />,
  },
  {
    path: '/contactus',
    element: <ContactUsPage />,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/hire',
    element: <HiringPage />
  },
  {
    path: '/profilesection',
    element: <UserProfile />
  },
  {
    path: '/ouralumni',
    element: <OurAlumni />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <HeaderProvider>
    <RouterProvider router={router} />
  </HeaderProvider>,
);
