import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import WorkflowDetails from './pages/WorkflowDetails';
import Articles from './pages/Articles';
import PublishingLogs from './pages/PublishingLogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workflow/:id" element={<WorkflowDetails />} />
          <Route path="articles" element={<Articles />} />
          <Route path="logs" element={<PublishingLogs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
