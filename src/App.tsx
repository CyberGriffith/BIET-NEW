/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgrammesPage } from './pages/ProgrammesPage';
import { ProgrammeDetailPage } from './pages/ProgrammeDetailPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { StudentLifePage } from './pages/StudentLifePage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { ContactPage } from './pages/ContactPage';

// Shared Modals & Floating Widgets
import { ApplicationModal } from './components/ApplicationModal';
import { ProgrammeDetailModal } from './components/ProgrammeDetailModal';
import { ProspectusModal } from './components/ProspectusModal';
import { NewsArticleModal } from './components/NewsArticleModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { FindMyPathPage } from './pages/FindMyPathPage';
import { PROGRAMMES_DATA } from './data/mockData';
import { Programme, NewsItem } from './types';

export default function App() {
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isProspectusModalOpen, setIsProspectusModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsItem | null>(null);
  const [preSelectedCourse, setPreSelectedCourse] = useState<string | undefined>(undefined);

  const handleOpenApplyModal = (programmeTitle?: string) => {
    setPreSelectedCourse(programmeTitle);
    setIsAppModalOpen(true);
  };

  const handleOpenProgrammeDetails = (programmeId: string) => {
    const found = PROGRAMMES_DATA.find((p) => p.id === programmeId);
    if (found) {
      setSelectedProgramme(found);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-[#111111] flex flex-col selection:bg-[#FFCC00] selection:text-[#111111]">
        {/* Global Navigation Bar */}
        <Navbar
          onApplyClick={() => handleOpenApplyModal()}
          onProspectusClick={() => setIsProspectusModalOpen(true)}
        />

        {/* Dynamic Route View */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onApplyClick={handleOpenApplyModal}
                  onProspectusClick={() => setIsProspectusModalOpen(true)}
                  onSelectProgramme={(prog) => setSelectedProgramme(prog)}
                  onSelectNewsArticle={(article) => setSelectedNewsArticle(article)}
                />
              }
            />
            <Route
              path="/about"
              element={
                <AboutPage
                  onApplyClick={() => handleOpenApplyModal()}
                  onProspectusClick={() => setIsProspectusModalOpen(true)}
                />
              }
            />
            <Route
              path="/programmes"
              element={
                <ProgrammesPage
                  onSelectProgramme={(prog) => setSelectedProgramme(prog)}
                  onApplyForProgramme={(courseTitle) => handleOpenApplyModal(courseTitle)}
                  onProspectusClick={() => setIsProspectusModalOpen(true)}
                />
              }
            />
            <Route
              path="/programmes/:programmeId"
              element={
                <ProgrammeDetailPage
                  onApplyClick={handleOpenApplyModal}
                  onProspectusClick={() => setIsProspectusModalOpen(true)}
                />
              }
            />
            <Route
              path="/admissions"
              element={
                <AdmissionsPage
                  onApplyClick={() => handleOpenApplyModal()}
                  onProspectusClick={() => setIsProspectusModalOpen(true)}
                />
              }
            />
            <Route
              path="/student-life"
              element={
                <StudentLifePage
                  onApplyClick={() => handleOpenApplyModal()}
                  onProspectusClick={() => setIsProspectusModalOpen(true)}
                />
              }
            />
            <Route
              path="/news"
              element={
                <NewsEventsPage
                  onSelectArticle={(article) => setSelectedNewsArticle(article)}
                  onApplyClick={() => handleOpenApplyModal()}
                />
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/find-my-path"
              element={
                <FindMyPathPage
                  onViewProgrammeDetails={handleOpenProgrammeDetails}
                  onApplyForProgramme={(title) => handleOpenApplyModal(title)}
                />
              }
            />
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer
          onApplyClick={() => handleOpenApplyModal()}
          onProspectusClick={() => setIsProspectusModalOpen(true)}
        />

        {/* Application & Registration Modal */}
        <ApplicationModal
          isOpen={isAppModalOpen}
          onClose={() => setIsAppModalOpen(false)}
          preSelectedProgramme={preSelectedCourse}
        />

        {/* Programme Curriculum & Syllabus Modal */}
        <ProgrammeDetailModal
          programme={selectedProgramme}
          onClose={() => setSelectedProgramme(null)}
          onApplyForProgramme={(courseTitle) => handleOpenApplyModal(courseTitle)}
          onDownloadProspectus={() => setIsProspectusModalOpen(true)}
        />

        {/* Institutional Prospectus Download Modal */}
        <ProspectusModal
          isOpen={isProspectusModalOpen}
          onClose={() => setIsProspectusModalOpen(false)}
          onApplyClick={() => handleOpenApplyModal()}
        />

        {/* News Article Reader Modal */}
        <NewsArticleModal
          article={selectedNewsArticle}
          onClose={() => setSelectedNewsArticle(null)}
          onApplyClick={() => handleOpenApplyModal()}
        />

        {/* Floating WhatsApp Admissions Click to Chat Widget */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}
