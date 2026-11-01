import React, { useState } from 'react';
import { FindMyPathWizard } from '../components/pathway/FindMyPathWizard';
import { PathwayAdminModal } from '../components/pathway/PathwayAdminModal';

interface FindMyPathPageProps {
  onViewProgrammeDetails: (programmeId: string) => void;
  onApplyForProgramme: (programmeTitle?: string) => void;
}

export const FindMyPathPage: React.FC<FindMyPathPageProps> = ({
  onViewProgrammeDetails,
  onApplyForProgramme,
}) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-20 pb-16">
      {/* Container */}
      <FindMyPathWizard
        onViewProgrammeDetails={onViewProgrammeDetails}
        onApplyForProgramme={onApplyForProgramme}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Staff Admin Rules Manager Modal */}
      <PathwayAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};
