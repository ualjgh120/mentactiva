import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, RotateCcw, CheckCircle, XCircle, Calculator,
  Sparkles, Brain, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { saveSession } from '../utils/stats';
import { generateOptions } from '../utils/gameUtils';
import { GamePhase, Question } from '../types/game';

type Difficulty = 'facil' | 'medio' | 'dificil';
type Operator = '+' | '−' | '×';

interface CalculoQuestion extends Question {
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
  display: string;
}

const TOTAL_QUESTIONS = 10;

function generateProblem(difficulty: Difficulty): CalculoQuestion {
  let num1: number, num2: number, operator: Operator, answer: number;

  if (difficulty === 'facil') {
    operator = '+';
    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;
    answer = num1 + num2;
  } else if (difficulty === 'medio') {
    const ops: Operator[] = ['+', '−'];
    operator = ops[Math.floor(Math.random() * ops.length)];
    if (operator === '+') {
      num1 = Math.floor(Math.random() * 20) + 5;
      num2 = Math.floor(Math.random() * 20) + 5;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 20) + 10;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    }
  } else {
    const ops: Operator[] = ['+', '−', '×'];
    operator = ops[Math.floor(Math.random() * ops.length)];
    if (operator === '+') {
      num1 = Math.floor(Math.random() * 40) + 10;
      num2 = Math.floor(Math.random() * 40) + 10;
      answer = num1 + num2;
    } else if (operator === '−') {
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    } else {
      num1 = Math.floor(Math.random() * 9) + 2;
      num2 = Math.floor(Math.random() * 9) + 2;
      answer = num1 * num2;
    }
  }

  const id = `${num1}-${operator}-${num2}`;
  return { id, text: `${num1} ${operator} ${num2}`, num1, num2, operator, answer, display: `${num1} ${operator} ${num2}` };
}

// La función generateOptions ahora se importa de ../utils/gameUtils

function pickMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  facil: 'Fácil',
  medio: 'Medio',
  dificil: 'Difícil',
};
const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  facil: '#16A34A',
  medio: '#D97706',
  dificil: '#DC2626',
};
const CORRECT_MSGS = ['¡Correcto! 🎉', '¡Muy bien! ⭐', '¡Excelente! 🌟', '¡Perfecto! 👏', '¡Así se hace! 💪'];
const WRONG_MSGS = ['Casi… La respuesta era', 'No pasa nada. Era', '¡Sigue intentándolo! Era'];

