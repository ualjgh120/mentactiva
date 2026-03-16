import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveSession } from '../utils/stats';

type Difficulty = 'facil' | 'medio' | 'dificil';
type Operator = '+' | '−' | '×';
type Phase = 'select' | 'playing' | 'finished';

interface Problem {
  num1: number;
  num2: number;
  operator: Operator;
  answer: number;
  display: string;
}

const TOTAL_QUESTIONS = 10;

function generateProblem(difficulty: Difficulty): Problem {
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

  return { num1, num2, operator, answer, display: `${num1} ${operator} ${num2}` };
}

function generateOptions(answer: number, difficulty: Difficulty): number[] {
  const spread = difficulty === 'facil' ? 5 : difficulty === 'medio' ? 10 : 20;
  const opts = new Set<number>([answer]);
  let attempts = 0;
  while (opts.size < 4 && attempts < 100) {
    attempts++;
    const delta = Math.floor(Math.random() * spread) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;
    const opt = answer + sign * delta;
    if (opt > 0 && opt !== answer) opts.add(opt);
  }
  // Fallback fill
  let fill = 1;
  while (opts.size < 4) { if (!opts.has(fill)) opts.add(fill); fill++; }
  return [...opts].sort(() => Math.random() - 0.5);
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
  const [phase, setPhase] = useState<Phase>('select');
  const [difficulty, setDifficulty] = useState<Difficulty>('facil');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    setPhase('playing');
  };

  const handleAnswer = (opt: number) => {
    if (selected !== null || isTransitioning || !problem) return;
    setSelected(opt);
    setIsTransitioning(true);

    const correct = opt === problem.answer;
    setIsCorrect(correct);

    if (correct) {
      const msg = CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)];
      setFeedback(msg);
      setScore((s) => s + 1);
      if ((question + 1) % 5 === 0) confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      const msg = WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)];
      setFeedback(`${msg} ${problem.answer}`);
    }

    const nextQ = question + 1;
    setTimeout(async () => {
      if (nextQ >= TOTAL_QUESTIONS) {
        setPhase('finished');

        await saveSession({
          exercise: 'calculo',
          exerciseName: 'Cálculo Mental',
          score: correct ? score + 1 : score,
          level: difficulty === 'facil' ? 1 : difficulty === 'medio' ? 2 : 3,
          duration: 1,
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
  if (phase === 'select') {
    return (
      <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <Link to="/ejercicios" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors">
            <ArrowLeft style={{ width: 18, height: 18 }} />
            Volver a ejercicios
          </Link>
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">🔢</div>
            <h1 className="text-slate-800 mb-3" style={{ fontSize: 34, fontWeight: 700 }}>Cálculo Mental</h1>
            <p className="text-slate-500 max-w-md mx-auto" style={{ fontSize: 17, lineHeight: 1.6 }}>
              Resuelve {TOTAL_QUESTIONS} operaciones matemáticas eligiendo la respuesta correcta.
              ¡Sin prisa, piensa bien!
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-slate-700 mb-6 text-center" style={{ fontSize: 22, fontWeight: 700 }}>Elige la dificultad</h2>
            <div className="grid gap-4">
              {(['facil', 'medio', 'dificil'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => startGame(d)}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-white"
                  style={{ borderColor: DIFFICULTY_COLOR[d] + '60' }}
                >
                  <div>
                    <p className="text-slate-800" style={{ fontSize: 20, fontWeight: 700 }}>{DIFFICULTY_LABEL[d]}</p>
                    <p className="text-slate-500" style={{ fontSize: 15 }}>
                      {d === 'facil' ? 'Sumas hasta 18' : d === 'medio' ? 'Sumas y restas hasta 40' : 'Sumas, restas y multiplicaciones'}
                    </p>
                  </div>
                  <span
                    className="px-4 py-2 rounded-xl text-white"
                    style={{ backgroundColor: DIFFICULTY_COLOR[d], fontSize: 15, fontWeight: 600 }}
                  >
                    Jugar
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Finished screen ──────────────────────────────────────────────────────
  if (phase === 'finished') {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="text-7xl mb-5">{pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}</div>
          <h1 className="text-slate-800 mb-2" style={{ fontSize: 34, fontWeight: 700 }}>
            {pct >= 80 ? '¡Fantástico!' : pct >= 50 ? '¡Bien hecho!' : '¡Sigue practicando!'}
          </h1>
          <p className="text-slate-500 mb-8" style={{ fontSize: 18 }}>
            Has acertado {score} de {TOTAL_QUESTIONS} preguntas.
          </p>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-600" style={{ fontSize: 16 }}>Puntuación</span>
              <span className="text-slate-800" style={{ fontSize: 22, fontWeight: 700 }}>{score}/{TOTAL_QUESTIONS}</span>
            </div>
            <div className="bg-slate-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? '#16A34A' : pct >= 50 ? '#D97706' : '#2563EB' }}
              />
            </div>
            <p className="text-slate-500 mt-2 text-right" style={{ fontSize: 14 }}>{pct}%</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => startGame(difficulty)}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#2563EB', fontSize: 17, fontWeight: 600 }}
            >
              <RotateCcw style={{ width: 18, height: 18 }} /> Jugar otra vez
            </button>
            <button
              onClick={() => setPhase('select')}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
              style={{ fontSize: 17, fontWeight: 600 }}
            >
              Cambiar dificultad
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing ──────────────────────────────────────────────────────────────
  if (!problem) return null;
  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setPhase('select')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft style={{ width: 18, height: 18 }} />
            Salir
          </button>
          <span className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: DIFFICULTY_COLOR[difficulty], fontSize: 13, fontWeight: 600 }}>
            {DIFFICULTY_LABEL[difficulty]}
          </span>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-600" style={{ fontSize: 15 }}>Pregunta {question + 1} de {TOTAL_QUESTIONS}</span>
            <span className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>✅ {score} aciertos</span>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${((question + 1) / TOTAL_QUESTIONS) * 100}%`, backgroundColor: '#2563EB' }}
            />
          </div>
        </div>

        {/* Problem */}
        <div
          className="bg-white rounded-3xl border-2 flex items-center justify-center mb-6 shadow-sm"
          style={{ height: 160, borderColor: '#BFDBFE' }}
        >
          <p className="text-slate-800" style={{ fontSize: 'clamp(44px, 10vw, 64px)', fontWeight: 800, letterSpacing: 4 }}>
            {problem.display} = ?
          </p>
        </div>

        {/* Feedback */}
        <div className="h-12 flex items-center justify-center mb-4">
          {feedback && (
            <div
              className="flex items-center gap-2 px-5 py-2 rounded-full"
              style={{
                backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
                color: isCorrect ? '#15803D' : '#B91C1C',
              }}
            >
              {isCorrect
                ? <CheckCircle style={{ width: 18, height: 18 }} />
                : <XCircle style={{ width: 18, height: 18 }} />
              }
              <span style={{ fontSize: 16, fontWeight: 700 }}>{feedback}</span>
            </div>
          )}
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((opt) => {
            const isSelected = selected === opt;
            const isRight = opt === problem.answer;
            let bg = '#FFFFFF';
            let border = '#E2E8F0';
            let textColor = '#1E293B';
            if (selected !== null) {
              if (isRight) { bg = '#F0FDF4'; border = '#22C55E'; textColor = '#15803D'; }
              else if (isSelected && !isRight) { bg = '#FEF2F2'; border = '#EF4444'; textColor = '#B91C1C'; }
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                className="rounded-2xl border-2 transition-all duration-200 flex items-center justify-center"
                style={{
                  height: 88,
                  backgroundColor: bg,
                  borderColor: border,
                  color: textColor,
                  fontSize: 'clamp(24px, 5vw, 34px)',
                  fontWeight: 800,
                  cursor: selected !== null ? 'default' : 'pointer',
                  transform: isSelected ? 'scale(0.97)' : 'scale(1)',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
