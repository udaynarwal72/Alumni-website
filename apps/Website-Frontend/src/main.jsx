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
import HiringPage from './pages/Hire';
import UserProfile from './pages/UserProfileSection';
import OurAlumni from './pages/OurAlumini';
import Blogs from './pages/Blogs';
import BlogCard from './components/BlogCard/BlogCard';
import SignInPage from './pages/Signin';
import SignupPage from './pages/Signup';

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
    path: '/signin',
    element: <SignInPage />
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
  },
  {
    path: '/blog',
    element: <Blogs />
  },
  {
    path:'testblogcard',
    element:<BlogCard />
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <HeaderProvider>
    <RouterProvider router={router} />
  </HeaderProvider>,
);
