/**
 * Utilidades de lógica de juego para MenteActiva
 * Estas funciones se extraen para permitir pruebas unitarias exhaustivas.
 */

// --- Lógica de Memoria Visual ---

export interface CardItem {
  id: number;
  imageId: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function createDeck(pairCount: number, availableImages: string[]): CardItem[] {
  const selectedImages = availableImages.slice(0, pairCount);
  const deck: CardItem[] = [];
  
  selectedImages.forEach((img, index) => {
    // Crear dos cartas por cada imagen
    deck.push({ id: index * 2, imageId: img, isFlipped: false, isMatched: false });
    deck.push({ id: index * 2 + 1, imageId: img, isFlipped: false, isMatched: false });
  });
  
  return shuffleArray(deck);
}

// --- Lógica de Cálculo ---

export function generateOptions(answer: number, difficulty: 'facil' | 'medio' | 'dificil'): number[] {
  const spread = difficulty === 'facil' ? 5 : difficulty === 'medio' ? 10 : 20;
  const optionsSet = new Set<number>([answer]);
  
  while (optionsSet.size < 4) {
    const offset = Math.floor(Math.random() * (spread * 2)) - spread;
    const option = answer + offset;
    if (option > 0 && !optionsSet.has(option)) {
      optionsSet.add(option);
    }
  }
  
  return shuffleArray(Array.from(optionsSet));
}

export function checkCalculation(num1: number, num2: number, op: string, result: number): boolean {
  switch (op) {
    case '+': return num1 + num2 === result;
    case '−': return num1 - num2 === result;
    case '×': return num1 * num2 === result;
    default: return false;
  }
}
