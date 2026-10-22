import { useState } from 'react'
import { Sparkles, Bot, Terminal, Code2, ArrowRight } from 'lucide-react'
import { RESUME_DATA } from '../../../data/resumeData'
import { sfx } from '../../../utils/audio'

export function AiAgentsWindow() {
  const [selectedTool, setSelectedTool] = useState<'mcp_pki' | 'mcp_redis'>('mcp_pki')
  const [toolOutput, setToolOutput] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleRunTool = () => {
    setIsRunning(true)
    sfx.playClick()
    setToolOutput(null)

    setTimeout(() => {
      sfx.playSuccess()
      setIsRunning(false)
      if (selectedTool === 'mcp_pki') {
        setToolOutput(
          JSON.stringify(
            {
              tool: 'mcp_issue_certificate',
              status: 'success',
              result: {
                dn: 'CN=User-0912, O=Production PKI',
                serial: '4E:8A:12:F9:3B',
                valid_until: '2027-10-22',
                agent_action: 'Verified against RA guidelines before issuance'
              }
            },
            null,
            2
          )
        )
      } else {
        setToolOutput(
          JSON.stringify(
            {
              tool: 'mcp_query_redis_state',
              status: 'success',
              result: {
                key: 'session:auth:token_7721',
                ttl: 3600,
                staging_status: 'signature_persisted_to_disk',
                cluster_node: 'redis-replica-02'
              }
            },
            null,
            2
          )
        )
      }
    }, 600)
  }

  return (
    <div className="space-y-6 text-slate-800">
      {/* Overview */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-purple-600" />
          <h2 className="text-base font-bold text-slate-900 font-mono">
            {RESUME_DATA.aiSystems.title}
          </h2>
        </div>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {RESUME_DATA.aiSystems.summary}
        </p>
      </div>

      {/* Core Capabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {RESUME_DATA.aiSystems.capabilities.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1.5"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-purple-700">
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>{item.title}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Interactive MCP / Tool Calling Sandbox */}
      <div className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800">
            <Terminal className="w-4 h-4 text-purple-600" />
            <span>Interactive MCP Tool Calling Demo</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTool('mcp_pki')}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                selectedTool === 'mcp_pki'
                  ? 'bg-purple-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              mcp_issue_certificate
            </button>
            <button
              onClick={() => setSelectedTool('mcp_redis')}
              className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                selectedTool === 'mcp_redis'
                  ? 'bg-purple-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              mcp_query_redis_state
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="text-xs text-slate-500 font-mono">
            Execute model tool invocation over Model Context Protocol:
          </span>
          <button
            onClick={handleRunTool}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-semibold shadow-sm transition-all"
          >
            <span>Invoke Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Output Console (Clean Light Code Box) */}
        {toolOutput && (
          <div className="pt-2">
            <div className="text-[11px] text-slate-500 font-mono mb-1 flex items-center gap-1">
              <Code2 className="w-3 h-3 text-purple-600" />
              <span>MCP Protocol Response Payload:</span>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-purple-300 font-mono text-xs overflow-x-auto shadow-inner">
              {toolOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
