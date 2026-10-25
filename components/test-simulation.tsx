'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Add01Icon,
  ArrowDown01Icon,
  BookOpen01Icon,
  CheckmarkCircle02Icon,
  CloudUploadIcon,
  DashboardSquare01Icon,
  Delete02Icon,
  File01Icon,
  FilterIcon,
  HelpCircleIcon,
  MoreHorizontalIcon,
  Search01Icon,
  Settings01Icon,
  SparklesIcon,
  Target02Icon,
  Upload04Icon,
  UserCircleIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

type QuestionType = 'Multiple choice' | 'True / false' | 'Multi-select'

type Question = {
  id: string
  title: string
  category: string
  type: QuestionType
  difficulty: 'Easy' | 'Medium' | 'Hard'
  used: number
  media?: boolean
}

const questions: Question[] = [
  { id: 'Q-1042', title: 'Which principle ensures a class has only one reason to change?', category: 'Software Engineering', type: 'Multiple choice', difficulty: 'Medium', used: 12 },
  { id: 'Q-1041', title: 'HTTPS encrypts data in transit between client and server.', category: 'Web Security', type: 'True / false', difficulty: 'Easy', used: 8 },
  { id: 'Q-1039', title: 'Select the valid normalization forms for relational databases.', category: 'Database', type: 'Multi-select', difficulty: 'Hard', used: 5, media: true },
  { id: 'Q-1038', title: 'What does the acronym REST stand for?', category: 'Web Development', type: 'Multiple choice', difficulty: 'Easy', used: 21 },
]

const nav = [
  { label: 'Overview', icon: DashboardSquare01Icon },
  { label: 'Test builder', icon: File01Icon },
  { label: 'Question bank', icon: BookOpen01Icon },
]

function Icon({ icon, size = 18 }: { icon: typeof DashboardSquare01Icon; size?: number }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.7} />
}