export function CalculoBasico() {
  const [phase, setPhase] = useState<GamePhase>(GamePhase.SELECT);
  const [difficulty, setDifficulty] = useState<Difficulty>('facil');
  const [problem, setProblem] = useState<CalculoQuestion | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const nextQuestion = useCallback((diff: Difficulty = difficulty) => {
    const p = generateProblem(diff);
    setProblem(p);
    setOptions(generateOptions(p.answer, diff));
    setSelected(null);
    setIsCorrect(null);
    setFeedback('');
    setIsTransitioning(false);
  }, [difficulty]);

  const startGame = (diff: Difficulty) => {
    setDifficulty(diff);
    setScore(0);
    setQuestion(0);
    nextQuestion(diff);
    setStartTime(Date.now());
    setPhase(GamePhase.PLAYING);
  };

  const handleAnswer = (opt: number) => {
    if (selected !== null || isTransitioning || !problem) return;
    setSelected(opt);
    setIsTransitioning(true);

    const correct = opt === problem.answer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback(pickMessage(CORRECT_MSGS));
      setScore((s) => s + 1);
      if ((question + 1) % 5 === 0) confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      setFeedback(`${pickMessage(WRONG_MSGS)} ${problem.answer}`);
    }

    const nextQ = question + 1;
    setTimeout(async () => {
      if (nextQ >= TOTAL_QUESTIONS) {
        setPhase(GamePhase.FINISHED);

        const endTime = Date.now();
        const durationSec = Math.max(1, Math.round((endTime - startTime) / 1000));

        await saveSession({
          exercise: 'calculo',
          exerciseName: 'Cálculo Mental',
          score: correct ? score + 1 : score,
          level: difficulty === 'facil' ? 1 : difficulty === 'medio' ? 2 : 3,
          duration: durationSec,
        });

        if ((correct ? score + 1 : score) >= 8) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        }
      } else {
        setQuestion(nextQ);
        nextQuestion(difficulty);
      }
    }, 1600);
  };

  // ── Select screen ────────────────────────────────────────────────────────
  if (phase === GamePhase.SELECT) {
    return (
      <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-amber-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-rose-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              to="/ejercicios"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-12 transition-all font-semibold group"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-100 group-hover:text-amber-600 transition-all">
                <ArrowLeft style={{ width: 16, height: 16 }} />
              </div>
              Volver a ejercicios
            </Link>
          </motion.div>

          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-gradient-to-br from-amber-500 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20"
            >
              <Calculator className="text-white" style={{ width: 40, height: 40 }} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 shadow-sm border border-amber-100 bg-white"
                style={{ color: '#f59e0b', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}
              >
                <Sparkles style={{ width: 12, height: 12 }} />
                RAZONAMIENTO NUMÉRICO
              </div>
              <h1 className="text-slate-900 mb-4 tracking-tight" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                Cálculo Mental
              </h1>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed" style={{ fontSize: '1.1rem' }}>
                Resuelve {TOTAL_QUESTIONS} operaciones matemáticas seleccionando la respuesta correcta.
                ¡Agilidad y precisión!
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-2xl shadow-amber-500/5"
          >
            <h2 className="text-slate-800 mb-8 text-center" style={{ fontSize: 20, fontWeight: 800 }}>
              Selecciona tu nivel
            </h2>

            <div className="grid gap-4">
              {(['facil', 'medio', 'dificil'] as Difficulty[]).map((d, idx) => (
                <motion.button
                  key={d}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onClick={() => startGame(d)}
                  className="group w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] border border-slate-100 text-left transition-all duration-300 hover:shadow-lg bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md" 
                      style={{ backgroundColor: DIFFICULTY_COLOR[d] }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-slate-900" style={{ fontSize: 18, fontWeight: 700 }}>
                        {DIFFICULTY_LABEL[d]}
                      </p>
                      <p className="text-slate-400 font-medium" style={{ fontSize: 14 }}>
                        {d === 'facil' ? 'Operaciones básicas' : d === 'medio' ? 'Cifras intermedias' : 'Cifras avanzadas'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 font-bold text-sm uppercase">
                    Jugar
                    <ChevronRight style={{ width: 16, height: 16 }} />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Finished screen ──────────────────────────────────────────────────────
  if (phase === GamePhase.FINISHED) {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-amber-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-rose-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-7xl mb-8"
          >
            {pct >= 80 ? '🏆' : pct >= 50 ? '🌟' : '💪'}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-slate-900 mb-2" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              {pct >= 80 ? '¡Fantástico!' : pct >= 50 ? '¡Bien hecho!' : '¡Sigue así!'}
            </h1>
            <p className="text-slate-500 mb-10" style={{ fontSize: '1.2rem' }}>
              Has completado el entrenamiento de cálculo con un resultado notable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-2xl shadow-amber-500/5 mb-10"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500 font-bold uppercase tracking-wider" style={{ fontSize: 13 }}>Puntuación Final</span>
              <span className="text-slate-900" style={{ fontSize: 28, fontWeight: 800 }}>{score} / {TOTAL_QUESTIONS}</span>
            </div>
            
            <div className="relative bg-slate-100 rounded-full h-4 overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full shadow-inner"
                style={{ backgroundColor: pct >= 80 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#2563eb' }}
              />
            </div>
            
            <div className="flex justify-between items-center text-slate-400 font-bold" style={{ fontSize: 14 }}>
              <span>0%</span>
              <span className="text-slate-800" style={{ fontSize: 18 }}>{pct}%</span>
              <span>100%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => startGame(difficulty)}
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl text-white transition-all hover:scale-105 shadow-xl shadow-amber-500/20"
              style={{ backgroundColor: '#f59e0b', fontSize: 18, fontWeight: 800 }}
            >
              <RotateCcw style={{ width: 22, height: 22 }} />
              Repetir nivel
            </button>
            <button
              onClick={() => setPhase(GamePhase.SELECT)}
              className="flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300 transition-all font-bold bg-white/50"
              style={{ fontSize: 18 }}
            >
              Cambiar nivel
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Playing ──────────────────────────────────────────────────────────────
  if (!problem) return null;
  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-semibold group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-slate-50 group-hover:border-amber-100 transition-all">
              <ArrowLeft style={{ width: 16, height: 16 }} />
            </div>
            Salir
          </button>
          <div 
            className="px-4 py-1.5 rounded-full text-white shadow-md shadow-amber-500/10 uppercase tracking-wider" 
            style={{ backgroundColor: DIFFICULTY_COLOR[difficulty], fontSize: 11, fontWeight: 800 }}
          >
            {DIFFICULTY_LABEL[difficulty]}
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 border border-slate-100 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-400 font-bold uppercase" style={{ fontSize: 12 }}>Pregunta</span>
              <span className="text-slate-900 font-extrabold" style={{ fontSize: 16 }}>{question + 1} / {TOTAL_QUESTIONS}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <CheckCircle style={{ width: 14, height: 14, color: '#10b981' }} />
              <span className="text-green-700 font-bold" style={{ fontSize: 14 }}>{score} aciertos</span>
            </div>
          </div>
          <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((question + 1) / TOTAL_QUESTIONS) * 100}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: '#f59e0b' }}
            />
          </div>
        </div>

        {/* Problem Display */}
        <motion.div
          key={problem.display}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border-2 flex items-center justify-center mb-8 shadow-xl shadow-amber-500/5 relative overflow-hidden"
          style={{ height: 180, borderColor: '#FEF3C7' }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-100/50" />
          <p className="text-slate-900" style={{ fontSize: 'clamp(3.5rem, 12vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
            {problem.display} <span className="text-amber-500">=</span> ?
          </p>
        </motion.div>

        {/* Feedback Area */}
        <div className="h-16 flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={feedback ? { scale: 1, opacity: 1 } : {}}
          >
            {feedback && (
              <div
                className="flex items-center gap-3 px-6 py-3 rounded-full shadow-lg shadow-black/5"
                style={{
                  backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
                  border: `1px solid ${isCorrect ? '#BBF7D0' : '#FECACA'}`,
                  color: isCorrect ? '#15803D' : '#B91C1C',
                }}
              >
                {isCorrect
                  ? <CheckCircle style={{ width: 20, height: 20 }} strokeWidth={3} />
                  : <XCircle style={{ width: 20, height: 20 }} strokeWidth={3} />
                }
                <span style={{ fontSize: 18, fontWeight: 800 }}>{feedback}</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {options.map((opt) => {
            const isSelected = selected === opt;
            const isRight = opt === problem.answer;
            
            return (
              <motion.button
                key={opt}
                whileHover={selected === null ? { scale: 1.03, y: -2 } : {}}
                whileTap={selected === null ? { scale: 0.97 } : {}}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                className="rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-center relative overflow-hidden group shadow-sm"
                style={{
                  height: 100,
                  backgroundColor: isSelected ? (isRight ? '#F0FDF4' : '#FEF2F2') : (selected !== null && isRight ? '#F0FDF4' : '#FFFFFF'),
                  borderColor: isSelected ? (isRight ? '#22C55E' : '#EF4444') : (selected !== null && isRight ? '#22C55E' : '#F1F5F9'),
                  color: isSelected ? (isRight ? '#15803D' : '#B91C1C') : (selected !== null && isRight ? '#15803D' : '#1e293b'),
                }}
              >
                {selected === null && (
                  <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative z-10" style={{ fontSize: '2.5rem', fontWeight: 900 }}>
                  {opt}
                </span>
                
                {isSelected && isRight && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3 text-green-500">
                    <CheckCircle style={{ width: 16, height: 16 }} strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Game Guide */}
        <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <Brain style={{ width: 20, height: 20, color: '#f59e0b' }} />
            <p style={{ fontSize: 18, fontWeight: 800 }}>Trucos rápidos</p>
          </div>
          <ul className="space-y-4">
            {[
              'Visualiza los números en tu mente antes de mirar las opciones.',
              'No te precipites, tienes tiempo para pensar cada respuesta.',
              'Practica diariamente para mejorar tu agilidad mental.',
              'Comienza por el nivel fácil para ganar confianza.'
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-slate-500 leading-relaxed" style={{ fontSize: 15 }}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                  {i + 1}
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-slate-100 shadow-2xl text-center"
          >
            <h3 className="text-slate-900 mb-2 font-extrabold text-2xl">¿Seguro que quieres salir?</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Si sales ahora, no se guardará el progreso de esta partida.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-6 py-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition-all text-base flex-1"
              >
                Continuar
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  setPhase(GamePhase.SELECT);
                }}
                className="px-6 py-3.5 rounded-xl bg-red-600 text-white hover:bg-red-700 font-bold transition-all text-base flex-1"
              >
                Salir
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
