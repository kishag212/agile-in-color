import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Manifesto from './pages/Manifesto.jsx'
import Team from './pages/Team.jsx'
import Programs from './pages/Programs.jsx'
import Events from './pages/Events.jsx'
import Membership from './pages/Membership.jsx'
import Sponsor from './pages/Sponsor.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/manifesto" element={<Manifesto />} />
        <Route path="/team" element={<Team />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
