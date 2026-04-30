import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw, LayoutGrid, Brain, Sparkles, Clock, BarChart2, ChevronRight, MousePointer, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { saveSession } from '../utils/stats';

type CardItem = {
  id: number;
  value: string;
  matched: boolean;
  flipped: boolean;
};

const EMOJIS = ['🍎', '🐶', '🚗', '🌙', '🎈', '⭐', '🍀', '🎵'];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function createDeck(pairCount: number): CardItem[] {
  const selected = EMOJIS.slice(0, pairCount);
  const duplicated = [...selected, ...selected];

  return shuffleArray(
    duplicated.map((value, index) => ({
      id: index + 1,
      value,
      matched: false,
      flipped: false,
    }))
  );
}

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
      setCards(createDeck(config.pairCount));
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

    if (firstCard.value === secondCard.value) {
      const timeout = setTimeout(async () => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
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
              ? { ...card, flipped: false }
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
    setCards(createDeck(config.pairCount));
    setSelectedIds([]);
    setMoves(0);
    setMatches(0);
    setIsChecking(false);
    setCompleted(false);
  };

  const handleCardClick = (card: CardItem) => {
    if (
      isChecking ||
      card.flipped ||
      card.matched ||
      selectedIds.length >= 2 ||
      completed
    ) {
      return;
    }

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

    setSelectedIds((prev) => [...prev, card.id]);

    if (selectedIds.length === 1) {
      setMoves((prev) => prev + 1);
    }
  };

  if (!gameStarted) {
    return (
      <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20"
            >
              <LayoutGrid className="text-white" style={{ width: 40, height: 40 }} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 shadow-sm border border-blue-100 bg-white"
                style={{ color: '#2563EB', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}
              >
                <Sparkles style={{ width: 12, height: 12 }} />
                MEMORIA Y RECONOCIMIENTO
              </div>
              <h1 className="text-slate-900 mb-4 tracking-tight" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                Memoria Visual
              </h1>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed" style={{ fontSize: '1.1rem' }}>
                Encuentra las parejas iguales recordando la posición de cada carta.
                Entrena tu retención a corto plazo.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-2xl shadow-blue-500/5"
          >
            <h2
              className="text-slate-800 mb-8 text-center"
              style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}
            >
              Selecciona el nivel de intensidad
            </h2>

            <div className="grid gap-4">
              {[
                { lvl: 1, title: 'Básico', desc: '4 parejas de cartas', color: '#6366f1' },
                { lvl: 2, title: 'Intermedio', desc: '6 parejas de cartas', color: '#8b5cf6' },
                { lvl: 3, title: 'Avanzado', desc: '8 parejas de cartas', color: '#a855f7' },
              ].map((item, idx) => (
                <motion.button
                  key={item.lvl}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  onClick={() => startGame(item.lvl)}
                  className="group w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] border border-slate-100 text-left transition-all duration-300 hover:shadow-lg hover:border-blue-100 bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-md" style={{ backgroundColor: item.color }}>
                      {item.lvl}
                    </div>
                    <div>
                      <p className="text-slate-900" style={{ fontSize: 18, fontWeight: 700 }}>
                        {item.title}
                      </p>
                      <p className="text-slate-400 font-medium" style={{ fontSize: 14 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 font-bold text-sm">
                    JUGAR
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

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setGameStarted(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-all font-semibold group"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:bg-slate-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all">
              <ArrowLeft style={{ width: 16, height: 16 }} />
            </div>
            Salir
          </button>

          <div
            className="px-4 py-1.5 rounded-full text-white shadow-md shadow-blue-500/10"
            style={{ backgroundColor: '#2563EB', fontSize: 13, fontWeight: 700 }}
          >
            Nivel {level}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Movimientos', value: moves, icon: MousePointer },
            { label: 'Parejas', value: `${matches}/${config.pairCount}`, icon: LayoutGrid },
            { label: 'Estado', value: completed ? '¡Éxito!' : 'En curso', icon: Sparkles },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center border border-slate-100 shadow-sm">
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
          animate={{ backgroundColor: completed ? '#F0FDF4' : '#EFF6FF' }}
          className="rounded-2xl px-6 py-4 text-center mb-8 border transition-colors duration-500"
          style={{
            borderColor: completed ? '#BBF7D0' : '#BFDBFE',
            color: completed ? '#15803D' : '#1D4ED8',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700 }}>
            {completed
              ? '¡Excelente trabajo! Has completado el ejercicio.'
              : 'Selecciona dos cartas y encuentra su pareja correspondiente.'}
          </span>
        </motion.div>

        <div
          className="grid gap-4 mb-10"
          style={{ gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))` }}
        >
          {cards.map((card) => {
            const showFront = card.flipped || card.matched;

            return (
              <motion.button
                key={card.id}
                whileHover={!showFront && !completed ? { scale: 1.05, y: -2 } : {}}
                whileTap={!showFront && !completed ? { scale: 0.95 } : {}}
                onClick={() => handleCardClick(card)}
                className={`aspect-square rounded-[2rem] border-2 transition-all duration-300 flex items-center justify-center shadow-sm overflow-hidden relative`}
                style={{
                  backgroundColor: showFront ? '#FFFFFF' : '#2563EB',
                  borderColor: card.matched ? '#22C55E' : showFront ? '#E2E8F0' : '#3b82f6',
                  cursor: showFront || completed ? 'default' : 'pointer',
                }}
              >
                {/* Back of the card pattern */}
                {!showFront && (
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:10px_10px]" />
                )}
                
                <span className="relative z-10" style={{ fontSize: showFront ? '2.5rem' : '1.5rem', fontWeight: 800, color: showFront ? '#0F172A' : '#FFFFFF' }}>
                  {showFront ? card.value : '?'}
                </span>

                {card.matched && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1"
                  >
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
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
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