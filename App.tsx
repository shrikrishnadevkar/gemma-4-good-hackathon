import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { TutorChat } from './pages/TutorChat';
import { Subjects } from './pages/Subjects';
import { Quiz } from './pages/Quiz';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { currentPage, isDarkMode, isAuthenticated } = useApp();

  const pageComponents: Record<string, React.ReactNode> = {
    landing: <Landing />,
    dashboard: <Dashboard />,
    tutor: <TutorChat />,
    subjects: <Subjects />,
    quiz: <Quiz />,
    analytics: <Analytics />,
    settings: <Settings />,
    admin: <Admin />,
  };

  const isAppPage = isAuthenticated && currentPage !== 'landing';

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-[#0a0a1a] to-gray-950 text-white">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 via-indigo-500/3 to-cyan-500/3 rounded-full blur-3xl" />
        </div>

        {isAppPage ? (
          <div className="flex relative z-10">
            <Sidebar />
            <div className="flex-1 lg:ml-64">
              <Header />
              <main className="min-h-[calc(100vh-4rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {pageComponents[currentPage]}
                  </motion.div>
                </AnimatePresence>
              </main>
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {pageComponents[currentPage]}
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Built for Hackathon Badge (fixed) */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="glass rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs text-gray-400">
              Built for <span className="text-purple-400 font-semibold">Gemma 4 Good Hackathon</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