export function TestSimulation() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [showImporter, setShowImporter] = useState(false)
  const [imported, setImported] = useState(false)

  const filteredQuestions = useMemo(() => questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query.toLowerCase()) || question.id.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All categories' || question.category === category
    return matchesQuery && matchesCategory
  }), [query, category])

  const view = activeNav === 'Question bank' ? 'bank' : activeNav === 'Test builder' ? 'builder' : 'overview'

  return (
    <main className="min-h-screen bg-[#0b0d10] text-[#edf0f2]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[244px] shrink-0 border-r border-white/[0.07] bg-[#0d0f12] p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-2.5 px-2 pb-10">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#d7f36b] text-[#10130c]"><Icon icon={Target02Icon} size={19} /></div>
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Simulab</span>
          </div>
          <p className="px-2 pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#737b83]">Workspace</p>
          <nav className="space-y-1">
            {nav.map((item) => (
              <button key={item.label} onClick={() => setActiveNav(item.label)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${activeNav === item.label ? 'bg-white/[0.08] text-white' : 'text-[#828a93] hover:bg-white/[0.04] hover:text-white'}`}>
                <Icon icon={item.icon} size={17} />{item.label}
                {item.label === 'Question bank' && <span className="ml-auto text-[11px] text-[#686f77]">128</span>}
              </button>
            ))}
          </nav>
          <div className="mt-8 border-t border-white/[0.07] pt-7">
            <p className="px-2 pb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#737b83]">Manage</p>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-[#828a93] hover:bg-white/[0.04] hover:text-white"><Icon icon={Settings01Icon} size={17} />Settings</button>
          </div>
          <div className="mt-auto rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5">
            <div className="mb-2 flex items-center gap-2"><SparkleIcon /><span className="text-xs font-medium">Pro workspace</span></div>
            <p className="mb-3 text-[11px] leading-relaxed text-[#858d95]">Unlimited tests and advanced analytics.</p>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full w-[68%] rounded-full bg-[#d7f36b]" /></div>
            <p className="mt-2 text-[10px] text-[#697179]">68% of monthly storage used</p>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="flex h-[72px] items-center justify-between border-b border-white/[0.07] px-5 sm:px-8">
            <div className="flex items-center gap-3 lg:hidden"><div className="flex size-8 items-center justify-center rounded-lg bg-[#d7f36b] text-[#10130c]"><Icon icon={Target02Icon} size={19} /></div><span className="font-semibold">Simulab</span></div>
            <div className="hidden text-sm text-[#7c858e] lg:block">{activeNav === 'Overview' ? 'Good morning, Alex' : activeNav}</div>
            <div className="flex items-center gap-4"><button className="text-[#8a929a] hover:text-white"><Icon icon={HelpCircleIcon} /></button><div className="h-5 w-px bg-white/[0.1]" /><div className="flex items-center gap-2"><div className="flex size-7 items-center justify-center rounded-full bg-[#29332b] text-[#d7f36b]"><Icon icon={UserCircleIcon} size={17} /></div><span className="hidden text-xs text-[#c4c9ce] sm:block">Alex Morgan</span><Icon icon={ArrowDown01Icon} size={14} /></div></div>
          </header>

          <div className="mx-auto max-w-[1220px] p-5 sm:p-8">
            {view === 'overview' && <Overview onImport={() => setShowImporter(true)} onNavigate={setActiveNav} />}
            {view === 'builder' && <Builder />}
            {view === 'bank' && <Bank query={query} setQuery={setQuery} category={category} setCategory={setCategory} questions={filteredQuestions} onImport={() => setShowImporter(true)} />}
          </div>
        </section>
      </div>

      {showImporter && <Importer imported={imported} setImported={setImported} onClose={() => { setShowImporter(false); setImported(false) }} />}
    </main>
  )
}

function SparkleIcon() { return <Icon icon={SparklesIcon} size={15} /> }

function Overview({ onImport, onNavigate }: { onImport: () => void; onNavigate: (nav: string) => void }) {
  return <div>
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#8a949c]">Tuesday, October 25, 2026</p><h1 className="text-2xl font-semibold tracking-[-0.035em] sm:text-[30px]">Your testing workspace</h1><p className="mt-2 text-sm text-[#858e96]">Create focused assessments from your question bank.</p></div><Button onClick={onImport} className="h-10 gap-2 bg-[#d7f36b] px-4 text-xs font-semibold text-[#151a10] hover:bg-[#c9e95b]"><Icon icon={CloudUploadIcon} size={16} />Import questions</Button></div>
    <div className="grid gap-3 sm:grid-cols-3"><Stat label="Question bank" value="128" detail="+16 this month" icon={BookOpen01Icon} /><Stat label="Active tests" value="07" detail="3 scheduled this week" icon={File01Icon} /><Stat label="Avg. completion" value="84%" detail="+6.2% from last month" icon={Target02Icon} /></div>
    <div className="mt-8 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
      <section className="rounded-xl border border-white/[0.08] bg-[#111419] p-5 sm:p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-sm font-semibold">Recent tests</h2><p className="mt-1 text-xs text-[#7d868e]">Monitor performance across your assessments.</p></div><button onClick={() => onNavigate('Test builder')} className="text-xs text-[#d7f36b] hover:underline">View all</button></div><div className="space-y-1">{[['Frontend Fundamentals','24 questions','92%','Completed'],['Security Essentials','18 questions','76%','In progress'],['SQL Proficiency Check','30 questions','—','Draft']].map(([name, count, score, status]) => <div key={name} className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 hover:bg-white/[0.035]"><div className="flex min-w-0 items-center gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-[#99a2aa]"><Icon icon={File01Icon} size={16} /></div><div className="min-w-0"><p className="truncate text-xs font-medium">{name}</p><p className="mt-1 text-[11px] text-[#747d85]">{count}</p></div></div><div className="flex items-center gap-4"><span className={`hidden text-[11px] sm:block ${status === 'Completed' ? 'text-[#b6c77a]' : status === 'In progress' ? 'text-[#d3a76c]' : 'text-[#757e86]'}`}>{status}</span><span className="w-8 text-right text-xs font-medium text-[#c7cdd1]">{score}</span><Icon icon={MoreHorizontalIcon} size={16} /></div></div>)}</div></section>
      <section className="rounded-xl border border-white/[0.08] bg-[#111419] p-5 sm:p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-sm font-semibold">Question distribution</h2><p className="mt-1 text-xs text-[#7d868e]">By question type in your bank.</p></div><Icon icon={MoreHorizontalIcon} size={17} /></div><div className="flex items-center gap-6"><div className="relative flex size-[118px] shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(#d7f36b 0 52%, #7790a5 52% 77%, #49545f 77% 100%)' }}><div className="flex size-[88px] flex-col items-center justify-center rounded-full bg-[#111419]"><span className="text-xl font-semibold">128</span><span className="text-[10px] text-[#768089]">questions</span></div></div><div className="space-y-3 text-xs">{[['#d7f36b','Multiple choice','67'],['#7790a5','True / false','32'],['#49545f','Multi-select','29']].map(([color, label, value]) => <div key={label} className="flex items-center gap-2"><span className="size-2 rounded-full" style={{ backgroundColor: color }} /><span className="text-[#99a1a9]">{label}</span><span className="ml-auto pl-3 font-medium text-[#e1e5e7]">{value}</span></div>)}</div></div><div className="mt-7 border-t border-white/[0.07] pt-4"><button onClick={() => onNavigate('Question bank')} className="flex w-full items-center justify-between text-xs text-[#aab2b8] hover:text-white">Browse question bank <span className="text-[#d7f36b]">→</span></button></div></section>
    </div>
  </div>
}

function Stat({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: typeof BookOpen01Icon }) { return <div className="rounded-xl border border-white/[0.08] bg-[#111419] p-5"><div className="flex items-start justify-between"><p className="text-xs text-[#808991]">{label}</p><Icon icon={icon} size={17} /></div><p className="mt-4 text-[27px] font-semibold tracking-[-0.04em]">{value}</p><p className="mt-1 text-[11px] text-[#9ca66e]">{detail}</p></div> }

function Builder() { return <div><div className="mb-8"><p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#8a949c]">Test builder</p><h1 className="text-2xl font-semibold tracking-[-0.035em]">Create an assessment</h1><p className="mt-2 text-sm text-[#858e96]">Build from a complete import or compose one from your bank.</p></div><div className="grid gap-4 md:grid-cols-2"><button className="group rounded-xl border border-white/[0.08] bg-[#111419] p-6 text-left transition-colors hover:border-[#d7f36b]/40"><div className="mb-12 flex size-10 items-center justify-center rounded-lg bg-[#d7f36b]/10 text-[#d7f36b]"><Icon icon={File01Icon} /></div><h2 className="text-sm font-semibold">Start from question bank</h2><p className="mt-2 text-xs leading-relaxed text-[#818a92]">Select categories, difficulty, and question types to generate a focused test.</p><span className="mt-5 inline-flex items-center gap-2 text-xs text-[#d7f36b]">Configure test <span>→</span></span></button><button className="group rounded-xl border border-white/[0.08] bg-[#111419] p-6 text-left transition-colors hover:border-[#d7f36b]/40"><div className="mb-12 flex size-10 items-center justify-center rounded-lg bg-[#7790a5]/10 text-[#93abc0]"><Icon icon={CloudUploadIcon} /></div><h2 className="text-sm font-semibold">Import a complete test</h2><p className="mt-2 text-xs leading-relaxed text-[#818a92]">Upload JSON, CSV, or QTI files with questions and answer keys.</p><span className="mt-5 inline-flex items-center gap-2 text-xs text-[#d7f36b]">Upload file <span>→</span></span></button></div><div className="mt-6 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.015] p-5"><div className="flex gap-3"><Icon icon={HelpCircleIcon} size={17} /><div><p className="text-xs font-medium">How question selection works</p><p className="mt-1 text-[11px] leading-relaxed text-[#78818a]">Set a category and target count. Simulab will select a balanced mix of available question types and difficulty levels.</p></div></div></div></div> }

function Bank({ query, setQuery, category, setCategory, questions, onImport }: { query: string; setQuery: (value: string) => void; category: string; setCategory: (value: string) => void; questions: Question[]; onImport: () => void }) { return <div><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-[#8a949c]">Content library</p><h1 className="text-2xl font-semibold tracking-[-0.035em]">Question bank</h1><p className="mt-2 text-sm text-[#858e96]">128 questions across 12 categories.</p></div><div className="flex gap-2"><Button onClick={onImport} variant="outline" className="h-9 gap-2 border-white/[0.1] bg-transparent text-xs"><Icon icon={Upload04Icon} size={15} />Import</Button><Button className="h-9 gap-2 bg-[#d7f36b] text-xs font-semibold text-[#151a10] hover:bg-[#c9e95b]"><Icon icon={Add01Icon} size={15} />Add question</Button></div></div><div className="mb-4 flex flex-col gap-2 sm:flex-row"><div className="relative flex-1"><Icon icon={Search01Icon} size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions or IDs..." className="h-10 w-full rounded-lg border border-white/[0.09] bg-[#111419] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#626a72] focus:border-[#d7f36b]/50" /></div><div className="relative"><Icon icon={FilterIcon} size={15} /><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 w-full appearance-none rounded-lg border border-white/[0.09] bg-[#111419] px-9 pr-8 text-xs text-[#aab1b7] outline-none sm:w-[180px]"><option>All categories</option><option>Software Engineering</option><option>Web Security</option><option>Database</option><option>Web Development</option></select><Icon icon={ArrowDown01Icon} size={14} /></div></div><div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111419]"><div className="hidden grid-cols-[1fr_165px_145px_85px_40px] gap-4 border-b border-white/[0.07] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#69727a] sm:grid"><span>Question</span><span>Category</span><span>Type</span><span>Usage</span><span /></div>{questions.map((question) => <div key={question.id} className="grid gap-3 border-b border-white/[0.06] px-5 py-4 last:border-0 sm:grid-cols-[1fr_165px_145px_85px_40px] sm:items-center sm:gap-4"><div className="flex min-w-0 items-start gap-3"><div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[10px] text-[#87919a]">{question.id.slice(2)}</div><div className="min-w-0"><p className="text-xs leading-relaxed text-[#dce1e4]">{question.title}</p><div className="mt-2 flex gap-2 text-[10px] text-[#727b83]"><span>{question.id}</span>{question.media && <span className="text-[#aebd71]">• Media</span>}</div></div></div><span className="text-[11px] text-[#9099a1]">{question.category}</span><span className="text-[11px] text-[#9099a1]">{question.type}</span><span className="text-[11px] text-[#9099a1]">{question.used} tests</span><button className="text-[#737c84] hover:text-white"><Icon icon={MoreHorizontalIcon} size={16} /></button></div>)}{questions.length === 0 && <div className="p-10 text-center text-sm text-[#737c84]">No questions match your filters.</div>}</div></div> }

function Importer({ imported, setImported, onClose }: { imported: boolean; setImported: (value: boolean) => void; onClose: () => void }) { return <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="w-full max-w-[480px] rounded-2xl border border-white/[0.1] bg-[#15181d] p-6 shadow-2xl"><div className="mb-6 flex items-start justify-between"><div><h2 className="text-base font-semibold">Import questions</h2><p className="mt-1 text-xs text-[#7f8890]">Upload a JSON, CSV, or QTI file.</p></div><button onClick={onClose} className="text-[#778089] hover:text-white"><Icon icon={Delete02Icon} size={17} /></button></div>{imported ? <div className="rounded-xl border border-[#b8cb71]/30 bg-[#b8cb71]/[0.08] p-5 text-center"><Icon icon={CheckmarkCircle02Icon} size={28} /><p className="mt-3 text-sm font-medium">Questions ready to import</p><p className="mt-1 text-xs text-[#9ca66e]">24 questions detected · 4 categories</p><Button onClick={onClose} className="mt-5 bg-[#d7f36b] text-xs font-semibold text-[#151a10] hover:bg-[#c9e95b]">Add to question bank</Button></div> : <><button onClick={() => setImported(true)} className="flex w-full flex-col items-center rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] px-5 py-10 transition-colors hover:border-[#d7f36b]/50 hover:bg-[#d7f36b]/[0.03]"><div className="flex size-10 items-center justify-center rounded-full bg-white/[0.07] text-[#aeb9c1]"><Icon icon={CloudUploadIcon} /></div><p className="mt-3 text-xs font-medium">Choose a file or drag it here</p><p className="mt-1 text-[11px] text-[#68727a]">JSON, CSV, QTI · up to 10 MB</p></button><div className="mt-5 flex items-start gap-2 text-[11px] leading-relaxed text-[#737c84]"><Icon icon={HelpCircleIcon} size={15} />Use our standard schema to preserve media, answer keys, categories, and explanations.</div></>}</div></div> }
