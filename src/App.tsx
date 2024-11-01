import React from 'react';
import { Header } from './components/Header';
import { AnalyzerForm } from './components/AnalyzerForm';
import { ResultsCard } from './components/ResultsCard';
import { ServiceCard } from './components/ServiceCard';
import { Code, Palette, Globe, Film, PenTool, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import type { SEOAnalysis } from './types/seo';

function App() {
  const [analysis, setAnalysis] = React.useState<SEOAnalysis | null>(null);

  const services = [
    {
      title: 'Webbutveckling',
      description: 'Vi bygger moderna och funktionella hemsidor anpassade efter era behov.',
      icon: Code
    },
    {
      title: 'SEO & Digital Marknadsföring',
      description: 'Öka er synlighet online och nå ut till rätt målgrupp.',
      icon: Search
    },
    {
      title: 'Webbdesign',
      description: 'Skapa en visuellt tilltalande och användarvänlig webbplats.',
      icon: Palette
    },
    {
      title: 'Digital Strategi',
      description: 'Utveckla en effektiv digital närvaro för ert företag.',
      icon: Globe
    },
    {
      title: 'Medieproduktion',
      description: 'Professionell film- och fotoproduktion för ert företag.',
      icon: Film
    },
    {
      title: 'Content Writing',
      description: 'SEO-optimerat innehåll som engagerar er målgrupp.',
      icon: PenTool
    }
  ];

  const handleAnalyze = async (url: string) => {
    setAnalysis({
      url,
      status: 'analyzing',
      results: undefined
    });

    // Temporary mock data
    setTimeout(() => {
      setAnalysis({
        url,
        status: 'complete',
        results: {
          performance: {
            score: 85,
            metrics: {
              lcp: 2.5,
              fid: 100,
              cls: 0.1
            }
          },
          seo: {
            score: 92,
            issues: [
              {
                type: 'meta',
                severity: 'medium',
                message: 'Metabeskrivningen kunde vara mer beskrivande'
              },
              {
                type: 'heading',
                severity: 'low',
                message: 'Överväg att lägga till mer rubrikstruktur'
              }
            ]
          },
          security: {
            https: true,
            sslCertificate: {
              valid: true,
              expiryDate: '2024-12-31'
            }
          }
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Lämna det digitala till oss
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Vi hjälper er att bygga moderna och funktionella hemsidor, öka er synlighet och maximera er försäljning online.
          </motion.p>
          
          <div className="flex flex-col items-center gap-12">
            <AnalyzerForm 
              onAnalyze={handleAnalyze}
              isAnalyzing={analysis?.status === 'analyzing'}
            />

            {analysis?.status === 'analyzing' && (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 dark:border-indigo-400" />
                <p className="text-gray-600 dark:text-gray-300">Analyserar din webbplats...</p>
              </div>
            )}

            {analysis?.status === 'complete' && analysis.results && (
              <ResultsCard results={analysis.results} />
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="tjanster" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
          >
            Våra Tjänster
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;