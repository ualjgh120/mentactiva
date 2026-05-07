import { describe, it, expect } from 'vitest';
import { shuffleArray, createDeck, generateOptions, checkCalculation } from '../app/utils/gameUtils';

describe('Game Logic (MenteActiva)', () => {
  
  describe('shuffleArray', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it('debe mantener la misma longitud', () => {
      expect(shuffleArray(data)).toHaveLength(10);
    });

    it('debe contener los mismos elementos', () => {
      const shuffled = shuffleArray(data);
      data.forEach(item => expect(shuffled).toContain(item));
    });

    it('no debe mutar el array original', () => {
      const original = [...data];
      shuffleArray(data);
      expect(data).toEqual(original);
    });
    
    it('debe producir resultados diferentes en ejecuciones sucesivas', () => {
      const res1 = shuffleArray(data);
      const res2 = shuffleArray(data);
      expect(res1).not.toEqual(res2);
    });
  });

  describe('createDeck', () => {
    const images = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝'];

    it('debe generar un mazo con el doble de cartas que parejas', () => {
      expect(createDeck(3, images)).toHaveLength(6);
    });

    it('todas las cartas deben empezar sin voltear', () => {
      const deck = createDeck(4, images);
      deck.forEach(card => expect(card.isFlipped).toBe(false));
    });

    it('todas las cartas deben empezar sin emparejar', () => {
      const deck = createDeck(4, images);
      deck.forEach(card => expect(card.isMatched).toBe(false));
    });

    it('cada imageId debe aparecer exactamente dos veces', () => {
      const deck = createDeck(3, images);
      const counts = deck.reduce((acc, card) => {
        acc[card.imageId] = (acc[card.imageId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      Object.values(counts).forEach(count => expect(count).toBe(2));
    });

    it('debe generar IDs únicos para cada carta', () => {
      const deck = createDeck(6, images);
      const ids = new Set(deck.map(c => c.id));
      expect(ids.size).toBe(12);
    });
  });

  describe('generateOptions', () => {
    it('debe devolver exactamente 4 opciones', () => {
      expect(generateOptions(10, 'facil')).toHaveLength(4);
    });

    it('la respuesta correcta debe estar incluida en las opciones', () => {
      const ans = 42;
      expect(generateOptions(ans, 'medio')).toContain(ans);
    });

    it('todas las opciones deben ser únicas', () => {
      const options = generateOptions(15, 'dificil');
      expect(new Set(options).size).toBe(4);
    });

    it('no debe generar números negativos', () => {
      const options = generateOptions(1, 'facil');
      options.forEach(opt => expect(opt).toBeGreaterThan(0));
    });
  });

  describe('checkCalculation', () => {
    it('debe validar sumas correctamente', () => {
      expect(checkCalculation(5, 7, '+', 12)).toBe(true);
    });

    it('debe validar restas correctamente', () => {
      expect(checkCalculation(10, 4, '−', 6)).toBe(true);
    });

    it('debe validar multiplicaciones correctamente', () => {
      expect(checkCalculation(3, 8, '×', 24)).toBe(true);
    });

    it('debe invalidar resultados incorrectos', () => {
      expect(checkCalculation(2, 2, '+', 5)).toBe(false);
    });
  });
});
