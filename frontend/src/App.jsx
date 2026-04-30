import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import CreateJobPage from './pages/CreateJobPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobListPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/post" element={<CreateJobPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
