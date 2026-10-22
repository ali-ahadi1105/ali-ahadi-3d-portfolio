import { useState } from 'react'
import { Play, Check, ShieldCheck, Database, Server, Cpu, HardDrive } from 'lucide-react'
import { sfx } from '../../../utils/audio'

export function ArchitectureWindow() {
  const [simStep, setSimStep] = useState<number>(-1)
  const [isSimulating, setIsSimulating] = useState(false)

  const steps = [
    {
      id: 'client',
      title: '1. Client Verification Request',
      tech: 'REST / HTTPS',
      icon: <Server className="w-4 h-4 text-sky-600" />,
      detail: '7k-9k daily users submit registration credentials and signature images for certificate issuance.'
    },
    {
      id: 'ra-core',
      title: '2. RA Core Pipeline (Node.js/TS)',
      tech: 'Custom Node.js Framework',
      icon: <Cpu className="w-4 h-4 text-emerald-600" />,
      detail: 'Handles identity proofing, business validation rules, and transaction coordination with zero downtime.'
    },
    {
      id: 'redis',
      title: '3. Redis Staging & Shared State',
      tech: 'In-Memory Key/Value',
      icon: <Database className="w-4 h-4 text-red-600" />,
      detail: 'Stores signature image buffers in-memory before asynchronous persistent filesystem write; syncs sessions across load-balanced pods.'
    },
    {
      id: 'ca',
      title: '4. Certificate Authority (CA) Delegation',
      tech: 'Cryptographic Signing RPC',
      icon: <ShieldCheck className="w-4 h-4 text-purple-600" />,
      detail: 'Secure handshake with CA to issue X.509 digital certificates and bind public keys.'
    },
    {
      id: 'observability',
      title: '5. Telemetry & Log Ingestion',
      tech: 'OpenSearch & SigNoz',
      icon: <HardDrive className="w-4 h-4 text-amber-600" />,
      detail: 'Distributed APM trace recorded, latency measured (14ms), and error rates monitored on custom dashboards.'
    }
  ]

  const runSimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    setSimStep(0)
    sfx.playClick()

    let current = 0
    const timer = setInterval(() => {
      current++
      if (current < steps.length) {
        setSimStep(current)
        sfx.playTerminalKey()
      } else {
        clearInterval(timer)
        setIsSimulating(false)
        sfx.playSuccess()
      }
    }, 700)
  }

  return (
    <div className="space-y-6 text-slate-800">
      {/* Intro & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-900 font-mono text-sm">
            PKI Registration Authority & Redis Staging Architecture
          </h3>
          <p className="text-slate-500 text-xs mt-0.5">
            Designed for 7,000–9,000 daily users with cryptographic certificate issuance.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isSimulating}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all shadow-sm ${
            isSimulating
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {isSimulating ? 'Processing Transaction...' : 'Simulate Certificate Issuance'}
        </button>
      </div>

      {/* Step by Step Interactive Flow */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isActive = simStep === idx
          const isPassed = simStep > idx || simStep === steps.length - 1

          return (
            <div
              key={step.id}
              className={`p-4 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? 'bg-sky-50 border-sky-400 shadow-md scale-[1.01]'
                  : isPassed
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">{step.icon}</div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 font-mono">
                      {step.title}
                    </h4>
                    <span className="text-[11px] text-sky-700 font-mono font-medium">{step.tech}</span>
                  </div>
                </div>

                {isPassed && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 font-mono bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3.5 h-3.5" /> OK
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-600 pl-11 leading-relaxed">
                {step.detail}
              </p>
            </div>
          )
        })}
      </div>

      {/* Key Architectural Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <h5 className="font-bold text-red-700 font-mono flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" /> Redis As Staging Layer
          </h5>
          <p className="text-slate-600 leading-relaxed">
            User signature images can create filesystem I/O bottlenecks. Redis serves as an ephemeral fast staging buffer, decoupling ingestion from slow persistent storage.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
          <h5 className="font-bold text-amber-700 font-mono flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5" /> Observability Triad
          </h5>
          <p className="text-slate-600 leading-relaxed">
            OpenSearch for log aggregation and SigNoz for distributed tracing ensure any latency spikes in the CA or RA nodes are immediately isolated.
          </p>
        </div>
      </div>
    </div>
  )
}
