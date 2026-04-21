import { useState } from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import ModulesList from './pages/ModulesList';
import ModuleDetail from './pages/ModuleDetail';
import Progress from './pages/Progress';
import { useProgress } from './hooks/useProgress';

export default function App() {
  // Simple router state (pas besoin de react-router pour ce projet)
  const [page, setPage] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState(null);

  const progress = useProgress();

  const navigate = (target, module = null) => {
    setPage(target);
    if (module) setSelectedModule(module);
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard navigate={navigate} progress={progress} />;
      case 'modules':
        return <ModulesList navigate={navigate} progress={progress} />;
      case 'module':
        return (
          <ModuleDetail
            module={selectedModule}
            navigate={navigate}
            progress={progress}
          />
        );
      case 'progress':
        return <Progress navigate={navigate} progress={progress} />;
      default:
        return <Dashboard navigate={navigate} progress={progress} />;
    }
  };

  return (
    <Layout page={page} navigate={navigate} progress={progress} selectedModule={selectedModule}>
      {renderPage()}
    </Layout>
  );
}