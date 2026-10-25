'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Add01Icon,
  ArrowDown01Icon,
  BookOpen01Icon,
  CheckmarkCircle02Icon,
  CloudUploadIcon,
  File01Icon,
  FilterIcon,
  Search01Icon,
  Target02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

type QuestionType = 'Multiple choice' | 'True / false' | 'Multi-select'
type Question = { id: string; title: string; category: string; type: QuestionType; media?: boolean }

const questions: Question[] = [
  { id: 'Q-1042', title: 'Which principle ensures a class has only one reason to change?', category: 'Software Engineering', type: 'Multiple choice' },
  { id: 'Q-1041', title: 'HTTPS encrypts data in transit between client and server.', category: 'Web Security', type: 'True / false' },
  { id: 'Q-1039', title: 'Select the valid normalization forms for relational databases.', category: 'Database', type: 'Multi-select', media: true },
  { id: 'Q-1038', title: 'What does the acronym REST stand for?', category: 'Web Development', type: 'Multiple choice' },
]

function Icon({ icon, size = 18 }: { icon: typeof Target02Icon; size?: number }) {
  return <HugeiconsIcon icon={icon} size={size} strokeWidth={1.7} />
}

export function TestSimulation() {
  const [section, setSection] = useState<'start' | 'bank'>('start')
  const [showImporter, setShowImporter] = useState(false)
  const [imported, setImported] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')

  const filteredQuestions = useMemo(() => questions.filter((question) => {
    const text = `${question.title} ${question.id}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (category === 'All categories' || question.category === category)
  }), [query, category])

  return (
    <main className="min-h-screen bg-[#0b0d10] px-5 py-8 text-[#edf0f2] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[900px]">
        <header className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[#d7f36b] text-[#10130c]"><Icon icon={Target02Icon} size={19} /></div>
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Simulab</span>
          </div>
          <Button onClick={() => setShowImporter(true)} variant="outline" className="h-9 gap-2 border-white/[0.12] bg-transparent text-xs text-[#cbd1d5] hover:bg-white/[0.06] hover:text-white"><Icon icon={CloudUploadIcon} size={15} />Import file</Button>
        </header>

        <nav className="mb-10 flex gap-1 border-b border-white/[0.08]">
          {([['start', 'Create test'], ['bank', 'Question bank']] as const).map(([value, label]) => (
            <button key={value} onClick={() => setSection(value)} className={`border-b-2 px-3 pb-3 text-xs font-medium transition-colors ${section === value ? 'border-[#d7f36b] text-white' : 'border-transparent text-[#737c84] hover:text-white'}`}>{label}</button>
          ))}
        </nav>

        {section === 'start' ? <CreateTest onImport={() => setShowImporter(true)} onBrowse={() => setSection('bank')} /> : <QuestionBank query={query} setQuery={setQuery} category={category} setCategory={setCategory} questions={filteredQuestions} />}
      </div>
      {showImporter && <Importer imported={imported} setImported={setImported} onClose={() => { setShowImporter(false); setImported(false) }} />}
    </main>
  )
}

function CreateTest({ onImport, onBrowse }: { onImport: () => void; onBrowse: () => void }) {
  return <section>
    <div className="mb-10 max-w-[600px]"><p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#8a949c]">Local test simulator</p><h1 className="text-3xl font-semibold tracking-[-0.045em] sm:text-[42px]">Create a test, simply.</h1><p className="mt-4 text-sm leading-relaxed text-[#858e96]">Import one complete test or pick questions from your bank by topic. No account, setup, or publishing required.</p></div>
    <div className="grid gap-4 sm:grid-cols-2">
      <button onClick={onImport} className="group rounded-xl border border-white/[0.1] bg-[#111419] p-6 text-left transition-colors hover:border-[#d7f36b]/50 hover:bg-[#15191d]"><div className="mb-12 flex size-10 items-center justify-center rounded-lg bg-[#d7f36b]/10 text-[#d7f36b]"><Icon icon={CloudUploadIcon} /></div><h2 className="text-sm font-semibold">Import a complete test</h2><p className="mt-2 text-xs leading-relaxed text-[#818a92]">Upload JSON, CSV, or QTI with questions, answers, categories, and media.</p><span className="mt-5 inline-flex text-xs text-[#d7f36b]">Choose file <span className="ml-2">→</span></span></button>
      <button onClick={onBrowse} className="group rounded-xl border border-white/[0.1] bg-[#111419] p-6 text-left transition-colors hover:border-[#d7f36b]/50 hover:bg-[#15191d]"><div className="mb-12 flex size-10 items-center justify-center rounded-lg bg-white/[0.06] text-[#aeb9c1]"><Icon icon={BookOpen01Icon} /></div><h2 className="text-sm font-semibold">Build from question bank</h2><p className="mt-2 text-xs leading-relaxed text-[#818a92]">Choose a topic and combine multiple choice, true/false, and multi-select questions.</p><span className="mt-5 inline-flex text-xs text-[#d7f36b]">Browse questions <span className="ml-2">→</span></span></button>
    </div>
    <div className="mt-8 flex items-start gap-3 rounded-lg border border-dashed border-white/[0.12] px-4 py-4 text-xs text-[#7f8890]"><Icon icon={File01Icon} size={16} /><p><span className="font-medium text-[#b9c0c5]">Supported format:</span> use the standard schema to preserve answer keys, topics, explanations, and image media.</p></div>
  </section>
}

function QuestionBank({ query, setQuery, category, setCategory, questions }: { query: string; setQuery: (value: string) => void; category: string; setCategory: (value: string) => void; questions: Question[] }) {
  return <section><div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[#8a949c]">4 sample questions</p><h1 className="text-3xl font-semibold tracking-[-0.04em]">Question bank</h1><p className="mt-2 text-sm text-[#858e96]">Filter by topic, then select questions for your test.</p></div><Button className="hidden h-9 gap-2 bg-[#d7f36b] text-xs font-semibold text-[#151a10] hover:bg-[#c9e95b] sm:flex"><Icon icon={Add01Icon} size={15} />Add question</Button></div><div className="mb-4 flex flex-col gap-2 sm:flex-row"><div className="relative flex-1"><Icon icon={Search01Icon} size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions..." className="h-10 w-full rounded-lg border border-white/[0.09] bg-[#111419] pl-9 pr-3 text-xs text-white outline-none placeholder:text-[#626a72] focus:border-[#d7f36b]/50" /></div><div className="relative"><Icon icon={FilterIcon} size={15} /><select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 w-full appearance-none rounded-lg border border-white/[0.09] bg-[#111419] px-9 pr-8 text-xs text-[#aab1b7] outline-none sm:w-[190px]"><option>All categories</option><option>Software Engineering</option><option>Web Security</option><option>Database</option><option>Web Development</option></select><Icon icon={ArrowDown01Icon} size={14} /></div></div><div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111419]">{questions.length ? questions.map((question) => <div key={question.id} className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 last:border-0"><div className="min-w-0"><div className="mb-2 flex items-center gap-2"><span className="font-mono text-[10px] text-[#6f7880]">{question.id}</span><span className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] text-[#9da6ad]">{question.type}</span>{question.media && <span className="text-[10px] text-[#b4c97a]">Media</span>}</div><p className="truncate text-xs font-medium text-[#e1e5e7]">{question.title}</p><p className="mt-1 text-[11px] text-[#747e86]">{question.category}</p></div><Button variant="outline" className="shrink-0 border-white/[0.1] bg-transparent text-[11px] text-[#aeb6bc]">Select</Button></div>) : <p className="px-5 py-10 text-center text-xs text-[#7f8890]">No questions found.</p>}</div></section>
}

function Importer({ imported, setImported, onClose }: { imported: boolean; setImported: (value: boolean) => void; onClose: () => void }) {
  return <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="w-full max-w-[460px] rounded-2xl border border-white/[0.1] bg-[#15181d] p-6 shadow-2xl"><div className="mb-6 flex items-start justify-between"><div><h2 className="text-base font-semibold">Import questions</h2><p className="mt-1 text-xs text-[#7f8890]">Upload a JSON, CSV, or QTI file.</p></div><button onClick={onClose} aria-label="Close importer" className="text-xl leading-none text-[#778089] hover:text-white">×</button></div>{imported ? <div className="rounded-xl border border-[#b8cb71]/30 bg-[#b8cb71]/[0.08] p-5 text-center"><div className="flex justify-center text-[#d7f36b]"><Icon icon={CheckmarkCircle02Icon} size={28} /></div><p className="mt-3 text-sm font-medium">Questions ready to import</p><p className="mt-1 text-xs text-[#9ca66e]">24 questions detected · 4 categories</p><Button onClick={onClose} className="mt-5 bg-[#d7f36b] text-xs font-semibold text-[#151a10] hover:bg-[#c9e95b]">Add to question bank</Button></div> : <><button onClick={() => setImported(true)} className="flex w-full flex-col items-center rounded-xl border border-dashed border-white/[0.15] bg-white/[0.02] px-5 py-10 transition-colors hover:border-[#d7f36b]/50 hover:bg-[#d7f36b]/[0.03]"><div className="flex size-10 items-center justify-center rounded-full bg-white/[0.07] text-[#aeb9c1]"><Icon icon={CloudUploadIcon} /></div><p className="mt-3 text-xs font-medium">Choose a file or drag it here</p><p className="mt-1 text-[11px] text-[#68727a]">JSON, CSV, QTI · up to 10 MB</p></button><p className="mt-5 text-[11px] leading-relaxed text-[#737c84]">The standard schema preserves media, answer keys, categories, and explanations.</p></>}</div></div>
}
