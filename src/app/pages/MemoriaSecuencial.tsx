import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Eye, MousePointer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveSession } from '../utils/stats';

// ── Colours ──────────────────────────────────────────────────────────────────
const BUTTONS = [
  { id: 0, label: 'Azul', normal: '#3B82F6', lit: '#93C5FD', text: '#1e40af' },
  { id: 1, label: 'Verde', normal: '#22C55E', lit: '#86EFAC', text: '#14532d' },
  { id: 2, label: 'Amarillo', normal: '#F59E0B', lit: '#FDE68A', text: '#78350f' },
  { id: 3, label: 'Rojo', normal: '#EF4444', lit: '#FCA5A5', text: '#7f1d1d' },
];

type Phase = 'idle' | 'showing' | 'player' | 'correct' | 'wrong';

const STEP_MS = 850;
const ON_MS = 580;
const LEAD_MS = 600;

const LEVEL_MSG = [
  '¡Bien! Nivel',
  '¡Sigue así! Nivel',
  '¡Genial! Nivel',
  '¡Increíble! Nivel',
  '¡Eres una crack! Nivel',
];

export function MemoriaSecuencial() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>('idle');
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [playerPos, setPlayerPos] = useState(0);
  const [level, setLevel] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [statusMsg, setStatusMsg] = useState('Pulsa "Comenzar" para jugar');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const playSequence = useCallback((seq: number[]) => {
    clearTimers();
    setPhase('showing');
    setStatusMsg('Observa la secuencia…');
    setActiveBtn(null);
    setPlayerPos(0);

    seq.forEach((btn, i) => {
      const t1 = setTimeout(() => setActiveBtn(btn), LEAD_MS + i * STEP_MS);
      const t2 = setTimeout(() => setActiveBtn(null), LEAD_MS + i * STEP_MS + ON_MS);
      timers.current.push(t1, t2);
    });

    const tEnd = setTimeout(() => {
      setPhase('player');
      setStatusMsg('¡Tu turno! Repite la secuencia');
    }, LEAD_MS + seq.length * STEP_MS);

    timers.current.push(tEnd);
  }, []);

  const startGame = useCallback(() => {
    clearTimers();
    const first = Math.floor(Math.random() * 4);
    const seq = [first];
    setSequence(seq);
    setLevel(1);
    setPlayerPos(0);
    setPhase('idle');
    playSequence(seq);
  }, [playSequence]);

  const advanceLevel = useCallback((currentSeq: number[]) => {
    const newBtn = Math.floor(Math.random() * 4);
    const newSeq = [...currentSeq, newBtn];
    const lvl = newSeq.length;

    setSequence(newSeq);
    setLevel(lvl);

    const msg = LEVEL_MSG[Math.min(lvl - 2, LEVEL_MSG.length - 1)] + ' ' + lvl;
    setStatusMsg(msg);

    if (lvl % 3 === 0) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }

    const t = setTimeout(() => playSequence(newSeq), 1400);
    timers.current.push(t);
  }, [playSequence]);

  const handleButtonPress = useCallback(async (btnId: number) => {
    if (phase !== 'player') return;

    setActiveBtn(btnId);
    const t = setTimeout(() => setActiveBtn(null), 220);
    timers.current.push(t);

    const expected = sequence[playerPos];

    if (btnId !== expected) {
      setPhase('wrong');

      const finalScore = sequence.length - 1;
      if (finalScore > highScore) {
        setHighScore(finalScore);
      }

      setStatusMsg(`Incorrecto. Llegaste al nivel ${sequence.length}. ¡Buen intento! 😊`);

      await saveSession({
        exercise: 'memoria-secuencial',
        exerciseName: 'Memoria Secuencial',
        score: finalScore,
        level: sequence.length,
        duration: 1,
      });

      return;
    }

    const newPos = playerPos + 1;

    if (newPos === sequence.length) {
      setPhase('correct');
      advanceLevel(sequence);
    } else {
      setPlayerPos(newPos);
    }
  }, [phase, sequence, playerPos, highScore, advanceLevel]);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        <Link
          to="/ejercicios"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors"
        >
          <ArrowLeft style={{ width: 18, height: 18 }} />
          Volver a ejercicios
        </Link>

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-slate-800 mb-2" style={{ fontSize: 30, fontWeight: 700 }}>
            Memoria Secuencial
          </h1>
          <p className="text-slate-500" style={{ fontSize: 16 }}>
            Observa la secuencia de colores y repítela en el mismo orden.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Nivel actual', value: level || '—' },
            { label: 'Secuencia', value: sequence.length ? `${sequence.length} pasos` : '—' },
            { label: 'Récord', value: highScore || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-xl p-3 text-center border border-slate-200">
              <p className="text-slate-800" style={{ fontSize: 22, fontWeight: 700 }}>
                {value}
              </p>
              <p className="text-slate-500" style={{ fontSize: 12 }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl px-5 py-4 text-center mb-6 border min-h-[3.5rem] flex items-center justify-center"
          style={{
            backgroundColor:
              phase === 'wrong'
                ? '#FEF2F2'
                : phase === 'correct'
                  ? '#F0FDF4'
                  : phase === 'showing'
                    ? '#EFF6FF'
                    : '#F8FAFC',
            borderColor:
              phase === 'wrong'
                ? '#FECACA'
                : phase === 'correct'
                  ? '#BBF7D0'
                  : phase === 'showing'
                    ? '#BFDBFE'
                    : '#E2E8F0',
            color:
              phase === 'wrong'
                ? '#B91C1C'
                : phase === 'correct'
                  ? '#15803D'
                  : phase === 'showing'
                    ? '#1D4ED8'
                    : '#475569',
          }}
        >
          <div className="flex items-center gap-2">
            {phase === 'showing' && <Eye style={{ width: 18, height: 18 }} />}
            {phase === 'player' && <MousePointer style={{ width: 18, height: 18 }} />}
            <span style={{ fontSize: 16, fontWeight: 600 }}>{statusMsg}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {BUTTONS.map(({ id, label, normal, lit, text }) => {
            const isLit = activeBtn === id;

            return (
              <button
                key={id}
                onClick={() => void handleButtonPress(id)}
                disabled={phase !== 'player'}
                className="rounded-3xl flex flex-col items-center justify-center gap-2 select-none transition-all duration-150"
                style={{
                  backgroundColor: isLit ? lit : normal,
                  boxShadow: isLit
                    ? `0 0 30px 8px ${normal}88, inset 0 2px 8px rgba(255,255,255,0.4)`
                    : `0 4px 12px ${normal}44`,
                  transform: isLit ? 'scale(0.96)' : 'scale(1)',
                  height: 110,
                  cursor: phase === 'player' ? 'pointer' : 'default',
                  border: 'none',
                  outline: 'none',
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, color: isLit ? text : '#fff' }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {phase === 'player' && sequence.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {sequence.map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i < playerPos ? '#22C55E' : i === playerPos ? '#2563EB' : '#CBD5E1',
                  transform: i === playerPos ? 'scale(1.4)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {phase === 'idle' || phase === 'wrong' ? (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white transition-all hover:opacity-90 hover:scale-105 shadow-md"
              style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 700 }}
            >
              {phase === 'wrong' ? '🔄 Intentar de nuevo' : '▶ Comenzar'}
            </button>
          ) : (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all"
              style={{ fontSize: 15, fontWeight: 600 }}
            >
              <RotateCcw style={{ width: 16, height: 16 }} />
              Reiniciar
            </button>
          )}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-5 border border-slate-200">
          <p className="text-slate-700 mb-3" style={{ fontSize: 16, fontWeight: 700 }}>
            ¿Cómo se juega?
          </p>
          <ol className="text-slate-500 space-y-2" style={{ fontSize: 15, paddingLeft: 20 }}>
            <li>1. Los botones se iluminarán en un orden determinado.</li>
            <li>2. Cuando sea tu turno, pulsa los botones en el mismo orden.</li>
            <li>3. Cada vez que aciertes, la secuencia crece en un paso más.</li>
            <li>4. ¡No te preocupes si fallas! Puedes volver a intentarlo.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}