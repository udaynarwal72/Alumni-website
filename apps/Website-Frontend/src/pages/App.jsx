import { useState } from 'react'
import NavBar from '../components/Navbar'
import ImageSlider from '../components/imageSlider'
import BlogAndEventSection from '../components/blog-event-container'
import Footer from '../components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar /> 
      <ImageSlider/>
      <BlogAndEventSection/>
      <Footer/>
    </>
  )
}

export default App
