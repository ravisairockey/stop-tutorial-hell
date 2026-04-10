import { useState, useEffect, useRef, useCallback } from 'react';
import { TOPICS, Topic, Question } from './data/topics';

// ── Utility ────────────────────────────────────────────────────────────────
const cn = (...cls: (string | boolean | undefined)[]) => cls.filter(Boolean).join(' ');

// ── Sub-components ─────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className="copy-btn" onClick={copy}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

function CodeBlock({ code, lang = 'python' }: { code: string; lang?: string }) {
  return (
    <div className="code-block relative mt-3">
      <CopyButton text={code} />
      <div className="text-xs text-slate-500 mb-2 uppercase tracking-widest">{lang}</div>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
    </div>
  );
}

function HighlightBox({ type, children }: { type: 'info' | 'warn' | 'danger' | 'success'; children: React.ReactNode }) {
  const icons = { info: 'ℹ️', warn: '⚠️', danger: '🚨', success: '✅' };
  return (
    <div className={`highlight-box highlight-${type}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
}

// ── Binary Visualizer ───────────────────────────────────────────────────────
function BinaryVisualizer() {
  const [bits, setBits] = useState([0, 1, 0, 0, 1, 0, 0, 0]);
  const decimal = bits.reduce((acc, b, i) => acc + b * Math.pow(2, 7 - i), 0);
  const hex = decimal.toString(16).toUpperCase().padStart(2, '0');
  const ascii = decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : '—';

  const toggle = (i: number) => {
    const next = [...bits];
    next[i] = next[i] === 0 ? 1 : 0;
    setBits(next);
  };

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <div className="text-sm text-slate-400 mb-3">🎮 <span className="text-violet-400 font-semibold">Interactive Binary</span> — Click bits to toggle!</div>
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {bits.map((b, i) => (
          <div key={i} className="text-center">
            <div className="text-xs text-slate-500 mb-1">{Math.pow(2, 7 - i)}</div>
            <div
              className={`bit-cell ${b === 1 ? 'one' : 'zero'}`}
              onClick={() => toggle(i)}
            >{b}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 justify-center flex-wrap text-sm">
        <div className="text-center">
          <div className="text-slate-500 text-xs mb-1">Decimal</div>
          <div className="text-2xl font-bold neon-green">{decimal}</div>
        </div>
        <div className="text-center">
          <div className="text-slate-500 text-xs mb-1">Hex</div>
          <div className="text-2xl font-bold neon-blue">0x{hex}</div>
        </div>
        <div className="text-center">
          <div className="text-slate-500 text-xs mb-1">ASCII Char</div>
          <div className="text-2xl font-bold neon-pink">{ascii}</div>
        </div>
      </div>
    </div>
  );
}

// ── Logic Gate Simulator ────────────────────────────────────────────────────
function LogicGateSimulator() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);

  const and  = a & b;
  const or   = a | b;
  const not  = a === 1 ? 0 : 1;
  const nand = and === 1 ? 0 : 1;
  const xor  = a !== b ? 1 : 0;
  const nor  = or === 1 ? 0 : 1;

  const gates = [
    { name: 'AND',  result: and,  desc: 'Both must be 1' },
    { name: 'OR',   result: or,   desc: 'At least one must be 1' },
    { name: 'NAND', result: nand, desc: 'NOT AND (universal gate!)' },
    { name: 'NOR',  result: nor,  desc: 'NOT OR' },
    { name: 'XOR',  result: xor,  desc: 'Different = 1' },
    { name: 'NOT A',result: not,  desc: 'Flip input A' },
  ];

  const BitBtn = ({ val, set }: { val: number; set: (v: number) => void }) => (
    <button
      onClick={() => set(val === 0 ? 1 : 0)}
      className={cn(
        'w-12 h-12 rounded-xl font-bold text-lg transition-all duration-200',
        val === 1
          ? 'bg-green-500/20 border-2 border-green-400 text-green-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]'
          : 'bg-slate-800/50 border-2 border-slate-600 text-slate-400'
      )}
    >
      {val}
    </button>
  );

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <div className="text-sm text-slate-400 mb-4">⚡ <span className="text-yellow-400 font-semibold">Gate Simulator</span> — Toggle inputs A & B</div>
      <div className="flex gap-8 items-center justify-center mb-5">
        <div className="text-center">
          <div className="text-slate-400 text-xs mb-2">Input A</div>
          <BitBtn val={a} set={setA} />
        </div>
        <div className="text-slate-600 text-2xl">⚙️</div>
        <div className="text-center">
          <div className="text-slate-400 text-xs mb-2">Input B</div>
          <BitBtn val={b} set={setB} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {gates.map(g => (
          <div key={g.name} className="glass rounded-xl p-3 text-center">
            <div className="text-xs text-slate-500 mb-1">{g.desc}</div>
            <div className="text-sm font-bold text-violet-300 mb-1">{g.name}</div>
            <div className={cn(
              'text-xl font-bold',
              g.result === 1 ? 'neon-green' : 'text-slate-600'
            )}>
              {g.result}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Truth Table ─────────────────────────────────────────────────────────────
function TruthTable({ gate }: { gate: string }) {
  type Row = { a: number; b?: number; out: number };
  const rows: Row[] = gate === 'NOT'
    ? [{ a: 0, out: 1 }, { a: 1, out: 0 }]
    : [
        { a: 0, b: 0, out: gate === 'AND' ? 0 : gate === 'OR' ? 0 : gate === 'NAND' ? 1 : gate === 'NOR' ? 1 : 0 },
        { a: 0, b: 1, out: gate === 'AND' ? 0 : gate === 'OR' ? 1 : gate === 'NAND' ? 1 : gate === 'NOR' ? 0 : 1 },
        { a: 1, b: 0, out: gate === 'AND' ? 0 : gate === 'OR' ? 1 : gate === 'NAND' ? 1 : gate === 'NOR' ? 0 : 1 },
        { a: 1, b: 1, out: gate === 'AND' ? 1 : gate === 'OR' ? 1 : gate === 'NAND' ? 0 : gate === 'NOR' ? 0 : 0 },
      ];

  return (
    <div className="overflow-x-auto mt-3 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
      <table className="truth-table">
        <thead>
          <tr>
            <th>A</th>
            {gate !== 'NOT' && <th>B</th>}
            <th>{gate === 'NOT' ? 'NOT A' : `A ${gate} B`}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className={r.a === 1 ? 'one' : 'zero'}>{r.a}</td>
              {gate !== 'NOT' && r.b !== undefined && <td className={r.b === 1 ? 'one' : 'zero'}>{r.b}</td>}
              <td className={r.out === 1 ? 'one' : 'zero'}>{r.out}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Memory Diagram ──────────────────────────────────────────────────────────
function MemoryDiagram() {
  const rows = [
    { addr: '0x1000', val: '5', label: '← age (int, 4 bytes)' },
    { addr: '0x1001', val: '0', label: '' },
    { addr: '0x1002', val: '0', label: '' },
    { addr: '0x1003', val: '0', label: '' },
    { addr: '0x1004', val: '0x1000', label: '← ptr (pointer to age)' },
    { addr: '0x1008', val: '72', label: '← \'H\' ASCII 72' },
    { addr: '0x1009', val: '101', label: '← \'e\' ASCII 101' },
    { addr: '0x100A', val: '0', label: '← \'\\0\' null terminator' },
  ];

  return (
    <div className="glass rounded-2xl p-4 mt-4 overflow-x-auto">
      <div className="text-sm text-slate-400 mb-3">🗂️ <span className="text-orange-400 font-semibold">RAM Layout Visualizer</span></div>
      <div style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
        <div className="flex" style={{ background: 'rgba(139,92,246,0.12)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="mem-addr text-violet-400 font-bold text-xs">ADDRESS</div>
          <div className="mem-val text-violet-400 font-bold text-xs">VALUE</div>
          <div className="mem-label text-violet-400 font-bold text-xs">LABEL</div>
        </div>
        {rows.map((r, i) => (
          <div className="mem-row" key={i}>
            <div className="mem-addr">{r.addr}</div>
            <div className="mem-val">{r.val}</div>
            <div className="mem-label">{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CPU Cycle Visualizer ────────────────────────────────────────────────────
function CPUCycleViz() {
  const [step, setStep] = useState(0);
  const steps = [
    { name: 'FETCH', emoji: '📥', color: '#a78bfa', desc: 'CPU reads next instruction from RAM using the Program Counter address' },
    { name: 'DECODE', emoji: '🔍', color: '#60a5fa', desc: 'Control Unit interprets what the instruction means (e.g., "ADD register A and B")' },
    { name: 'EXECUTE', emoji: '⚡', color: '#34d399', desc: 'ALU performs the operation: math, logic, comparison, or memory access' },
    { name: 'STORE', emoji: '💾', color: '#fb923c', desc: 'Result is written back to a register or RAM. Program Counter advances to next instruction' },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 4), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <div className="text-sm text-slate-400 mb-4">🧠 <span className="text-red-400 font-semibold">Instruction Cycle</span> — Auto-animating</div>
      <div className="flex gap-2 justify-between flex-wrap">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex-1 min-w-[100px] rounded-xl p-3 text-center transition-all duration-500"
            style={{
              background: step === i ? `${s.color}22` : 'rgba(255,255,255,0.03)',
              border: `2px solid ${step === i ? s.color : 'rgba(255,255,255,0.06)'}`,
              boxShadow: step === i ? `0 0 20px ${s.color}44` : 'none',
              transform: step === i ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="text-xs font-bold" style={{ color: step === i ? s.color : '#64748b' }}>{s.name}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-xl text-xs text-slate-300" style={{ background: 'rgba(0,0,0,0.3)', minHeight: '48px' }}>
        {steps[step].desc}
      </div>
    </div>
  );
}

// ── Hash Map Visualizer ─────────────────────────────────────────────────────
function HashMapViz() {
  const entries: { key: string; val: string; hash: number }[] = [
    { key: '"Alice"', val: '"555-1234"', hash: 3 },
    { key: '"Bob"',   val: '"555-5678"', hash: 7 },
    { key: '"Dave"',  val: '"555-9999"', hash: 3 },
  ];
  const buckets = Array(10).fill(null).map((_, i) => entries.filter(e => e.hash === i));

  return (
    <div className="glass rounded-2xl p-5 mt-4 overflow-x-auto">
      <div className="text-sm text-slate-400 mb-3">🗺️ <span className="text-teal-400 font-semibold">Hash Map</span> — Bucket visualization with collision chaining</div>
      <div className="flex flex-col gap-1">
        {buckets.map((bucket, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)', flexShrink: 0 }}>
              [{i}]
            </div>
            {bucket.length === 0 ? (
              <div className="text-slate-700 text-xs font-mono">NULL</div>
            ) : (
              <div className="flex gap-1 flex-wrap">
                {bucket.map((e, j) => (
                  <div key={j} className="flex items-center gap-1">
                    <div className="px-3 py-1 rounded-lg text-xs font-mono" style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}>
                      {e.key}: {e.val}
                    </div>
                    {j < bucket.length - 1 && <span className="text-slate-500">→</span>}
                  </div>
                ))}
                {bucket.length > 1 && <span className="text-orange-400 text-xs ml-1">⚠️ collision!</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Neural Net Viz ──────────────────────────────────────────────────────────
function NeuralNetViz() {
  const layers = [
    { label: 'Input', nodes: 3, color: '#60a5fa' },
    { label: 'Hidden 1', nodes: 4, color: '#a78bfa' },
    { label: 'Hidden 2', nodes: 4, color: '#a78bfa' },
    { label: 'Output', nodes: 2, color: '#34d399' },
  ];

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <div className="text-sm text-slate-400 mb-4">🤖 <span className="text-cyan-400 font-semibold">Neural Network</span> — Simplified diagram</div>
      <div className="flex items-center justify-around gap-2 overflow-x-auto py-2">
        {layers.map((layer, li) => (
          <div key={li} className="flex flex-col items-center gap-1">
            <div className="text-xs text-slate-500 mb-2 text-center">{layer.label}</div>
            <div className="flex flex-col gap-3">
              {Array(layer.nodes).fill(0).map((_, ni) => (
                <div
                  key={ni}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${layer.color}20`,
                    border: `2px solid ${layer.color}`,
                    boxShadow: `0 0 10px ${layer.color}40`,
                    color: layer.color,
                  }}
                >
                  {li === 0 ? ['x₁','x₂','x₃'][ni] : li === 3 ? ['y₁','y₂'][ni] : ''}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-slate-500 text-center">Each connection has a weight. Training adjusts weights to minimize error.</div>
    </div>
  );
}

