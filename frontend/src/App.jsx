import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkflowDetails from './pages/WorkflowDetails';
import ArticlesFeed from './pages/ArticlesFeed';
import PublishingLogs from './pages/PublishingLogs';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workflows" element={<Dashboard />} /> {/* Using Dashboard as overview for now */}
          <Route path="/workflow/:id" element={<WorkflowDetails />} />
          <Route path="/articles" element={<ArticlesFeed />} />
          <Route path="/logs" element={<PublishingLogs />} />
          <Route path="*" element={<div className="text-center py-20 text-slate-500">Page not found</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
