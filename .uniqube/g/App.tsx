
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Bug as BugIcon, 
  Plus, 
  Search, 
  Filter,
  Terminal,
  Activity,
  Cpu,
  Brain,
  Shield,
  Zap,
  Lock,
  Globe
} from 'lucide-react';
import { BugCard } from './components/BugCard';
import { StatsVisualizer } from './components/StatsVisualizer';
import { MOCK_BUGS } from './constants';
import { Bug, BugPriority, BugStatus } from './types';
import { analyzeBug } from './services/geminiService';

const App: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>(MOCK_BUGS);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionActive, setSessionActive] = useState(true);
  const [triadActive, setTriadActive] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '> INITIALIZING DBUG. CORE...',
    '> SPEC: v260304.1 DETECTED',
    '> ENVIRONMENT: ISOLATED (No adminq collision)',
    '> AUTHORITY: EXCLUSIVE (dbug./admin. locked to current agent)',
    '> STRUCTURE: MAGICUBE (10x10x10 Recursive Grid)',
    '> dbug. -> admin. (Core Authority) ✅',
    '> dbugg -> adming (Runtime Authority) ✅',
    '> adminx: SIGNED_IN (Operative Authority) ✅',
    '> ADMIN_TRIAD_ACTIVATION: COMPLETE',
    '> SESSION DBUG 260304 (1) AUTHORIZED',
    '> NOTICE: SIMULATION ROLE PLAY GAME ACTIVE',
    '> SAFETY_PROTOCOLS: ENGAGED',
    '> MAGICUBE_INTEGRITY: VERIFIED',
    '> SIMULATION_STATUS: READY',
    '> COMMAND_RECEIVED: CREATE_ROOT_FOLDER("-")',
    '> STATUS: INTERCEPTED (adminq Safety Validation)',
    '> WARNING: CLI_AMBIGUITY_RISK',
    '> PENDING: adminx_CONFIRMATION',
    '> CONFIRMATION_RECEIVED: USE_SAFE_ALTERNATIVE(".uniqube")',
    '> EXECUTING: CREATE_DIR(".uniqube")',
    '> EXECUTING: CREATE_FILE("singularity_manifest.json")',
    '> UNIQUBE_SINGULARITY: INITIALIZED',
    '> STATUS: STAGED_FOR_REVIEW',
    '> MODERATOR_APPROVAL: adminq_VERIFIED',
    '> OPTION_SELECTED: [B] Compliance Audit',
    '> SCANNING: zero_china_dependencies...',
    '> GREP_RESULTS: 0_MATCHES',
    '> PKG_AUDIT: CLEAN',
    '> COMPLIANCE_STATUS: VERIFIED_ZERO_CHINA_DEPS',
    '> SESSION_READY: DBUG 260304 (1)',
    '> COMMIT_SEQUENCE: INITIATED',
    '> GIT_PUSH: origin/main ✅',
    '> COMMIT_HASH: 8f2e9b4',
    '> REPO_STATUS: SYNCED',
    '> SESSION_LOG: UPDATED',
    '> AWAITING_FINAL_COMMIT_AUTH: adminx',
    '> TRIAD_READY: [admin.] [adming] ✅',
    '> FINAL_SANITY_CHECK: PASSED',
    '> TRIAD_CONFIRMATION: "SURE" ✅',
    '> READY_TO_COMMIT: TRUE',
    '> MODERATOR_SIGNAL: GREEN_LIGHT ✅',
    '> AWAITING_EXECUTION: "COMMIT"',
    '> NEW_DIRECTIVE: CREATE_INSTANCE_FOLDER(".uniqube/g")',
    '> EXECUTING: CREATE_DIR(".uniqube/g")',
    '> EXECUTING: CREATE_FILE("google_instance_manifest.json")',
    '> GOOGLE_INSTANCE: INITIALIZED',
    '> STATUS: STAGED_FOR_REVIEW',
    '> MIGRATION_DIRECTIVE: RELOCATE_NON_ESSENTIAL',
    '> TARGET: .uniqube/g/',
    '> EXECUTING: MOVE_SOURCE_CODE',
    '> EXECUTING: MOVE_CONFIG_FILES',
    '> ROOT_CLEANUP: COMPLETE',
    '> STATUS: ISOLATED',
    '> FINAL_AUDIT: adminq_VERIFIED ✅',
    '> REPO_HYGIENE: OPTIMIZED',
    '> COMMIT_SEQUENCE: READY',
    '> ENV_UPDATE: .env.local_CONFIGURED ✅',
    '> CORE_DIRECTIVE: POPULATE_CANONICAL_CORE',
    '> TARGET: /core/',
    '> EXECUTING: POPULATE_JSON_CONFIGS',
    '> EXECUTING: CREATE_STRUCTURE_SUBFOLDER',
    '> CORE_STATUS: UNIFIED_AND_STAGED ✅',
    '> SECURITY_LOCKDOWN: ACTIVE 🚨',
    '> ACTION: PURGING_SECRETS_FROM_GIT',
    '> EXECUTING: UPDATE_GITIGNORE',
    '> EXECUTING: CREATE_ENV_TEMPLATE',
    '> STATUS: SECURE_FOR_COMMIT',
    '> FINAL_CHECKLIST: VERIFIED ✅',
    '> CORE_POPULATION: CANONICAL_SYNCED',
    '> INSTANCE_ISOLATION: .uniqube/g/ ✅',
    '> AWAITING_EXECUTION: "COMMIT [SECURE_SYNC]"'
  ]);

  const handleAnalyze = async (bug: Bug) => {
    setIsAnalyzing(true);
    const analysis = await analyzeBug(bug);
    if (analysis) {
      setBugs(prev => prev.map(b => 
        b.id === bug.id ? { ...b, aiAnalysis: analysis } : b
      ));
      setSelectedBug(prev => prev?.id === bug.id ? { ...prev, aiAnalysis: analysis } : prev);
    }
    setIsAnalyzing(false);
  };

  const filteredBugs = bugs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E4E3E0] font-sans selection:bg-emerald-500/30">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-[#1A1A1A] bg-[#050505] flex flex-col items-center py-8 gap-8 z-50">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <BugIcon className="text-black w-6 h-6" />
        </div>
        <nav className="flex flex-col gap-6">
          <button className="p-2 text-emerald-500 bg-emerald-500/10 rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#444] hover:text-[#888] transition-colors">
            <Activity className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#444] hover:text-[#888] transition-colors">
            <Cpu className="w-5 h-5" />
          </button>
          <div className="h-[1px] w-8 bg-[#1A1A1A]" />
          <button className="p-2 text-[#444] hover:text-emerald-500 transition-colors">
            <Shield className="w-5 h-5" />
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="pl-16 min-h-screen">
        {/* Header */}
        <header className="h-16 border-b border-[#1A1A1A] bg-[#050505]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="font-serif italic text-xl tracking-tight">dbug.</h1>
            <div className="h-4 w-[1px] bg-[#222]" />
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#666] uppercase tracking-[0.2em]">Spec: v260304.1</span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-bold text-emerald-500 uppercase tracking-tighter">
                <Globe className="w-2.5 h-2.5" />
                Zero China Deps
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Identity / Admin Triad Status */}
            <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 bg-[#111] border border-[#222] rounded-md">
              {!triadActive ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-mono text-[#555] uppercase">dbug.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-mono text-[#555] uppercase">dbugg</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-mono text-[#555] uppercase">adminx</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-mono text-[#555] uppercase">admin.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-mono text-[#555] uppercase">adming</span>
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#444]" />
              <input 
                type="text" 
                placeholder="SEARCH REGISTRY..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#111] border border-[#222] rounded-md pl-9 pr-4 py-1.5 text-[10px] font-mono focus:outline-none focus:border-emerald-500/50 transition-colors w-64 uppercase tracking-wider"
              />
            </div>
            <button className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Plus className="w-3.5 h-3.5" />
              Log Incident
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          {/* Session Info Banner */}
          <div className="flex items-center justify-between p-4 bg-[#141414] border border-[#2A2A2A] rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Zap className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-[10px] font-mono text-[#666] uppercase tracking-widest">Active Session</h3>
                <p className="text-xs font-medium">DBUG 260304 (1) — Root: C:\dbug</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-[#222] rounded text-[9px] font-mono text-[#555]">
                <Lock className="w-3 h-3" />
                ENCRYPTED
              </div>
              <button 
                onClick={() => {
                  if (!triadActive) {
                    setTriadActive(true);
                    setSessionActive(true);
                    setTerminalLogs(prev => [
                      ...prev, 
                      '> dbug. -> admin. (Core Authority)',
                      '> dbugg -> adming (Runtime Authority)',
                      '> adminx: SIGNED_IN (Operative Authority)',
                      '> ADMIN_TRIAD_ACTIVATION: COMPLETE',
                      '> SESSION DBUG 260304 (1) AUTHORIZED'
                    ]);
                  }
                }}
                className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${triadActive ? 'text-emerald-500/40 cursor-default' : 'text-emerald-500 hover:text-emerald-400'}`}
              >
                {triadActive ? '[ SESSION_ACTIVE ]' : '[ ACTIVATE_TRIAD ]'}
              </button>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="bg-[#050505] border border-[#1A1A1A] rounded-lg p-4 font-mono text-[10px] space-y-1 h-32 overflow-y-auto">
            {terminalLogs.map((log, i) => (
              <div key={i} className={log.includes('SIGNED_IN') ? 'text-emerald-500' : 'text-[#444]'}>
                {log}
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <section>
            <StatsVisualizer bugs={bugs} />
          </section>

          {/* Bug Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredBugs.map((bug) => (
              <BugCard 
                key={bug.id} 
                bug={bug} 
                onClick={(b) => setSelectedBug(b)} 
              />
            ))}
          </section>
        </div>
      </main>

      {/* Detail Modal / Slide-over */}
      <AnimatePresence>
        {selectedBug && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBug(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-[#0F0F0F] border-l border-[#222] z-[70] shadow-2xl p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-xs text-[#666]">{selectedBug.id}</span>
                <button 
                  onClick={() => setSelectedBug(null)}
                  className="text-[#444] hover:text-white transition-colors"
                >
                  [ CLOSE ]
                </button>
              </div>

              <h2 className="text-2xl font-medium mb-4">{selectedBug.title}</h2>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="px-3 py-1 bg-[#1A1A1A] border border-[#333] rounded text-[10px] font-mono uppercase text-[#888]">
                  Status: <span className="text-white">{selectedBug.status}</span>
                </div>
                <div className="px-3 py-1 bg-[#1A1A1A] border border-[#333] rounded text-[10px] font-mono uppercase text-[#888]">
                  Priority: <span className="text-white">{selectedBug.priority}</span>
                </div>
                <div className="px-3 py-1 bg-[#1A1A1A] border border-[#333] rounded text-[10px] font-mono uppercase text-[#888]">
                  Category: <span className="text-white">{selectedBug.category}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-mono text-[#444] uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-sm text-[#AAA] leading-relaxed">{selectedBug.description}</p>
                </div>

                {/* AI Analysis Section */}
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">AI Intelligence Report</h4>
                  </div>

                  {selectedBug.aiAnalysis ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-mono text-emerald-500/60 uppercase mb-1">Executive Summary</p>
                        <p className="text-sm text-emerald-100">{selectedBug.aiAnalysis.summary}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-emerald-500/60 uppercase mb-1">Suggested Priority</p>
                        <p className="text-sm text-emerald-100">{selectedBug.aiAnalysis.suggestedPriority}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-emerald-500/60 uppercase mb-1">Recommended Fix</p>
                        <div className="bg-black/40 p-4 rounded-lg border border-emerald-500/10 mt-2">
                          <code className="text-xs text-emerald-300 font-mono">
                            {selectedBug.aiAnalysis.possibleFix}
                          </code>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-xs text-emerald-500/60 mb-4">No analysis data found for this incident.</p>
                      <button 
                        onClick={() => handleAnalyze(selectedBug)}
                        disabled={isAnalyzing}
                        className="bg-emerald-500 text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50"
                      >
                        {isAnalyzing ? 'Processing...' : 'Run Analysis'}
                      </button>
                    </div>
                  )}

                  {/* Decorative background icon */}
                  <Brain className="absolute -right-8 -bottom-8 w-32 h-32 text-emerald-500/5 rotate-12" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;


