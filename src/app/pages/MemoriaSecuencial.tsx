import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Eye, MousePointer, Target, Sparkles, Brain, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
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
  const [gameStarted, setGameStarted] = useState(false);
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
    setGameStarted(true);
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

  if (!gameStarted) {
    return (
      <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-emerald-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              to="/ejercicios"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-12 transition-all font-semibold group"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-600 transition-all">
                <ArrowLeft style={{ width: 16, height: 16 }} />
              </div>
              Volver a ejercicios
            </Link>
          </motion.div>

          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
            >
              <Target className="text-white" style={{ width: 40, height: 40 }} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 shadow-sm border border-emerald-100 bg-white"
                style={{ color: '#10b981', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}
              >
                <Sparkles style={{ width: 12, height: 12 }} />
                ATENCIÓN Y CONCENTRACIÓN
              </div>
              <h1 className="text-slate-900 mb-4 tracking-tight" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                Memoria Secuencial
              </h1>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed" style={{ fontSize: '1.1rem' }}>
                Observa la secuencia de colores y repítela en el orden exacto.
                Mejora tu capacidad de atención selectiva.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white shadow-2xl shadow-emerald-500/5 text-center"
          >
            <h2 className="text-slate-800 mb-6" style={{ fontSize: 20, fontWeight: 800 }}>
              ¿Todo listo para empezar?
            </h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              La dificultad irá aumentando progresivamente a medida que aciertes.
              Mantén el foco en los colores y el sonido.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-white transition-all duration-300 shadow-xl shadow-emerald-500/20"
              style={{ backgroundColor: '#10b981', fontSize: 20, fontWeight: 700 }}
            >
              <Target style={{ width: 24, height: 24 }} />
              Comenzar Entrenamiento
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setGameStarted(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-semibold group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-slate-50 group-hover:border-slate-200 transition-all">
              <ArrowLeft style={{ width: 16, height: 16 }} />
            </div>
            Salir
          </button>

          <div
            className="px-4 py-1.5 rounded-full text-white shadow-md shadow-emerald-500/10"
            style={{ backgroundColor: '#10b981', fontSize: 13, fontWeight: 700 }}
          >
            Nivel {level || 1}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Nivel', value: level || '1', icon: BarChart2 },
            { label: 'Secuencia', value: sequence.length ? `${sequence.length}` : '—', icon: Target },
            { label: 'Récord', value: highScore || '0', icon: Sparkles },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/80 backdrop-blur-md rounded-2xl p-4 text-center border border-slate-100 shadow-sm">
              <p className="text-slate-900" style={{ fontSize: 24, fontWeight: 800 }}>
                {value}
              </p>
              <div className="flex items-center justify-center gap-1.5 text-slate-400 mt-1">
                <Icon style={{ width: 12, height: 12 }} />
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          animate={{ 
            scale: phase === 'correct' ? [1, 1.02, 1] : 1,
            backgroundColor: 
              phase === 'wrong' ? '#FEF2F2' : 
              phase === 'correct' ? '#F0FDF4' : 
              phase === 'showing' ? '#EFF6FF' : '#FFFFFF'
          }}
          className="rounded-[2rem] px-6 py-6 text-center mb-8 border shadow-sm min-h-[5rem] flex items-center justify-center transition-colors duration-300"
          style={{
            borderColor:
              phase === 'wrong' ? '#FECACA' :
              phase === 'correct' ? '#BBF7D0' :
              phase === 'showing' ? '#BFDBFE' : '#F1F5F9',
            color:
              phase === 'wrong' ? '#B91C1C' :
              phase === 'correct' ? '#15803D' :
              phase === 'showing' ? '#1D4ED8' : '#64748b',
          }}
        >
          <div className="flex items-center gap-3">
            {phase === 'showing' && <Eye className="animate-pulse" style={{ width: 20, height: 20 }} />}
            {phase === 'player' && <MousePointer className="animate-bounce" style={{ width: 20, height: 20 }} />}
            <span style={{ fontSize: 18, fontWeight: 700 }}>{statusMsg}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 mb-10">
          {BUTTONS.map(({ id, label, normal, lit, text }) => {
            const isLit = activeBtn === id;

            return (
              <motion.button
                key={id}
                whileTap={phase === 'player' ? { scale: 0.92 } : {}}
                onClick={() => void handleButtonPress(id)}
                disabled={phase !== 'player'}
                className="relative rounded-[2.5rem] flex flex-col items-center justify-center gap-2 select-none overflow-hidden group"
                style={{
                  backgroundColor: isLit ? lit : normal,
                  height: 130,
                  cursor: phase === 'player' ? 'pointer' : 'default',
                  border: 'none',
                  boxShadow: isLit 
                    ? `0 0 40px 10px ${normal}66, inset 0 4px 12px rgba(255,255,255,0.3)` 
                    : `0 10px 25px -5px ${normal}44`,
                }}
              >
                {/* Internal Glow Effect */}
                <div className={`absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLit ? 'opacity-100' : ''}`} />
                
                <span className="relative z-10" style={{ fontSize: 22, fontWeight: 800, color: isLit ? text : '#fff', letterSpacing: '-0.02em' }}>
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {phase === 'player' && sequence.length > 0 && (
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
            {sequence.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: i === playerPos ? 1.5 : 1 }}
                className="w-3.5 h-3.5 rounded-full shadow-sm"
                style={{
                  backgroundColor:
                    i < playerPos ? '#10b981' : i === playerPos ? '#3b82f6' : '#E2E8F0',
                }}
              />
            ))}
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {phase === 'wrong' ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="flex items-center gap-3 px-10 py-5 rounded-2xl text-white transition-all shadow-xl shadow-blue-500/20"
              style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 800 }}
            >
              <RotateCcw style={{ width: 22, height: 22 }} />
              Intentar de nuevo
            </motion.button>
          ) : (
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 border border-slate-200 hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-all font-bold text-sm bg-white/50"
            >
              <RotateCcw style={{ width: 16, height: 16 }} />
              Reiniciar sesión
            </button>
          )}
        </div>

        <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <Brain style={{ width: 20, height: 20, color: '#10b981' }} />
            <p style={{ fontSize: 18, fontWeight: 800 }}>Guía rápida</p>
          </div>
          <ul className="space-y-4">
            {[
              'Observa con atención el patrón de colores que se ilumina.',
              'Espera a que sea tu turno para pulsar los botones.',
              'Repite la secuencia exacta para avanzar al siguiente nivel.',
              'Cada acierto añade un nuevo paso a la secuencia.'
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-slate-500 leading-relaxed" style={{ fontSize: 15 }}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  {i + 1}
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}