import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { SEOAnalysis } from '../types/seo';

interface ResultsCardProps {
  results: SEOAnalysis['results'];
}

export function ResultsCard({ results }: ResultsCardProps) {
  if (!results) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (score >= 50) return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
    return <XCircle className="h-6 w-6 text-red-500" />;
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Prestanda</h3>
            <span className={`text-2xl font-bold ${getScoreColor(results.performance.score)}`}>
              {results.performance.score}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Största Innehållsrendering</span>
              <span className="font-medium">{results.performance.metrics.lcp}s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Första Inmatningsfördröjning</span>
              <span className="font-medium">{results.performance.metrics.fid}ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Kumulativ Layoutförskjutning</span>
              <span className="font-medium">{results.performance.metrics.cls}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">SEO Poäng</h3>
            <span className={`text-2xl font-bold ${getScoreColor(results.seo.score)}`}>
              {results.seo.score}
            </span>
          </div>
          <div className="space-y-3">
            {results.seo.issues.map((issue, index) => (
              <div key={index} className="flex items-start gap-2">
                {getScoreIcon(issue.severity === 'high' ? 0 : issue.severity === 'medium' ? 50 : 90)}
                <p className="text-sm text-gray-600">{issue.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Säkerhet</h3>
          {results.security.https ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">HTTPS</span>
            <span className={`font-medium ${results.security.https ? 'text-green-500' : 'text-red-500'}`}>
              {results.security.https ? 'Aktiverat' : 'Ej aktiverat'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">SSL-certifikat</span>
            <span className={`font-medium ${results.security.sslCertificate.valid ? 'text-green-500' : 'text-red-500'}`}>
              {results.security.sslCertificate.valid ? 'Giltigt' : 'Ogiltigt'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}