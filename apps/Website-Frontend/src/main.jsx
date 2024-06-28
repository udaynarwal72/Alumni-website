import React from 'react';
import ReactDOM from 'react-dom/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './pages/App';
import './main.css';
import HeaderProvider from './context/HeaderProvider';
import AboutUsPage from './pages/General/AboutUs';
import ContactUsPage from './pages/General/ContactUs';
import HiringPage from './pages/Job/Hire';
import UserProfile from './pages/User/UserProfileSection';
import OurAlumni from './pages/Alumni/OurAlumini';
import Blogs from './pages/Blog/Blogs';
import BlogCard from './components/BlogCard/BlogCard';
import SignInPage from './pages/General/Signin';
import SignupPage from './pages/General/Signup';
import Userlogout from './pages/User/Logout';
import BlogSection from './pages/Blog/BlogSection';
import BlogForm from './pages/Blog/BlogForm';
import Completeprofile from './pages/User/Completeprofile';
import EventInfo from './pages/Events/EventInfo';
import EditProfile from './pages/User/EditProfile';
import PostEvent from './pages/Events/PostEvent'
import { RecoilRoot } from 'recoil';
import JobInfo from './pages/Job/JobInfo';
import PostJob from './pages/Job/PostJob';
import AlumniClick from './pages/User/AlumniClick';
import BirthdayCard from './components/BirthdayCard/BirthdayCard';
import ForgotPass from './pages/General/ForgotPass';
import ConfirmMail from './pages/General/ConfirmMail';
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
    path: '/alumnisection',
    element: <OurAlumni />
  },
  {
    path: 'testblogcard',
    element: <BlogCard />
  },
  {
    path: '/logout',
    element: <Userlogout />
  },
  {
    path: '/blogsection',
    element: <BlogSection />
  },
  {
    path: '/createblog',
    element: <BlogForm />
  },
  {
    path: '/blogpage/:blogId',
    element: <Blogs />
  },
  {
    path: '/user/:userId',
    element: <UserProfile />
  },
  {
    path: '/completeprofile',
    element: <Completeprofile />
  },
  {
    path: '/eventpage/:eventId',
    element: <EventInfo />
  },
  {
    path: '/editprofile',
    element: <EditProfile />
  },
  {
    path: '/postevent',
    element: <PostEvent />
  },
  {
    path: '/jobpage/:jobId',
    element: <JobInfo />
  },
  {
    path: '/postjob',
    element: <PostJob />
  },
  {
    path: '/infoalumni/:alumniId',
    element: <AlumniClick />
  },
  {
    path:'/birthday',
    element:<BirthdayCard/>
  },{
    path:'/forget',
    element:<ForgotPass/>
  },
  {
    path:'resetmail',
    element:<ConfirmMail/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RecoilRoot>
      <HeaderProvider>
        <RouterProvider router={router} />
      </HeaderProvider>
    </RecoilRoot>
);