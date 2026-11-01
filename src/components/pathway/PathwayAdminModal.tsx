import React, { useState, useEffect } from 'react';
import { X, Settings, RotateCcw, Save, ShieldCheck, Check, Plus, Trash2, Users, FileText, ChevronRight } from 'lucide-react';
import { CourseRule, PathwayLead } from '../../types/pathway';
import { getStoredCourseRules, saveCourseRules, resetCourseRulesToDefault, getStoredPathwayLeads } from '../../utils/pathwayEngine';

interface PathwayAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRulesUpdated?: () => void;
}

export const PathwayAdminModal: React.FC<PathwayAdminModalProps> = ({
  isOpen,
  onClose,
  onRulesUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'leads'>('rules');
  const [rules, setRules] = useState<CourseRule[]>([]);
  const [leads, setLeads] = useState<PathwayLead[]>([]);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  // Form edit state for selected rule
  const [editingRule, setEditingRule] = useState<CourseRule | null>(null);
  const [newAltQual, setNewAltQual] = useState('');

  useEffect(() => {
    if (isOpen) {
      const loadedRules = getStoredCourseRules();
      setRules(loadedRules);
      setLeads(getStoredPathwayLeads());
      if (loadedRules.length > 0) {
        setSelectedRuleId(loadedRules[0].id);
        setEditingRule({ ...loadedRules[0] });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectRule = (rule: CourseRule) => {
    setSelectedRuleId(rule.id);
    setEditingRule({ ...rule });
  };

  const handleSaveRule = () => {
    if (!editingRule) return;

    const updated = rules.map((r) => (r.id === editingRule.id ? editingRule : r));
    setRules(updated);
    saveCourseRules(updated);
    showNotification(`Entry rules updated for "${editingRule.programmeTitle}"`);
    if (onRulesUpdated) onRulesUpdated();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all entry rules to institutional defaults?')) {
      const defaultRules = resetCourseRulesToDefault();
      setRules(defaultRules);
      if (defaultRules.length > 0) {
        setSelectedRuleId(defaultRules[0].id);
        setEditingRule({ ...defaultRules[0] });
      }
      showNotification('Course entry requirements reset to default.');
      if (onRulesUpdated) onRulesUpdated();
    }
  };

  const showNotification = (msg: string) => {
    setSavedNotification(msg);
    setTimeout(() => {
      setSavedNotification(null);
    }, 3500);
  };

  const handleAddAltQual = () => {
    if (!editingRule || !newAltQual.trim()) return;
    setEditingRule({
      ...editingRule,
      acceptedAlternativeQualifications: [
        ...editingRule.acceptedAlternativeQualifications,
        newAltQual.trim(),
      ],
    });
    setNewAltQual('');
  };

  const handleRemoveAltQual = (index: number) => {
    if (!editingRule) return;
    const updated = [...editingRule.acceptedAlternativeQualifications];
    updated.splice(index, 1);
    setEditingRule({
      ...editingRule,
      acceptedAlternativeQualifications: updated,
    });
  };

  const toggleStream = (streamName: string) => {
    if (!editingRule) return;
    let currentStreams = [...editingRule.requiredALStreams];

    if (streamName === 'Any Stream') {
      currentStreams = ['Any Stream'];
    } else {
      currentStreams = currentStreams.filter((s) => s !== 'Any Stream');
      if (currentStreams.includes(streamName)) {
        currentStreams = currentStreams.filter((s) => s !== streamName);
      } else {
        currentStreams.push(streamName);
      }
      if (currentStreams.length === 0) currentStreams = ['Any Stream'];
    }

    setEditingRule({ ...editingRule, requiredALStreams: currentStreams });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#141414] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="px-5 py-4 bg-[#1F1F1F] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFCC00]/15 border border-[#FFCC00]/30 flex items-center justify-center text-[#FFCC00]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                BIET Pathway Administration & Rules Engine
                <span className="text-[10px] bg-[#FFCC00] text-[#111111] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Staff Console
                </span>
              </h2>
              <p className="text-xs text-white/60">
                Manage entry benchmarks, required streams, alternative qualifications, and student leads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 bg-[#181818] border-b border-white/10 flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'rules'
                  ? 'border-[#FFCC00] text-[#FFCC00]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Course Entry Requirements Rules ({rules.length})
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`py-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'leads'
                  ? 'border-[#FFCC00] text-[#FFCC00]'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Prospective Student Leads ({leads.length})
            </button>
          </div>

          {activeTab === 'rules' && (
            <button
              onClick={handleResetDefaults}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Rules to Defaults
            </button>
          )}
        </div>

        {/* Toast Notification */}
        {savedNotification && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-5 py-2 text-xs text-emerald-300 font-semibold flex items-center gap-2 animate-fadeIn">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {savedNotification}
          </div>
        )}

        {/* Tab Content 1: Rules Manager */}
        {activeTab === 'rules' && (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Left Sidebar: Course Rule Selector */}
            <div className="md:col-span-4 border-r border-white/10 p-4 overflow-y-auto space-y-2 bg-[#121212]">
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-2">Select Programme to Edit</p>
              {rules.map((rule) => {
                const isSelected = selectedRuleId === rule.id;
                return (
                  <button
                    key={rule.id}
                    onClick={() => handleSelectRule(rule)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FFCC00]/15 border-[#FFCC00] text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold leading-tight">{rule.programmeTitle}</p>
                      <p className="text-[10px] text-white/50 mt-1 capitalize">{rule.category} • Min {rule.minALPasses} A/L Passes</p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#FFCC00]' : 'text-white/30'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Main Form: Rule Editor */}
            {editingRule ? (
              <div className="md:col-span-8 p-5 overflow-y-auto space-y-5 bg-[#161616]">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-base font-bold text-white">{editingRule.programmeTitle}</h3>
                    <p className="text-xs text-[#FFCC00]">ID: {editingRule.programmeId}</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-white">
                    <input
                      type="checkbox"
                      checked={editingRule.isActive}
                      onChange={(e) => setEditingRule({ ...editingRule, isActive: e.target.checked })}
                      className="rounded accent-[#FFCC00] w-4 h-4"
                    />
                    Active Rule
                  </label>
                </div>

                {/* Grade Requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-black/40 p-3.5 rounded-xl border border-white/5">
                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Min A/L Passes Required</label>
                    <select
                      value={editingRule.minALPasses}
                      onChange={(e) => setEditingRule({ ...editingRule, minALPasses: Number(e.target.value) })}
                      className="w-full bg-[#222222] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    >
                      <option value={0}>0 Passes (Foundation Only)</option>
                      <option value={1}>1 Pass (Conditional Assessment)</option>
                      <option value={2}>2 Passes (Standard Entry)</option>
                      <option value={3}>3 Passes (High Academic)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Min O/L Mathematics Grade</label>
                    <select
                      value={editingRule.minOLMathsGrade}
                      onChange={(e) => setEditingRule({ ...editingRule, minOLMathsGrade: e.target.value as any })}
                      className="w-full bg-[#222222] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    >
                      <option value="A">Grade A (Distinction)</option>
                      <option value="B">Grade B (Very Good)</option>
                      <option value="C">Grade C (Credit)</option>
                      <option value="S">Grade S (Ordinary Pass)</option>
                      <option value="Any">Any / Not Required</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/70 mb-1">Min O/L English Grade</label>
                    <select
                      value={editingRule.minOLEnglishGrade}
                      onChange={(e) => setEditingRule({ ...editingRule, minOLEnglishGrade: e.target.value as any })}
                      className="w-full bg-[#222222] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    >
                      <option value="A">Grade A (Distinction)</option>
                      <option value="B">Grade B (Very Good)</option>
                      <option value="C">Grade C (Credit)</option>
                      <option value="S">Grade S (Ordinary Pass)</option>
                      <option value="Any">Any / Not Required</option>
                    </select>
                  </div>
                </div>

                {/* Stream Selection */}
                <div>
                  <label className="block text-xs font-bold text-white mb-2">Required / Accepted A/L Streams</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Any Stream',
                      'Physical Science / Combined Mathematics',
                      'Biological Science',
                      'Engineering Technology',
                      'General Science (UK A-Levels)',
                      'Commerce & Accounting',
                      'Arts & Humanities',
                    ].map((st) => {
                      const isChecked = editingRule.requiredALStreams.includes(st);
                      return (
                        <button
                          key={st}
                          type="button"
                          onClick={() => toggleStream(st)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isChecked
                              ? 'bg-[#FFCC00] text-[#111111] font-bold border-[#FFCC00]'
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {isChecked && <Check className="inline-block w-3 h-3 mr-1" />}
                          {st}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Alternative Recognized Qualifications */}
                <div>
                  <label className="block text-xs font-bold text-white mb-2">Accepted Alternative Entry Qualifications</label>
                  <div className="space-y-2 mb-3">
                    {editingRule.acceptedAlternativeQualifications.map((alt, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-black/30 px-3 py-2 rounded-lg border border-white/5 text-xs text-white">
                        <span>• {alt}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAltQual(idx)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add qualification e.g., NVQ Level 5 Civil Engineering..."
                      value={newAltQual}
                      onChange={(e) => setNewAltQual(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAltQual())}
                      className="flex-1 bg-[#222222] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    />
                    <button
                      type="button"
                      onClick={handleAddAltQual}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Foundation & Progression Pathway Config */}
                <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">Recommended Foundation / Progression Course</label>
                    <input
                      type="text"
                      value={editingRule.progressionPathwayCourse}
                      onChange={(e) => setEditingRule({ ...editingRule, progressionPathwayCourse: e.target.value })}
                      className="w-full bg-[#222222] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-white mb-1">Progression Advice Note for Non-Eligible Students</label>
                    <textarea
                      rows={2}
                      value={editingRule.progressionNote}
                      onChange={(e) => setEditingRule({ ...editingRule, progressionNote: e.target.value })}
                      className="w-full bg-[#222222] border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    />
                  </div>
                </div>

                {/* Save Rule CTA */}
                <div className="pt-3 border-t border-white/10 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveRule}
                    className="px-5 py-2.5 bg-[#FFCC00] hover:bg-[#FFE066] text-[#111111] rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-[#FFCC00]/10"
                  >
                    <Save className="w-4 h-4" />
                    Save Rules for {editingRule.programmeTitle}
                  </button>
                </div>
              </div>
            ) : (
              <div className="md:col-span-8 p-10 flex items-center justify-center text-white/50 text-sm">
                Select a programme on the left to edit its requirements.
              </div>
            )}
          </div>
        )}

        {/* Tab Content 2: Leads Viewer */}
        {activeTab === 'leads' && (
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#141414]">
            {leads.length === 0 ? (
              <div className="py-16 text-center text-white/50 space-y-2">
                <Users className="w-10 h-10 mx-auto text-white/20" />
                <p className="text-sm font-semibold">No prospective student leads submitted yet.</p>
                <p className="text-xs text-white/40 max-w-sm mx-auto">
                  When students complete the Find My Path wizard and submit their contact details, their full qualification report will appear here for counsellor follow-up.
                </p>
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="bg-[#1C1C1C] border border-white/10 rounded-xl p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {lead.fullName}
                        <span className="text-xs text-[#FFCC00] font-normal">({lead.city})</span>
                      </h4>
                      <p className="text-xs text-white/60">
                        Email: <a href={`mailto:${lead.email}`} className="text-white hover:underline">{lead.email}</a> | Phone/WA: <a href={`tel:${lead.phone}`} className="text-[#FFCC00] hover:underline">{lead.phone}</a>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] bg-white/10 text-white/70 px-2.5 py-1 rounded-md font-mono">
                        ID: {lead.id}
                      </span>
                      <p className="text-[10px] text-white/40 mt-1">Intake: {lead.preferredIntake}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1">
                      <p className="font-bold text-white/70">Selected Qualifications:</p>
                      <p className="text-white">{lead.profile.qualifications.join(', ') || 'N/A'}</p>
                      <p className="text-white/60">Stream: {lead.profile.stream || 'N/A'} | A/L Passes: {lead.profile.alPassesCount}</p>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5 space-y-1">
                      <p className="font-bold text-white/70">Top Recommended Course:</p>
                      <p className="text-[#FFCC00] font-semibold">
                        {lead.recommendedProgrammes?.[0]?.title || 'Multiple matches'}
                      </p>
                      <p className="text-white/60">Status: {lead.recommendedProgrammes?.[0]?.status}</p>
                    </div>
                  </div>

                  {lead.additionalNotes && (
                    <p className="text-xs text-white/80 bg-white/5 p-2 rounded-lg italic">
                      "{lead.additionalNotes}"
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
