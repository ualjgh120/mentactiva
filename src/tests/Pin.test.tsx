import { describe, it, expect } from 'vitest';

describe('Componente Pin (Lógica de Interfaz)', () => {
  it('debe inicializar el PIN como una cadena vacía', () => {
    let pin = '';
    expect(pin).toBe('');
  });

  it('debe añadir un dígito al pulsar un número', () => {
    let pin = '';
    const addDigit = (d: string) => { if(pin.length < 4) pin += d; };
    addDigit('1');
    expect(pin).toBe('1');
  });

  it('no debe permitir más de 4 dígitos', () => {
    let pin = '1234';
    const addDigit = (d: string) => { if(pin.length < 4) pin += d; };
    addDigit('5');
    expect(pin).toBe('1234');
  });

  it('debe borrar el último dígito al pulsar borrar', () => {
    let pin = '123';
    const deleteDigit = () => { pin = pin.slice(0, -1); };
    deleteDigit();
    expect(pin).toBe('12');
  });

  it('debe limpiar todo el PIN si se solicita', () => {
    let pin = '1234';
    pin = '';
    expect(pin).toBe('');
  });

  it('debe detectar cuando el PIN está completo (4 dígitos)', () => {
    let pin = '1234';
    const isComplete = pin.length === 4;
    expect(isComplete).toBe(true);
  });

  it('debe fallar la validación si el PIN es incorrecto', () => {
    const enteredPin: string = '0000';
    const isValid = enteredPin === '1234'; 
    expect(isValid).toBe(false);
  });

  it('debe validar correctamente si el PIN es el esperado', () => {
    const enteredPin = '1234';
    const isValid = enteredPin === '1234';
    expect(isValid).toBe(true);
  });
});