// ── Packet Visualizer ───────────────────────────────────────────────────────
function PacketViz() {
  const fields = [
    { label: 'Source IP', value: '192.168.1.5' },
    { label: 'Dest IP', value: '142.250.185.46' },
    { label: 'Protocol', value: 'TCP' },
    { label: 'Seq #', value: '1043' },
    { label: 'Payload', value: '"GET / HTTP/1.1"' },
    { label: 'Checksum', value: '0xA3F1' },
  ];

  return (
    <div className="glass rounded-2xl p-5 mt-4 overflow-x-auto">
      <div className="text-sm text-slate-400 mb-3">📮 <span className="text-sky-400 font-semibold">Packet Structure</span></div>
      <div className="flex" style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden' }}>
        {fields.map((f, i) => (
          <div key={i} className="packet-field" style={{ background: i === 4 ? 'rgba(52,211,153,0.08)' : 'transparent' }}>
            <div className="label">{f.label}</div>
            <div className="value" style={{ color: i === 4 ? '#34d399' : '#a5f3fc' }}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SQL Demo ────────────────────────────────────────────────────────────────
function SQLDemo() {
  const [mode, setMode] = useState<'safe' | 'unsafe'>('unsafe');

  const unsafeQuery = `-- ⚠️ DANGEROUS! String concatenation
username = "admin' --"
password = "anything"

query = "SELECT * FROM users WHERE " +
        "username='" + username + "' AND " +
        "password='" + password + "'"

-- Resulting query:
SELECT * FROM users 
WHERE username='admin' --' AND password='anything'
--                    ^^^ Comment! Password check skipped!
-- Result: LOGGED IN AS ADMIN 😱`;

  const safeQuery = `-- ✅ SAFE! Parameterized query
username = "admin' --"
password = "anything"

cursor.execute(
    "SELECT * FROM users WHERE username=%s AND password=%s",
    (username, password)  # Passed as DATA, not code
)

-- Database treats input as a literal string
-- Looks for user named: admin' --
-- Not found → Login DENIED ✅`;

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <div className="text-sm text-slate-400 mb-4">🔐 <span className="text-emerald-400 font-semibold">SQL Injection Demo</span></div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('unsafe')}
          className={cn('px-4 py-2 rounded-xl text-sm font-semibold transition-all', mode === 'unsafe' ? 'bg-red-500/20 border border-red-400/50 text-red-400' : 'glass text-slate-400')}
        >⚠️ Unsafe</button>
        <button
          onClick={() => setMode('safe')}
          className={cn('px-4 py-2 rounded-xl text-sm font-semibold transition-all', mode === 'safe' ? 'bg-green-500/20 border border-green-400/50 text-green-400' : 'glass text-slate-400')}
        >✅ Safe</button>
      </div>
      <CodeBlock code={mode === 'unsafe' ? unsafeQuery : safeQuery} lang="sql" />
    </div>
  );
}

// ── Quiz Component ──────────────────────────────────────────────────────────
function QuizSection({ questions, topicId }: { questions: Question[]; topicId: string }) {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [filter, setFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const filtered = questions.filter(q => filter === 'all' || q.level === filter);
  const answered = Object.values(answers).filter(v => v !== null).length;
  const correct = filtered.filter((q) => {
    const ai = filtered.indexOf(q);
    return answers[ai] === q.answer;
  }).length;

  const handleAnswer = (qi: number, opt: number) => {
    if (answers[qi] !== undefined && answers[qi] !== null) return;
    setAnswers(prev => ({ ...prev, [qi]: opt }));
  };

  const reset = () => setAnswers({});

  const levelColors = { easy: 'badge-easy', medium: 'badge-medium', hard: 'badge-hard' };
  const levelEmoji  = { easy: '🟢', medium: '🟡', hard: '🔴' };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
          🎯 Quiz Time
          {answered > 0 && (
            <span className="text-xs text-slate-400 font-normal">({correct}/{answered} correct)</span>
          )}
        </h3>
        <div className="flex gap-1 flex-wrap">
          {(['all', 'easy', 'medium', 'hard'] as const).map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); reset(); }}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-semibold transition-all capitalize',
                filter === f ? 'bg-violet-500/20 border border-violet-400/40 text-violet-400' : 'glass text-slate-500'
              )}
            >{f}</button>
          ))}
          {answered > 0 && (
            <button onClick={reset} className="px-3 py-1 rounded-lg text-xs font-semibold glass text-slate-500 transition-all hover:text-slate-300">↺ Reset</button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((q, qi) => {
          const userAnswer = answers[qi] ?? null;
          const isAnswered = userAnswer !== null;
          const isCorrect = userAnswer === q.answer;

          return (
            <div key={`${topicId}-${qi}`} className="glass rounded-xl p-4">
              <div className="flex items-start gap-3 mb-3">
                <span className={`badge ${levelColors[q.level]} flex-shrink-0`}>
                  {levelEmoji[q.level]} {q.level}
                </span>
                <p className="text-sm text-slate-200 font-medium leading-relaxed">{q.q}</p>
              </div>

              <div className="flex flex-col gap-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => handleAnswer(qi, oi)}
                    className={cn(
                      'quiz-option',
                      isAnswered && oi === q.answer && 'correct',
                      isAnswered && oi === userAnswer && !isCorrect && 'wrong',
                      isAnswered && 'answered cursor-default'
                    )}
                  >
                    <span className="mr-2 text-slate-500">{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-3 p-3 rounded-xl text-xs slide-up" style={{ background: isCorrect ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${isCorrect ? 'rgba(52,211,153,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                  <span className="mr-1">{isCorrect ? '✅ Correct!' : '❌ Not quite!'}</span>
                  <span className="text-slate-400">{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Section Content ─────────────────────────────────────────────────────────
function SectionContent({ topic }: { topic: Topic }) {
  if (topic.id === 'binary') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Imagine your bedroom light switch — it has exactly <strong className="text-violet-400">two positions: ON or OFF</strong>.
        Computers work the exact same way! Every single operation a computer does boils down to millions of tiny switches
        being on (1) or off (0). This is called <strong className="text-violet-400">binary</strong> — "bi" means two.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">💡</div>
          <div className="text-green-400 font-bold text-lg">1 = ON</div>
          <div className="text-slate-400 text-xs mt-1">Electricity flows</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🔌</div>
          <div className="text-slate-500 font-bold text-lg">0 = OFF</div>
          <div className="text-slate-400 text-xs mt-1">No electricity</div>
        </div>
      </div>

      <HighlightBox type="info">
        <strong>Bit</strong> = the smallest piece of data. Just a 0 or 1. <br/>
        <strong>Byte</strong> = 8 bits holding hands: <code className="text-violet-400">01001000</code>
      </HighlightBox>

      <div className="mt-4 mb-2 text-sm font-semibold text-slate-300">How binary counting works:</div>
      <div className="overflow-x-auto">
        <table className="truth-table">
          <thead><tr><th>Decimal</th><th>Binary</th><th>Powers of 2</th></tr></thead>
          <tbody>
            {[[0,'0','0'],[1,'1','2⁰'],[2,'10','2¹'],[3,'11','2⁰+2¹'],[4,'100','2²'],[8,'1000','2³'],[16,'10000','2⁴'],[255,'11111111','2⁷+...+2⁰']].map(([d,b,p])=>(
              <tr key={String(d)}><td className="one">{d}</td><td className="text-violet-400 font-mono">{b}</td><td className="text-slate-400 text-xs">{p}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <BinaryVisualizer />

      <div className="mt-4">
        <div className="text-sm font-semibold text-slate-300 mb-2">Why computers use binary (not decimal):</div>
        <ul className="list-none flex flex-col gap-2">
          {['🔌 Simple electronics: easy to tell "on" vs "off" — no ambiguity!','🛡️ Reliable: only 2 states = fewer errors than 10 states','⚡ Fast: simple on/off transistors switch billions of times per second','🔢 Math works perfectly: AND, OR, NOT maps directly to addition/multiplication'].map(t => (
            <li key={t} className="glass rounded-xl px-3 py-2 text-xs text-slate-300">{t}</li>
          ))}
        </ul>
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'hex') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Binary is great for computers but horrible for humans. Would you rather remember
        <code className="text-red-400"> 11111111 00000000 11111111</code> or
        <code className="text-green-400"> #FF00FF</code>?
        Hexadecimal (base-16) is a <strong className="text-blue-400">shortcut notation</strong> that makes binary readable!
      </p>

      <div className="glass rounded-xl p-4 mb-4">
        <div className="text-sm font-semibold text-slate-300 mb-3">Hex uses 16 symbols:</div>
        <div className="flex flex-wrap gap-2">
          {['0','1','2','3','4','5','6','7','8','9','A=10','B=11','C=12','D=13','E=14','F=15'].map((s, i) => (
            <div key={i} className="w-14 text-center py-2 rounded-lg text-xs font-mono" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>{s}</div>
          ))}
        </div>
      </div>

      <HighlightBox type="success">
        <strong>The key trick:</strong> 1 hex digit = exactly 4 bits (a "nibble"). So 1 byte (8 bits) = just 2 hex digits!<br/>
        Binary: <code>11010110</code> → split into 4s: <code>1101</code> <code>0110</code> → Hex: <code className="text-green-400">D6</code>
      </HighlightBox>

      <div className="mt-4 mb-2 text-sm font-semibold text-slate-300">Where hex appears in real life:</div>
      <div className="grid grid-cols-1 gap-2">
        {[
          { label: '🎨 Web Colors', ex: '#FF5733 = Red:255 Green:87 Blue:51', color: '#FF5733' },
          { label: '🧠 Memory Addresses', ex: '0x7FFE1234 — where your variable lives in RAM', color: '#a78bfa' },
          { label: '🌐 MAC Addresses', ex: '00:1A:2B:3C:4D:5E — your network card\'s ID', color: '#60a5fa' },
          { label: '🔐 SHA256 Hashes', ex: 'a591a6d40bf420404a011733cfb7b190d62c... (passwords stored this way!)', color: '#34d399' },
        ].map(r => (
          <div key={r.label} className="glass rounded-xl p-3 flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: r.color }}></div>
            <div>
              <div className="text-xs font-bold text-slate-300">{r.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{r.ex}</div>
            </div>
          </div>
        ))}
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'logic-gates') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Logic gates are the <strong className="text-yellow-400">LEGO bricks of computers</strong>.
        Every complex operation — adding numbers, comparing values, storing data —
        is built from millions of these tiny circuits. They take binary inputs and produce binary outputs
        based on <strong className="text-yellow-400">Boolean logic</strong> (math for TRUE/FALSE).
      </p>

      <LogicGateSimulator />

      <div className="mt-4 grid grid-cols-1 gap-3">
        {[
          { gate: 'AND',  real: '🎮 You play games if homework done AND room clean', color: '#34d399' },
          { gate: 'OR',   real: '🍰 Dessert if you eat veggies OR finish your milk', color: '#60a5fa' },
          { gate: 'NOT',  real: '🚪 Door opens if NOT locked', color: '#a78bfa' },
          { gate: 'NAND', real: '🌌 Universal gate — build ANYTHING with only NANDs!', color: '#fb923c' },
          { gate: 'XOR',  real: '🍦 Cake OR ice cream, but NOT both (one exclusive choice!)', color: '#f472b6' },
        ].map(g => (
          <div key={g.gate} className="glass rounded-xl p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm" style={{ color: g.color }}>{g.gate} Gate</span>
              <span className="text-xs text-slate-500">{g.real}</span>
            </div>
            <TruthTable gate={g.gate} />
          </div>
        ))}
      </div>

      <HighlightBox type="warn">
        <strong>Boolean Algebra:</strong> George Boole (1815) invented math for TRUE/FALSE!<br/>
        AND = multiplication (A · B) &nbsp;|&nbsp; OR = addition (A + B) &nbsp;|&nbsp; NOT = negation (Ā)
      </HighlightBox>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'ascii') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Computers speak binary, but you want to type words! <strong className="text-green-400">ASCII</strong> is the agreed-upon
        table that maps every character to a number. When you press 'A', your keyboard sends the number 65.
        The computer stores it as <code className="text-violet-400">01000001</code> (8 bits). To display it, it looks up 65 → shows 'A'!
      </p>

      <div className="glass rounded-xl p-4 mb-4 overflow-x-auto">
        <div className="text-xs font-semibold text-slate-400 mb-2">Common ASCII Values</div>
        <table className="truth-table">
          <thead><tr><th>Char</th><th>Decimal</th><th>Binary</th><th>Hex</th></tr></thead>
          <tbody>
            {[['A',65,'01000001','41'],['Z',90,'01011010','5A'],['a',97,'01100001','61'],['z',122,'01111010','7A'],['0',48,'00110000','30'],['9',57,'00111001','39'],['Space',32,'00100000','20'],['!',33,'00100001','21'],['\\n',10,'00001010','0A']].map(([c,d,b,h])=>(
              <tr key={c as string}><td className="text-violet-300">{c}</td><td className="one">{d}</td><td className="text-slate-400 font-mono text-xs">{b}</td><td className="neon-blue">{h}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <HighlightBox type="info">
        <strong>Cool trick!</strong> 'A' = 65, 'a' = 97. Difference = 32. In binary, only bit 5 changes!
        Add 32 = uppercase→lowercase. Subtract 32 = lowercase→uppercase. It's just flipping one bit!
      </HighlightBox>

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-semibold text-slate-400 mb-2">Unicode — for ALL languages</div>
        <div className="flex flex-wrap gap-2">
          {['😀 = U+1F600', '你好 = U+4F60 U+597D', '🚀 = U+1F680', 'مرحبا = U+0645...', '© = U+00A9', '← = U+2190'].map(e => (
            <span key={e} className="tag text-slate-300">{e}</span>
          ))}
        </div>
        <div className="text-xs text-slate-500 mt-2">ASCII = 128 chars. Unicode = 140,000+ chars covering every human language + emoji!</div>
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'cpu') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        The CPU is your computer's brain. It doesn't do anything fancy — it just does ONE simple thing
        an <strong className="text-red-400">unimaginably fast number of times</strong>: read an instruction,
        understand it, do it, save the result. Repeat 3 billion times per second!
      </p>

      <CPUCycleViz />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-violet-400 mb-2">🗄️ Memory Hierarchy</div>
          {[
            { name: 'Registers', speed: '1 cycle', size: '~1KB', color: '#f472b6' },
            { name: 'L1 Cache', speed: '4 cycles', size: '32-64KB', color: '#fb923c' },
            { name: 'L2 Cache', speed: '12 cycles', size: '256KB', color: '#fbbf24' },
            { name: 'L3 Cache', speed: '40 cycles', size: '8-32MB', color: '#34d399' },
            { name: 'RAM', speed: '200+ cycles', size: '8-64GB', color: '#60a5fa' },
            { name: 'SSD', speed: 'millions cycles', size: '500GB+', color: '#a78bfa' },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-2 py-1 border-b border-white/5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.color }}></div>
              <span className="text-xs text-slate-300 flex-1">{m.name}</span>
              <span className="text-xs text-slate-500">{m.speed}</span>
              <span className="text-xs font-mono" style={{ color: m.color }}>{m.size}</span>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-red-400 mb-2">⚡ Clock Speed</div>
          {[
            { label: '1 Hz', desc: '1 cycle/sec (a pendulum clock)' },
            { label: '1 KHz', desc: '1,000/sec (early computers)' },
            { label: '1 MHz', desc: '1 million/sec (1970s CPU)' },
            { label: '1 GHz', desc: '1 billion/sec (1999+)' },
            { label: '3.5 GHz', desc: '3.5 BILLION/sec (today)' },
          ].map(c => (
            <div key={c.label} className="py-1 border-b border-white/5">
              <span className="text-xs font-bold text-orange-400">{c.label}</span>
              <span className="text-xs text-slate-500 ml-2">{c.desc}</span>
            </div>
          ))}
          <div className="mt-3 text-xs font-semibold text-pink-400">Multi-Core CPUs:</div>
          <div className="text-xs text-slate-400 mt-1">
            Dual→Quad→Octa core = multiple chefs in the kitchen simultaneously! Each core runs independently.
          </div>
        </div>
      </div>

      <HighlightBox type="info">
        <strong>Inside the CPU:</strong> Control Unit (manager) + ALU (calculator) + Registers (tiny scratchpad inside CPU) + Cache (fast nearby storage). All working together at gigahertz speeds!
      </HighlightBox>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'python') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Python is your <strong className="text-yellow-400">friendly translator</strong> between human thoughts
        and machine language. You write readable English-like code, Python translates line by line
        (interpreted, not compiled) into machine code the CPU understands.
      </p>

      <CodeBlock code={`# Variables — named boxes for storing data
name    = "Zara"        # str  (text)
age     = 12            # int  (whole number)
height  = 1.52          # float (decimal)
loves_cs = True         # bool (yes/no)

# Scientific notation for huge/tiny numbers
speed_of_light = 3e8    # 3 × 10⁸ = 300,000,000
nano_meter     = 1e-9   # 1 × 10⁻⁹ = 0.000000001

# Type checking
print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>

# Type conversion
x = int(3.9)            # x = 3  (truncates, NOT rounds!)
s = str(42)             # s = "42"
f = float("3.14")       # f = 3.14

# The famous float gotcha!
print(0.1 + 0.2)        # 0.30000000000000004  (not 0.3!)
# Floats are APPROXIMATIONS in binary!`} />

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-bold text-yellow-400 mb-3">Data Types Cheat Sheet</div>
        <table className="truth-table">
          <thead><tr><th>Type</th><th>Example</th><th>Size</th><th>Range / Notes</th></tr></thead>
          <tbody>
            {[
              ['int','42, -100, 0','4 bytes (C)','−2.1B to +2.1B (C int)'],
              ['float','3.14, 1.5e9','8 bytes','~15 decimal digits precision (double!)'],
              ['str','"Hello"','1 byte/char','Unicode: any character'],
              ['bool','True, False','1 byte','True=1, False=0 internally'],
              ['complex','3+2j','16 bytes','Real + imaginary (for engineers!)'],
            ].map(([t,e,s,r]) => (
              <tr key={t as string}><td className="text-violet-300">{t}</td><td className="text-green-400 font-mono text-xs">{e}</td><td className="text-orange-400">{s}</td><td className="text-slate-400 text-xs">{r}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <HighlightBox type="warn">
        <strong>Compiled vs Interpreted:</strong> C compiles everything at once to machine code (fast but rigid). Python interprets line-by-line (flexible but slower). Java does BOTH — compiles to bytecode, then JVM interprets!
      </HighlightBox>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'memory') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Your computer's RAM is like a giant apartment building. Every byte has a unique <strong className="text-orange-400">address</strong> (like room number).
        A <strong className="text-orange-400">pointer</strong> is a variable that stores one of these addresses — it's a treasure map, not the treasure itself!
      </p>

      <MemoryDiagram />

      <div className="mt-4">
        <CodeBlock code={`// C language — pointers are explicit!
int age = 25;          // Store 25 at some address (say 0x1000)
int *ptr = &age;       // ptr stores the ADDRESS of age (0x1000)

printf("%d",  age);    // → 25       (the value)
printf("%p",  &age);   // → 0x1000   (the address)
printf("%p",  ptr);    // → 0x1000   (ptr holds the address)
printf("%d",  *ptr);   // → 25       (dereference: get value AT address)

// Pointer arithmetic — jumps by sizeof(type)!
int arr[] = {10, 20, 30, 40};
int *p = arr;           // Points to arr[0] at address 0x2000

*(p + 0) == 10   // 0x2000 → 10
*(p + 1) == 20   // 0x2004 → 20  (jumped 4 bytes, not 1!)
*(p + 2) == 30   // 0x2008 → 30`} lang="c" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-blue-400 mb-2">📚 Stack</div>
          <ul className="text-xs text-slate-300 flex flex-col gap-1">
            {['Local variables live here','Auto-managed (free when function ends)','Fixed max size (~1-8MB)','FAST access','Grows downward in memory'].map(t=><li key={t} className="flex gap-1"><span className="text-blue-400">▸</span>{t}</li>)}
          </ul>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-orange-400 mb-2">🏗️ Heap</div>
          <ul className="text-xs text-slate-300 flex flex-col gap-1">
            {['Dynamic allocation (malloc/new)','YOU must free it (in C/C++)','Much larger (GBs)','Slightly slower','Grows upward in memory'].map(t=><li key={t} className="flex gap-1"><span className="text-orange-400">▸</span>{t}</li>)}
          </ul>
        </div>
      </div>

      <HighlightBox type="danger">
        <strong>Segfault</strong> = accessing memory you don't own (NULL pointer, out-of-bounds). The OS kills your program!<br/>
        <strong>Memory Leak</strong> = forgetting to free heap memory. Program uses more and more RAM until crash!<br/>
        <strong>Python fix:</strong> Garbage Collector automatically frees unused memory. No manual management needed! ✅
      </HighlightBox>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'arrays') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Different data structures are like different storage systems. Arrays are like a parking lot with numbered spots.
        Linked lists are like a treasure hunt where each spot tells you where the next one is.
        Hash maps are like a dictionary where you jump straight to the right page!
      </p>

      <CodeBlock code={`# Array (Python list) — contiguous, O(1) random access
scores = [95, 87, 92, 78, 88]
# Memory: [95][87][92][78][88] — all next to each other!
# To find scores[3]: base_addr + 3 × 8 = instant! O(1)

print(scores[0])    # 95  — O(1) instant!
scores.append(100)  # Add to end — O(1) usually
scores.insert(0, 0) # Insert at start — O(n) slow! Must shift all elements right

# Linked List — nodes scattered in memory, connected by pointers
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # Pointer to next node!

head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
# Memory: [1|ptr] → [2|ptr] → [3|None] — scattered anywhere in RAM!
# Insert at start: just update 2 pointers — O(1) fast!
# Find node #50: must walk the chain — O(n) slow!`} />

      <HashMapViz />

      <div className="mt-4 glass rounded-xl p-4 overflow-x-auto">
        <div className="text-xs font-bold text-slate-300 mb-3">⚡ Big O Comparison</div>
        <table className="truth-table">
          <thead><tr><th>Structure</th><th>Access</th><th>Search</th><th>Insert Front</th><th>Insert End</th><th>Delete</th></tr></thead>
          <tbody>
            {[
              ['Array','O(1)','O(n)','O(n)','O(1)*','O(n)'],
              ['Linked List','O(n)','O(n)','O(1)','O(n)','O(1)'],
              ['Stack','O(n)','O(n)','—','O(1)','O(1)'],
              ['Queue','O(n)','O(n)','—','O(1)','O(1)'],
              ['Hash Map','O(1)*','O(1)*','—','O(1)*','O(1)*'],
            ].map(([s,...ops]) => (
              <tr key={s as string}><td className="text-violet-300">{s}</td>{ops.map((o,i)=><td key={i} className={o==='O(1)' || o==='O(1)*' ? 'one' : o==='O(n)' ? 'text-orange-400' : 'text-slate-500'}>{o}</td>)}</tr>
            ))}
          </tbody>
        </table>
        <div className="text-xs text-slate-600 mt-2">* = amortized / average case</div>
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'algorithms') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        An algorithm is a <strong className="text-indigo-400">step-by-step recipe</strong> for solving a problem.
        The right algorithm can mean the difference between a program finishing in 0.001 seconds vs 277 hours for the same task!
      </p>

      <CodeBlock code={`# Binary Search — O(log n) — requires SORTED array
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2  # Check the MIDDLE
        
        if arr[mid] == target:   return mid      # Found! ✅
        elif arr[mid] < target:  left = mid + 1  # Go RIGHT
        else:                    right = mid - 1 # Go LEFT
    
    return -1  # Not found

# For 1,000,000 elements, binary search needs only ~20 steps!
# Linear search: up to 1,000,000 steps. The difference is HUGE.

# DFS — Depth First Search (uses Stack / Recursion)
def dfs(graph, node, visited=set()):
    visited.add(node)
    print(node)  # Process
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)  # Go DEEP first

# BFS — Breadth First Search (uses Queue) — finds SHORTEST PATH
from collections import deque
def bfs(graph, start):
    visited, queue = {start}, deque([start])
    while queue:
        node = queue.popleft()  # Take from FRONT of queue
        print(node)
        for n in graph[node]:
            if n not in visited:
                visited.add(n); queue.append(n)  # Add to BACK`} />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-blue-400 mb-2">🏊 DFS vs BFS</div>
          {[
            ['DFS', 'Goes DEEP first', 'Uses Stack/Recursion', 'Maze solving', 'Finds A path'],
            ['BFS', 'Goes WIDE first', 'Uses Queue', 'Shortest path', 'Finds SHORTEST path'],
          ].map(([name,...facts]) => (
            <div key={name} className="mb-3">
              <div className="text-xs font-bold text-slate-300 mb-1">{name}</div>
              {facts.map(f => <div key={f} className="text-xs text-slate-500">▸ {f}</div>)}
            </div>
          ))}
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-violet-400 mb-2">🌳 Binary Search Tree</div>
          <div className="font-mono text-xs text-center text-slate-300 leading-relaxed">
            <div className="text-violet-400">8</div>
            <div>/ \</div>
            <div>3   10</div>
            <div>/ \    \</div>
            <div>1   6   14</div>
            <div className="text-xs text-slate-500 mt-2">Left &lt; Parent &lt; Right</div>
            <div className="text-xs text-green-400">O(log n) average search!</div>
          </div>
        </div>
      </div>

      <HighlightBox type="info">
        <strong>Dijkstra's Algorithm</strong> finds the shortest path in a WEIGHTED graph (roads with distances, not just connection yes/no). Greedily picks the nearest unvisited node. Doesn't work with negative weights!
      </HighlightBox>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'functions') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Functions are <strong className="text-pink-400">reusable code recipes</strong>. Write once, use anywhere.
        Every function call gets its own space on the <strong className="text-pink-400">call stack</strong> — like stacking plates.
        Recursion is a function calling itself, and it's pure magic! 🪄
      </p>

      <CodeBlock code={`# Functions — reusable blocks
def celsius_to_fahrenheit(celsius):   # Parameter: celsius
    return (celsius * 9/5) + 32       # Return value

temp = celsius_to_fahrenheit(100)     # Call with argument 100
print(temp)  # 212.0

# Recursion — function calls itself!
def factorial(n):
    if n == 0 or n == 1:   # BASE CASE: stop here!
        return 1
    return n * factorial(n - 1)   # RECURSIVE case: call self with smaller n

# factorial(4) = 4 × factorial(3)
#              = 4 × 3 × factorial(2)
#              = 4 × 3 × 2 × factorial(1)
#              = 4 × 3 × 2 × 1 = 24 ✅

# Memoization — cache results to avoid recalculation
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Without cache: fib(40) = ~1 billion calls!
# With cache:    fib(40) = exactly 40 unique calls!`} />

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-bold text-pink-400 mb-3">📚 Call Stack (factorial(3))</div>
        <div className="flex flex-col gap-1">
          {[
            { fn: 'factorial(3)', state: 'returns 3 × 2 = 6', active: false },
            { fn: 'factorial(2)', state: 'returns 2 × 1 = 2', active: false },
            { fn: 'factorial(1)', state: 'returns 1 (base case!)', active: true },
          ].map((f, i) => (
            <div key={i} className="px-3 py-2 rounded-lg text-xs flex justify-between" style={{
              background: f.active ? 'rgba(244,114,182,0.12)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${f.active ? 'rgba(244,114,182,0.3)' : 'rgba(255,255,255,0.06)'}`,
            }}>
              <span className="font-mono text-pink-300">{f.fn}</span>
              <span className="text-slate-500">{f.state}</span>
            </div>
          ))}
          <div className="text-xs text-slate-500 text-center mt-1">↑ Stack grows down, unwinds back up</div>
        </div>
      </div>

      <HighlightBox type="warn">
        <strong>Stack Overflow:</strong> Too many recursive calls → stack fills up! Python default limit: ~1000 calls. Always have a solid BASE CASE that is definitely reached!
      </HighlightBox>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'complexity') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Big O is about <strong className="text-amber-400">how your algorithm SCALES</strong> as input grows.
        Two algorithms might both work for 100 items. For 1 million items?
        One finishes in milliseconds, the other takes longer than the age of the universe!
      </p>

      <div className="glass rounded-xl p-4 mb-4">
        <div className="text-xs font-bold text-amber-400 mb-3">⏱️ Operations for n = 1,000,000</div>
        {[
          { big_o: 'O(1)', name: 'Constant', ops: '1', bar: 1, color: '#34d399', ex: 'Array access' },
          { big_o: 'O(log n)', name: 'Logarithmic', ops: '~20', bar: 2, color: '#60a5fa', ex: 'Binary search' },
          { big_o: 'O(n)', name: 'Linear', ops: '1,000,000', bar: 30, color: '#fbbf24', ex: 'Linear scan' },
          { big_o: 'O(n log n)', name: 'Linearithmic', ops: '20,000,000', bar: 55, color: '#fb923c', ex: 'Merge sort' },
          { big_o: 'O(n²)', name: 'Quadratic', ops: '10¹²', bar: 80, color: '#f472b6', ex: 'Bubble sort' },
          { big_o: 'O(2ⁿ)', name: 'Exponential', ops: '> atoms in universe', bar: 100, color: '#ef4444', ex: 'Naive recursion' },
        ].map(r => (
          <div key={r.big_o} className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold" style={{ color: r.color }}>{r.big_o}</span>
              <span className="text-xs text-slate-500">{r.name} — {r.ops} ops — <span className="text-slate-600">{r.ex}</span></span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${r.bar}%`, background: r.color }}></div>
            </div>
          </div>
        ))}
      </div>

      <CodeBlock code={`# O(n²) — Brute force duplicate check
def has_dups_slow(arr):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):   # Nested loop!
            if arr[i] == arr[j]:
                return True
    return False
# n=10,000 → 100,000,000 operations  😴

# O(n) — Smart duplicate check using hash set
def has_dups_fast(arr):
    seen = set()              # Hash set: O(1) lookups!
    for num in arr:
        if num in seen:       # Instant check!
            return True
        seen.add(num)
    return False
# n=10,000 → 10,000 operations  ⚡ 10,000× faster!

# Divide and Conquer: Merge Sort O(n log n)
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])    # Conquer left half
    right = merge_sort(arr[mid:])    # Conquer right half
    return merge(left, right)         # Combine!`} />

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'oop') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Object-Oriented Programming organizes code like the real world —
        <strong className="text-violet-400"> objects with properties and behaviors</strong>.
        A Dog CLASS is the blueprint. Creating <code className="text-green-400">dog1 = Dog("Rex")</code> is making a real dog from that blueprint!
      </p>

      <CodeBlock code={`# Class = Blueprint, Object = Instance
class Animal:
    species_count = 0            # Class variable (shared by ALL)
    
    def __init__(self, name, age):
        self.name = name         # Instance variable (unique per object)
        self.age  = age
        Animal.species_count += 1
    
    def speak(self):             # Method — overridden by subclasses
        return "..."

class Dog(Animal):               # Inheritance — Dog IS AN Animal
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Call parent constructor!
        self.breed = breed
    
    def speak(self):             # Polymorphism — same name, different behavior
        return f"{self.name} says: Woof! 🐕"
    
    def __str__(self):           # Special method — how to print this object
        return f"Dog({self.name}, {self.age}yr, {self.breed})"

class Cat(Animal):
    def speak(self):             # Same method name, different output!
        return f"{self.name} says: Meow! 🐱"

# POLYMORPHISM in action:
animals = [Dog("Rex", 3, "Lab"), Cat("Luna", 2)]
for a in animals:
    print(a.speak())  # Works for ANY Animal subclass!
# Rex says: Woof! 🐕
# Luna says: Meow! 🐱`} />

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { name: 'Encapsulation 📦', desc: 'Bundle data + methods. Hide internal details. Use private (__attr) to protect sensitive data like bank balance.', color: '#f472b6' },
          { name: 'Inheritance 👨‍👦', desc: '"Is A" relationship. Dog IS AN Animal. Gets all Animal methods free. Add/override as needed.', color: '#60a5fa' },
          { name: 'Polymorphism 🎭', desc: '"Many forms". Same method name (speak()) works differently per class. Code handles ANY Animal type!', color: '#34d399' },
          { name: 'Abstraction 🎨', desc: 'car.start() hides 50 internal steps. User just calls start(). Hides complexity, shows simplicity.', color: '#fb923c' },
        ].map(p => (
          <div key={p.name} className="glass rounded-xl p-4">
            <div className="text-xs font-bold mb-1" style={{ color: p.color }}>{p.name}</div>
            <div className="text-xs text-slate-400">{p.desc}</div>
          </div>
        ))}
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'ml') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Traditional programming: you write all the rules. Machine Learning: you show examples and the computer
        <strong className="text-cyan-400"> discovers the rules itself</strong>. Feed it 10,000 spam emails,
        it learns what spam looks like. No explicit rules needed!
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-cyan-400 mb-2">📚 Traditional Programming</div>
          <div className="text-xs text-slate-300 font-mono">Input + Rules → Output</div>
          <div className="text-xs text-slate-500 mt-2">You write all the if/else rules manually. Breaks when reality changes!</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="text-xs font-bold text-violet-400 mb-2">🤖 Machine Learning</div>
          <div className="text-xs text-slate-300 font-mono">Input + Output → Rules</div>
          <div className="text-xs text-slate-500 mt-2">Model discovers rules from data. Gets better with more examples!</div>
        </div>
      </div>

      <NeuralNetViz />

      <CodeBlock code={`# Simple ML example: Learn price = size × 200
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data (the "answers")
sizes  = np.array([[1000],[1500],[2000],[2500],[3000]])
prices = np.array([200000, 300000, 400000, 500000, 600000])

# Train-test split (ALWAYS split your data!)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    sizes, prices, test_size=0.2, random_state=42
)
# 80% for learning, 20% for testing (data model NEVER saw)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)  # "Learn from examples!"

# Evaluate on TEST data (data it never saw during training!)
score = model.score(X_test, y_test)  # R² score
print(f"Model accuracy: {score:.2%}")

# Predict new data
prediction = model.predict([[1800]])   # $360,000`} />

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-bold text-amber-400 mb-2">⚖️ Overfitting vs Underfitting</div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: '🙁 Underfitting', desc: 'Too simple. Misses the pattern. Low training AND test accuracy.', color: '#60a5fa' },
            { name: '✅ Good Fit', desc: 'Just right! Learns pattern, ignores noise. High test accuracy.', color: '#34d399' },
            { name: '😱 Overfitting', desc: 'Memorizes training data. Perfect training score, fails on new data!', color: '#ef4444' },
          ].map(o => (
            <div key={o.name} className="p-3 rounded-xl text-center" style={{ background: `${o.color}12`, border: `1px solid ${o.color}30` }}>
              <div className="text-xs font-bold mb-1" style={{ color: o.color }}>{o.name}</div>
              <div className="text-xs text-slate-400">{o.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'internet') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        The Internet is billions of computers connected together, agreeing to use the same rules
        (protocols) to talk to each other. When you visit a website, your request travels through
        cables, routers, and servers — all in under 200 milliseconds! ⚡
      </p>

      <PacketViz />

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-bold text-sky-400 mb-3">🌍 Journey: typing "www.google.com" → seeing the page</div>
        <div className="flex flex-col gap-2">
          {[
            ['1. DNS Lookup', 'www.google.com → 142.250.185.46 (IP address)', '#60a5fa'],
            ['2. TCP Handshake', 'SYN → SYN-ACK → ACK (3-way handshake, establish connection)', '#a78bfa'],
            ['3. TLS Handshake', 'Exchange encryption keys for HTTPS security 🔐', '#34d399'],
            ['4. HTTP Request', 'GET / HTTP/1.1  Host: www.google.com', '#fbbf24'],
            ['5. Server Response', 'HTTP/1.1 200 OK → HTML + CSS + JS files', '#fb923c'],
            ['6. Browser Renders', 'Parse HTML → Apply CSS → Run JS → Display page!', '#f472b6'],
          ].map(([step, desc, color]) => (
            <div key={step as string} className="flex gap-3 items-start">
              <span className="text-xs font-bold flex-shrink-0 mt-0.5" style={{ color: color as string }}>{step}</span>
              <span className="text-xs text-slate-400">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 glass rounded-xl p-4 overflow-x-auto">
        <div className="text-xs font-bold text-slate-300 mb-2">📊 HTTP Status Codes</div>
        <table className="truth-table">
          <thead><tr><th>Code</th><th>Meaning</th><th>Example</th></tr></thead>
          <tbody>
            {[['200','✅ OK','Page loaded successfully'],['201','✅ Created','New user registered'],['301','➡️ Redirect','Domain moved permanently'],['400','❌ Bad Request','Malformed request syntax'],['401','🔐 Unauthorized','Login required'],['403','🚫 Forbidden','No permission'],['404','👻 Not Found','Page doesn\'t exist'],['500','💥 Server Error','Bug on the server'],['503','😴 Unavailable','Server overloaded']].map(([c,m,e])=>(
              <tr key={c as string}><td className={parseInt(c as string)<400 ? 'one' : 'text-red-400'}>{c}</td><td className="text-slate-300 text-xs">{m}</td><td className="text-slate-500 text-xs">{e}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'web') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Every website you visit is built from 3 layers working together:
        <strong className="text-orange-400"> HTML</strong> (structure/skeleton),
        <strong className="text-blue-400"> CSS</strong> (style/clothes),
        <strong className="text-yellow-400"> JavaScript</strong> (behavior/muscles).
        APIs let different programs talk to each other using HTTP methods.
      </p>

      <CodeBlock code={`<!-- HTML: Structure (the what) -->
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <link rel="stylesheet" href="style.css">  <!-- Load CSS -->
</head>
<body>
  <h1 id="title">Hello World!</h1>
  <button onclick="changeTitle()">Click Me!</button>
  <script src="app.js"></script>  <!-- Load JavaScript -->
</body>
</html>

/* CSS: Visual (the how it looks) */
h1 {
  color: #a78bfa;           /* purple */
  font-size: 2rem;
  text-shadow: 0 0 20px rgba(167,139,250,0.5);  /* neon glow! */
  transition: all 0.3s ease;  /* smooth animations */
}
button:hover { transform: scale(1.05); }  /* pop on hover */

// JavaScript: Behavior (the what it does)
function changeTitle() {
  const title = document.getElementById('title');
  title.textContent = 'You clicked me! 🎉';
  title.style.color = '#34d399';  // turns green!
}`} lang="html" />

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-bold text-orange-400 mb-3">🔌 REST API Methods</div>
        <div className="flex flex-col gap-2">
          {[
            { method: 'GET', url: '/users/5', desc: 'Read — "Give me user #5"', color: '#34d399' },
            { method: 'POST', url: '/users', desc: 'Create — "Make a new user" (body has data)', color: '#60a5fa' },
            { method: 'PUT', url: '/users/5', desc: 'Update — "Replace user #5 entirely"', color: '#fbbf24' },
            { method: 'PATCH', url: '/users/5', desc: 'Partial Update — "Update only the email"', color: '#fb923c' },
            { method: 'DELETE', url: '/users/5', desc: 'Delete — "Remove user #5"', color: '#ef4444' },
          ].map(r => (
            <div key={r.method} className="flex items-center gap-3">
              <span className="w-16 text-center py-1 rounded-lg text-xs font-bold flex-shrink-0" style={{ background: `${r.color}18`, border: `1px solid ${r.color}40`, color: r.color }}>{r.method}</span>
              <code className="text-xs text-slate-400 font-mono">{r.url}</code>
              <span className="text-xs text-slate-500">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <SQLDemo />

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  if (topic.id === 'databases') return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        Databases store structured data in <strong className="text-emerald-400">tables</strong> (like spreadsheets with superpowers).
        SQL is the language you use to talk to them — Create, Read, Update, Delete (CRUD) data with elegant queries.
      </p>

      <CodeBlock code={`-- Create table
CREATE TABLE users (
    id       INT PRIMARY KEY AUTO_INCREMENT,  -- Unique ID per row
    username VARCHAR(50)  UNIQUE NOT NULL,     -- No duplicates allowed!
    email    VARCHAR(100) UNIQUE,
    age      INT,
    created  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT: Create new rows
INSERT INTO users (username, email, age)
VALUES ('alice', 'alice@example.com', 25),
       ('bob',   'bob@example.com',   30);

-- SELECT: Read data
SELECT * FROM users;                    -- All rows, all columns
SELECT username, age FROM users         -- Specific columns
    WHERE age > 20                      -- Filter rows
    ORDER BY age DESC                   -- Sort results
    LIMIT 5;                            -- Max 5 results

-- JOIN: Combine two tables
SELECT users.username, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.amount > 100;

-- UPDATE: Modify existing data
UPDATE users SET age = 26 WHERE username = 'alice';

-- DELETE: Remove rows (CAREFUL! No undo by default)
DELETE FROM users WHERE id = 5;

-- Aggregate functions
SELECT COUNT(*) FROM users;             -- Total user count
SELECT AVG(age) FROM users;             -- Average age
SELECT MAX(age), MIN(age) FROM users;   -- Oldest and youngest`} lang="sql" />

      <SQLDemo />

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs font-bold text-red-400 mb-2">🔐 SQL Injection: Simple vs Advanced</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs text-orange-400 font-semibold mb-1">Basic Attack</div>
            <CodeBlock code={`-- Input: admin' --
-- Query becomes:
SELECT * FROM users 
WHERE user='admin' --' 
AND pass='...'
-- Comment kills password!
-- Logged in as admin!`} lang="sql" />
          </div>
          <div>
            <div className="text-xs text-red-400 font-semibold mb-1">Advanced Attack</div>
            <CodeBlock code={`-- Input: '; DROP TABLE users; --
-- Query becomes:
SELECT * FROM users WHERE 
user=''; 
DROP TABLE users; 
--' AND pass='...'
-- ALL DATA DELETED! 💀`} lang="sql" />
          </div>
        </div>
        <HighlightBox type="success">
          <strong>Defense:</strong> Always use parameterized queries! cursor.execute("SELECT * FROM users WHERE user=%s", (username,))
          The database treats input as DATA, not CODE. Attack impossible!
        </HighlightBox>
      </div>

      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );

  return (
    <div className="slide-up">
      <p className="text-slate-300 text-sm">Content for {topic.title} coming soon!</p>
      <QuizSection questions={topic.questions} topicId={topic.id} />
    </div>
  );
}

// ── Progress Tracker ────────────────────────────────────────────────────────
function useProgress() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const markVisited = useCallback((id: string) => {
    setVisited(prev => new Set([...prev, id]));
  }, []);
  return { visited, markVisited };
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic>(TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { visited, markVisited } = useProgress();
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredTopics = TOPICS.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectTopic = (topic: Topic) => {
    setActiveTopic(topic);
    markVisited(topic.id);
    setSidebarOpen(false);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    markVisited(TOPICS[0].id);
  }, []);

  const progress = Math.round((visited.size / TOPICS.length) * 100);

  return (
    <div className="bg-cosmos min-h-screen">
      {/* Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />

      {/* Header */}
      <header className="site-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="float-anim text-2xl flex-shrink-0">🚀</div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold grad-purple truncate">RSV AI Projects</h1>
              <p className="text-xs text-slate-500 truncate hidden sm:block">Basics → Advanced · CS Toddler Lessons</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Progress */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="text-xs text-slate-500">{visited.size}/{TOPICS.length}</div>
              <div className="w-24 progress-bar">
                <div className="progress-fill bg-violet-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-xs text-violet-400 font-semibold">{progress}%</div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-36 sm:w-48 px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/10 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/8 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs">✕</button>
              )}
            </div>

            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden glass rounded-xl p-2 text-slate-400"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        'fixed top-0 left-0 h-full w-72 z-50 lg:hidden transition-transform duration-300 glass-strong overflow-y-auto pt-16',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-4">
          <SidebarContent topics={filteredTopics} activeTopic={activeTopic} visited={visited} selectTopic={selectTopic} />
        </div>
      </div>

      {/* Main layout */}
      <div className="main-layout pt-6">
        {/* Desktop Sidebar */}
        <aside className="sidebar hidden lg:block">
          <div className="glass-strong rounded-2xl p-4">
            <SidebarContent topics={filteredTopics} activeTopic={activeTopic} visited={visited} selectTopic={selectTopic} />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {/* Topic Header */}
          <div className="glass-strong rounded-2xl p-6 mb-5 relative overflow-hidden">
            <div className="absolute inset-0 rounded-2xl opacity-30" style={{ background: `radial-gradient(circle at 30% 50%, ${activeTopic.glow}, transparent 70%)` }} />
            <div className="relative">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-4xl float-anim">{activeTopic.emoji}</span>
                    <div>
                      <h2 className="text-xl font-bold text-white">{activeTopic.title}</h2>
                      <p className="text-slate-400 text-sm">{activeTopic.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {activeTopic.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-xs text-slate-500">
                    Topic {TOPICS.findIndex(t => t.id === activeTopic.id) + 1} of {TOPICS.length}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const ci = TOPICS.findIndex(t => t.id === activeTopic.id);
                        if (ci > 0) selectTopic(TOPICS[ci - 1]);
                      }}
                      disabled={TOPICS.findIndex(t => t.id === activeTopic.id) === 0}
                      className="px-3 py-1.5 rounded-lg text-xs glass text-slate-400 disabled:opacity-30 transition-all hover:text-white"
                    >← Prev</button>
                    <button
                      onClick={() => {
                        const ci = TOPICS.findIndex(t => t.id === activeTopic.id);
                        if (ci < TOPICS.length - 1) selectTopic(TOPICS[ci + 1]);
                      }}
                      disabled={TOPICS.findIndex(t => t.id === activeTopic.id) === TOPICS.length - 1}
                      className="px-3 py-1.5 rounded-lg text-xs glass text-slate-400 disabled:opacity-30 transition-all hover:text-white"
                    >Next →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Content */}
          <div className="glass-strong rounded-2xl p-6">
            <div ref={contentRef}>
              <SectionContent key={activeTopic.id} topic={activeTopic} />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-slate-600 max-w-7xl mx-auto px-6">
        <div className="grad-purple text-sm font-semibold mb-1">🚀 RSV AI Projects · Basics to Advanced CS Toddler Lessons</div>
        <div>Built for curious 12-year-olds (and anyone who wants to understand computers from 0s & 1s to the Internet) 💡</div>
      </footer>
    </div>
  );
}

// ── Sidebar Content Component ───────────────────────────────────────────────
function SidebarContent({
  topics, activeTopic, visited, selectTopic
}: {
  topics: Topic[];
  activeTopic: Topic;
  visited: Set<string>;
  selectTopic: (t: Topic) => void;
}) {
  return (
    <>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
        📚 {topics.length} Topics
      </div>
      <div className="flex flex-col gap-1">
        {topics.map((topic, i) => {
          const isActive = topic.id === activeTopic.id;
          const isVisited = visited.has(topic.id);

          return (
            <button
              key={topic.id}
              onClick={() => selectTopic(topic)}
              className={cn('nav-pill w-full text-left', isActive && 'active')}
            >
              <span className="text-sm flex-shrink-0">{topic.emoji}</span>
              <span className="flex-1 min-w-0 truncate text-xs">{topic.title}</span>
              <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
                {isVisited && !isActive && (
                  <span className="text-green-500 text-xs">✓</span>
                )}
                <span className="text-slate-700 text-xs w-4 text-right">{i + 1}</span>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
