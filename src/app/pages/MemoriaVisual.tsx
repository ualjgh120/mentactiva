import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, LayoutGrid, Brain, Sparkles, Clock, BarChart2, ChevronRight, MousePointer, CheckCircle, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { saveSession } from '../utils/stats';
import { createDeck, CardItem } from '../utils/gameUtils';

const EMOJIS = ['🍎', '🐶', '🚗', '🌙', '🎈', '⭐', '🍀', '🎵'];

function getConfig(level: number) {
  if (level === 1) return { pairCount: 4, columns: 4 };
  if (level === 2) return { pairCount: 6, columns: 4 };
  return { pairCount: 8, columns: 4 };
}

export function MemoriaVisual() {
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const config = useMemo(() => getConfig(level), [level]);

  useEffect(() => {
    if (gameStarted) {
      setCards(createDeck(config.pairCount, EMOJIS));
      setSelectedIds([]);
      setMoves(0);
      setMatches(0);
      setIsChecking(false);
      setCompleted(false);
    }
  }, [config.pairCount, gameStarted]);

  useEffect(() => {
    if (!gameStarted || selectedIds.length !== 2 || isChecking) return;

    const [firstId, secondId] = selectedIds;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);

    if (!firstCard || !secondCard) return;

    setIsChecking(true);

    if (firstCard.imageId === secondCard.imageId) {
      const timeout = setTimeout(async () => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );

        const newMatches = matches + 1;
        setMatches(newMatches);
        setSelectedIds([]);
        setIsChecking(false);

        if (newMatches === config.pairCount) {
          setCompleted(true);

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });

          await saveSession({
            exercise: 'memoria-visual',
            exerciseName: 'Memoria Visual',
            score: config.pairCount,
            level,
            duration: 1,
          });
        }
      }, 700);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setSelectedIds([]);
        setIsChecking(false);
      }, 900);

      return () => clearTimeout(timeout);
    }
  }, [selectedIds, cards, matches, config.pairCount, gameStarted, level]);

  const startGame = (newLevel: number) => {
    setLevel(newLevel);
    setGameStarted(true);
  };

  const restartGame = () => {
    setCards(createDeck(config.pairCount, EMOJIS));
    setSelectedIds([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
    setCompleted(false);
  };

  const handleCardClick = (card: CardItem) => {
    if (
      isChecking ||
      card.isFlipped ||
      card.isMatched ||
      selectedIds.length >= 2 ||
      completed
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );

    setSelectedIds((prev) => [...prev, card.id]);

    if (selectedIds.length === 1) {
      setMoves((prev) => prev + 1);
    }
  };

  if (!gameStarted) {
    return (
      <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              to="/ejercicios"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-12 transition-all font-semibold group"
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
                <ArrowLeft style={{ width: 16, height: 16 }} />
              </div>
              Volver a ejercicios
            </Link>
          </motion.div>

          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-200">
              <LayoutGrid className="text-white w-10 h-10" />
            </motion.div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Memoria Visual</h1>
            <p className="text-lg text-slate-500 font-medium max-w-md mx-auto">Entrena tu retentiva visual encontrando las parejas de imágenes ocultas.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {(['1', '2', '3'] as const).map((l, i) => (
              <motion.button
                key={l}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => startGame(Number(l))}
                className="group relative p-6 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all text-left"
              >
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Nivel {l}</div>
                <div className="text-xl font-black text-slate-900 mb-4">{l === '1' ? 'Inicial' : l === '2' ? 'Intermedio' : 'Avanzado'}</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-400 group-hover:text-blue-500 transition-colors">Comenzar</span>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <Link
            to="/ejercicios"
            className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-all font-bold"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
              <ArrowLeft style={{ width: 20, height: 20 }} />
            </div>
            Salir
          </Link>

          <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Nivel {level}</span>
            <div className="w-[1px] h-4 bg-slate-200 mx-2" />
            <span className="text-slate-900 font-black text-lg">{moves} <span className="text-slate-400 text-sm font-bold uppercase ml-1">movimientos</span></span>
          </div>

          <div className="flex items-center gap-3 bg-blue-600 px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/20">
            <Target className="text-blue-200 w-5 h-5" />
            <span className="text-white font-black text-lg">{matches} / {config.pairCount}</span>
          </div>
        </div>

        <div
          className="grid gap-4 mb-10"
          style={{ gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))` }}
        >
          {cards.map((card) => {
            const showFront = card.isFlipped || card.isMatched;

            return (
              <motion.button
                key={card.id}
                whileHover={!showFront && !completed ? { scale: 1.05, y: -2 } : {}}
                whileTap={!showFront && !completed ? { scale: 0.95 } : {}}
                onClick={() => handleCardClick(card)}
                className={`aspect-square rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-center shadow-sm overflow-hidden relative`}
                style={{
                  backgroundColor: showFront ? '#FFFFFF' : '#2563EB',
                  borderColor: card.isMatched ? '#22C55E' : showFront ? '#E2E8F0' : '#3b82f6',
                  cursor: showFront || completed ? 'default' : 'pointer',
                }}
              >
                {!showFront && (
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px]" />
                )}
                
                <span className="relative z-10" style={{ fontSize: showFront ? '2.5rem' : '1.5rem', fontWeight: 800, color: showFront ? '#0F172A' : '#FFFFFF' }}>
                  {showFront ? card.imageId : '?'}
                </span>

                {card.isMatched && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle style={{ width: 12, height: 12 }} strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={restartGame}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-500 border border-slate-200 hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-all font-bold text-sm bg-white/50"
          >
            <RotateCcw style={{ width: 16, height: 16 }} />
            Reiniciar sesión
          </button>
        </div>

        <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-slate-800">
            <Brain style={{ width: 20, height: 20, color: '#2563EB' }} />
            <p style={{ fontSize: 18, fontWeight: 800 }}>Guía de juego</p>
          </div>
          <ul className="space-y-4">
            {[
              'Pulsa sobre una carta para revelar la imagen que oculta.',
              'Busca su pareja pulsando en otra carta del tablero.',
              'Si las imágenes coinciden, se quedarán descubiertas.',
              'El objetivo es emparejar todas las cartas con el menor número de movimientos.'
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-slate-500 leading-relaxed" style={{ fontSize: 15 }}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}