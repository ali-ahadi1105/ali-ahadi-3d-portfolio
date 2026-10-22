import React, { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { CornerDownLeft, Sparkles } from 'lucide-react'
import { RESUME_DATA } from '../../../data/resumeData'
import { sfx } from '../../../utils/audio'

interface HistoryEntry {
  command: string
  output: React.ReactNode
}

export function TerminalWindow() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'sysinfo --verbose',
      output: (
        <div className="space-y-1 text-slate-700">
          <p className="text-sky-700 font-bold">
            ⚡ Welcome to Ali Ahadi's Backend Shell v3.4.0 (Node.js / PKI Cluster)
          </p>
          <p className="text-slate-500 text-xs">
            System: Production RA Node (7k–9k daily users) | Redis Cache: Connected | CA: TLS 1.3
          </p>
          <p className="text-emerald-700 text-xs">
            Type <span className="text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded font-mono font-semibold">help</span> or click command buttons below to interact.
          </p>
        </div>
      )
    }
  ])
  const [commandIndex, setCommandIndex] = useState<number>(-1)
  const [pastCommands, setPastCommands] = useState<string[]>(['sysinfo --verbose'])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const executeCommand = (cmdText: string) => {
    const rawCmd = cmdText.trim()
    if (!rawCmd) return

    sfx.playClick()
    const lower = rawCmd.toLowerCase()
    let output: React.ReactNode = null

    setPastCommands((prev) => [...prev, rawCmd])
    setCommandIndex(-1)

    if (lower === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    switch (lower) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-slate-700 py-1">
            <p className="text-sky-800 font-semibold text-xs">Available Shell Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs font-mono">
              <div><span className="text-emerald-700 font-semibold">whoami / summary</span> - Background overview</div>
              <div><span className="text-emerald-700 font-semibold">skills</span> - Technical capabilities</div>
              <div><span className="text-emerald-700 font-semibold">exp / work</span> - Production role at Part Group</div>
              <div><span className="text-emerald-700 font-semibold">pki-status</span> - PKI & CA architecture details</div>
              <div><span className="text-emerald-700 font-semibold">redis-stats</span> - Redis staging & session role</div>
              <div><span className="text-emerald-700 font-semibold">ai-agents</span> - Google ADK & MCP engineering</div>
              <div><span className="text-emerald-700 font-semibold">contact</span> - Email, LinkedIn, GitHub, Phone</div>
              <div><span className="text-emerald-700 font-semibold">curl /cert</span> - Test certificate issuance API</div>
              <div><span className="text-purple-700 font-semibold">sudo hire ali</span> - Executive recruitment offer</div>
              <div><span className="text-slate-500 font-semibold">clear</span> - Flush terminal view</div>
            </div>
          </div>
        )
        break

      case 'whoami':
      case 'summary':
        output = (
          <div className="space-y-2 py-1 text-slate-800">
            <p className="text-sky-800 font-bold">{RESUME_DATA.personal.name} — {RESUME_DATA.personal.role}</p>
            <p className="text-slate-600 leading-relaxed text-xs">{RESUME_DATA.summary}</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>📍 {RESUME_DATA.personal.location}</span>
              <span>🎓 {RESUME_DATA.personal.education.degree} ({RESUME_DATA.personal.education.year})</span>
            </div>
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="space-y-2 py-1">
            {RESUME_DATA.skillCategories.map((cat, idx) => (
              <div key={idx} className="border-l-2 border-sky-500 pl-2 text-xs">
                <span className="text-sky-800 font-semibold">{cat.title}: </span>
                <span className="text-slate-700">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        )
        break

      case 'exp':
      case 'experience':
      case 'work':
        output = (
          <div className="space-y-2 py-1">
            {RESUME_DATA.experience.map((exp, i) => (
              <div key={i} className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between items-center text-sky-800 font-semibold text-xs">
                  <span>{exp.role} @ {exp.company}</span>
                  <span className="text-slate-500 text-xs">{exp.period}</span>
                </div>
                <p className="text-emerald-700 text-xs font-medium">⚡ Metric: {exp.metrics}</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700 text-xs">
                  {exp.highlights.slice(0, 4).map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
        break

      case 'pki':
      case 'pki-status':
        output = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-emerald-700 font-bold">🔐 PKI Registration Authority (RA) System Report:</p>
            <p className="text-slate-700">
              • Target Load: <strong>7,000–9,000 Daily Active Users</strong> across Iran.
            </p>
            <p className="text-slate-700">
              • Lifecycle: User Verification → Identity Proofing → Redis Staging → CA Delegation → X.509 Issuance.
            </p>
            <p className="text-slate-700">
              • Core Stack: Node.js & TypeScript custom framework, Mocha automated testing, Linux, Bash CI/CD.
            </p>
          </div>
        )
        break

      case 'redis':
      case 'redis-stats':
        output = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-red-700 font-bold">🔴 Redis Staging & In-Memory Role:</p>
            <p className="text-slate-700">
              1. <strong>Session Management:</strong> Synchronizing authentication & verification state across load-balanced instances.
            </p>
            <p className="text-slate-700">
              2. <strong>Signature Staging Layer:</strong> Storing high-volume user signature image buffers in-memory before asynchronous disk persistence.
            </p>
            <p className="text-slate-700">
              3. <strong>Cache Hit Ratio:</strong> 99.4% with near-zero latency degradation.
            </p>
          </div>
        )
        break

      case 'ai':
      case 'ai-agents':
        output = (
          <div className="space-y-1.5 py-1 text-xs">
            <p className="text-purple-700 font-bold">🤖 AI & Agentic Systems Architecture:</p>
            <p className="text-slate-700">• <strong>Google ADK:</strong> Building declarative reasoning loops & agent workflows.</p>
            <p className="text-slate-700">• <strong>Model Context Protocol (MCP):</strong> Standardized integration between LLMs and external backend APIs/DBs.</p>
            <p className="text-slate-700">• <strong>RAG & Function Calling:</strong> Real-time schema execution, embeddings, and context retrieval.</p>
          </div>
        )
        break

      case 'contact':
        output = (
          <div className="space-y-1.5 py-1 text-xs text-slate-700">
            <p className="text-sky-800 font-bold">Direct Channels for Ali Ahadi:</p>
            <p>📧 Email: <a href={`mailto:${RESUME_DATA.personal.email}`} className="text-sky-700 underline font-medium">{RESUME_DATA.personal.email}</a></p>
            <p>📱 Phone: <span className="text-emerald-700 font-medium">{RESUME_DATA.personal.phone}</span></p>
            <p>💼 LinkedIn: <a href={RESUME_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-sky-700 underline font-medium">{RESUME_DATA.personal.linkedinHandle}</a></p>
            <p>🐙 GitHub: <a href={RESUME_DATA.personal.github} target="_blank" rel="noreferrer" className="text-sky-700 underline font-medium">{RESUME_DATA.personal.githubHandle}</a></p>
          </div>
        )
        break

      case 'curl /cert':
      case 'curl /api/v1/cert':
        output = (
          <pre className="text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs font-mono overflow-x-auto shadow-inner">
{`HTTP/1.1 200 OK
Content-Type: application/json
X-System: PKI-RA-Service
X-Redis-Cache: HIT (2ms)

{
  "status": "ISSUED",
  "certificate_id": "cert_${Math.random().toString(36).substring(2, 9)}",
  "subject": "CN=Ali Ahadi Verification Node",
  "issuer": "Internal Root CA Services",
  "validity_days": 365,
  "algorithm": "SHA256withRSA",
  "daily_quota_remaining": 8840
}`}
          </pre>
        )
        break

      case 'sudo hire ali':
      case 'hire':
        sfx.playSuccess()
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          })
        } catch {
          // ignore
        }
        output = (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl text-emerald-900 space-y-1 shadow-sm">
            <p className="font-bold flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-emerald-600" /> [SUCCESS] CANDIDATE SHORTLISTED!
            </p>
            <p className="text-xs">
              Ali Ahadi brings 3 years of enterprise PKI, high-throughput Redis staging, and microservices reliability to your engineering team.
            </p>
            <p className="text-xs font-semibold">
              Reach out now: <a href="mailto:aliahadi.f1105@gmail.com" className="text-sky-700 underline">aliahadi.f1105@gmail.com</a> / 09031583914
            </p>
          </div>
        )
        break

      default:
        output = (
          <div className="text-red-600 text-xs">
            command not found: {rawCmd}. Type <span className="text-sky-700 font-bold">help</span> to list commands.
          </div>
        )
        break
    }

    setHistory((prev) => [...prev, { command: rawCmd, output }])
    setInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sfx.playTerminalKey()
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (pastCommands.length > 0) {
        const nextIdx = commandIndex === -1 ? pastCommands.length - 1 : Math.max(0, commandIndex - 1)
        setCommandIndex(nextIdx)
        setInput(pastCommands[nextIdx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (commandIndex !== -1) {
        const nextIdx = commandIndex + 1
        if (nextIdx < pastCommands.length) {
          setCommandIndex(nextIdx)
          setInput(pastCommands[nextIdx])
        } else {
          setCommandIndex(-1)
          setInput('')
        }
      }
    }
  }

  const quickChips = [
    'whoami',
    'skills',
    'exp',
    'pki-status',
    'redis-stats',
    'ai-agents',
    'curl /cert',
    'sudo hire ali'
  ]

  return (
    <div className="flex flex-col h-full space-y-3 text-slate-800">
      {/* Quick Click Command Tags */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-200 text-xs">
        <span className="text-slate-400 font-mono text-[11px]">Quick Run:</span>
        {quickChips.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="px-2.5 py-0.5 rounded-lg bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-800 transition-all font-mono text-xs shadow-2xs"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal History */}
      <div className="space-y-3 flex-1 min-h-[220px]">
        {history.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-sky-800 font-semibold text-xs font-mono">
              <span className="text-slate-400">ali@ra-core:~$</span>
              <span>{entry.command}</span>
            </div>
            <div className="pl-3 border-l-2 border-slate-200">{entry.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Line */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-slate-200">
        <span className="text-emerald-700 font-mono font-bold text-xs whitespace-nowrap">
          ali@ra-core:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help' or any command..."
          className="flex-1 bg-transparent border-none outline-none text-slate-900 font-mono text-xs focus:ring-0 placeholder-slate-400"
          autoFocus
        />
        <button
          type="submit"
          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-700 hover:bg-slate-100 transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  )
}
