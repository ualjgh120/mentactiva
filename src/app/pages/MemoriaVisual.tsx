import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
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
    if (!gameStarted || selectedIds.length !== 2) return;

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
      <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <Link
            to="/ejercicios"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors"
          >
            <ArrowLeft style={{ width: 18, height: 18 }} />
            Volver a ejercicios
          </Link>

          <div className="text-center mb-10">
            <div className="text-6xl mb-4">🧩</div>
            <h1 className="text-slate-800 mb-3" style={{ fontSize: 34, fontWeight: 700 }}>
              Memoria Visual
            </h1>
            <p className="text-slate-500 max-w-md mx-auto" style={{ fontSize: 17, lineHeight: 1.6 }}>
              Encuentra las parejas iguales recordando dónde está cada carta.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h2
              className="text-slate-700 mb-6 text-center"
              style={{ fontSize: 22, fontWeight: 700 }}
            >
              Elige la dificultad
            </h2>

            <div className="grid gap-4">
              {[
                { lvl: 1, title: 'Fácil', desc: '4 parejas' },
                { lvl: 2, title: 'Media', desc: '6 parejas' },
                { lvl: 3, title: 'Difícil', desc: '8 parejas' },
              ].map((item) => (
                <button
                  key={item.lvl}
                  onClick={() => startGame(item.lvl)}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-white"
                  style={{ borderColor: '#BFDBFE' }}
                >
                  <div>
                    <p className="text-slate-800" style={{ fontSize: 20, fontWeight: 700 }}>
                      {item.title}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: 15 }}>
                      {item.desc}
                    </p>
                  </div>
                  <span
                    className="px-4 py-2 rounded-xl text-white"
                    style={{ backgroundColor: '#2563EB', fontSize: 15, fontWeight: 600 }}
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

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setGameStarted(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft style={{ width: 18, height: 18 }} />
            Salir
          </button>

          <span
            className="px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: '#2563EB', fontSize: 13, fontWeight: 600 }}
          >
            Nivel {level}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Movimientos', value: moves },
            { label: 'Parejas', value: `${matches}/${config.pairCount}` },
            { label: 'Estado', value: completed ? 'Completado' : 'Jugando' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-3 text-center border border-slate-200"
            >
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
          className="rounded-2xl px-5 py-4 text-center mb-6 border"
          style={{
            backgroundColor: completed ? '#F0FDF4' : '#EFF6FF',
            borderColor: completed ? '#BBF7D0' : '#BFDBFE',
            color: completed ? '#15803D' : '#1D4ED8',
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            {completed
              ? '¡Muy bien! Has encontrado todas las parejas.'
              : 'Descubre dos cartas y busca su pareja.'}
          </span>
        </div>

        <div
          className="grid gap-4 mb-8"
          style={{ gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))` }}
        >
          {cards.map((card) => {
            const showFront = card.flipped || card.matched;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="aspect-square rounded-3xl border-2 transition-all duration-200 flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: showFront ? '#FFFFFF' : '#2563EB',
                  borderColor: card.matched ? '#22C55E' : '#BFDBFE',
                  transform: showFront ? 'scale(0.98)' : 'scale(1)',
                  fontSize: showFront ? 36 : 28,
                  fontWeight: 700,
                  color: showFront ? '#0F172A' : '#FFFFFF',
                }}
              >
                {showFront ? card.value : '?'}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restartGame}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all"
            style={{ fontSize: 15, fontWeight: 600 }}
          >
            <RotateCcw style={{ width: 16, height: 16 }} />
            Reiniciar
          </button>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-5 border border-slate-200">
          <p className="text-slate-700 mb-3" style={{ fontSize: 16, fontWeight: 700 }}>
            ¿Cómo se juega?
          </p>
          <ol className="text-slate-500 space-y-2" style={{ fontSize: 15, paddingLeft: 20 }}>
            <li>1. Pulsa una carta para descubrirla.</li>
            <li>2. Pulsa una segunda carta.</li>
            <li>3. Si ambas son iguales, se quedarán visibles.</li>
            <li>4. Si no coinciden, se volverán a ocultar.</li>
            <li>5. Encuentra todas las parejas para completar el nivel.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}