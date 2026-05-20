import { useState } from 'react';

type CalcState = {
  display: string;
  operand: number | null;
  operator: string | null;
  waitingForOperand: boolean;
};

const initialState: CalcState = {
  display: '0',
  operand: null,
  operator: null,
  waitingForOperand: false,
};

function calculate(a: number, op: string, b: number): number {
  switch (op) {
    case '+': return a + b;
    case '−': return a - b;
    case '×': return a * b;
    case '÷': return b !== 0 ? a / b : NaN;
    default: return b;
  }
}

export function CalculatorPage() {
  const [state, setState] = useState<CalcState>(initialState);

  function inputDigit(digit: string) {
    setState((s) => {
      if (s.waitingForOperand) {
        return { ...s, display: digit, waitingForOperand: false };
      }
      return { ...s, display: s.display === '0' ? digit : s.display + digit };
    });
  }

  function inputDecimal() {
    setState((s) => {
      if (s.waitingForOperand) {
        return { ...s, display: '0.', waitingForOperand: false };
      }
      if (s.display.includes('.')) return s;
      return { ...s, display: s.display + '.' };
    });
  }

  function toggleSign() {
    setState((s) => {
      const val = parseFloat(s.display) * -1;
      return { ...s, display: String(val) };
    });
  }

  function inputPercent() {
    setState((s) => {
      const val = parseFloat(s.display) / 100;
      return { ...s, display: String(val) };
    });
  }

  function inputOperator(op: string) {
    setState((s) => {
      const current = parseFloat(s.display);
      if (s.operand !== null && !s.waitingForOperand && s.operator) {
        const result = calculate(s.operand, s.operator, current);
        const resultStr = parseFloat(result.toPrecision(12)).toString();
        return { display: resultStr, operand: result, operator: op, waitingForOperand: true };
      }
      return { ...s, operand: current, operator: op, waitingForOperand: true };
    });
  }

  function inputEquals() {
    setState((s) => {
      if (s.operand === null || s.operator === null) return s;
      const current = parseFloat(s.display);
      const result = calculate(s.operand, s.operator, current);
      const resultStr = parseFloat(result.toPrecision(12)).toString();
      return { display: resultStr, operand: null, operator: null, waitingForOperand: true };
    });
  }

  function clear() {
    setState(initialState);
  }

  const { display, operator } = state;

  const displayValue = (() => {
    const num = parseFloat(display);
    if (isNaN(num)) return 'Error';
    if (display.endsWith('.') || display.endsWith('.0')) return display;
    if (display.length > 12) return parseFloat(num.toPrecision(9)).toString();
    return display;
  })();

  type ButtonVariant = 'function' | 'operator' | 'zero' | 'default';

  function btn(
    label: string,
    action: () => void,
    variant: ButtonVariant = 'default'
  ) {
    const base =
      'flex items-center justify-center rounded-full text-xl font-medium select-none cursor-pointer active:opacity-70 transition-opacity';
    const variants: Record<ButtonVariant, string> = {
      function: 'bg-gray-300 text-gray-900',
      operator: `${operator === label ? 'bg-white text-orange-500' : 'bg-orange-400 text-white'}`,
      zero: 'col-span-2 rounded-full bg-gray-700 text-white justify-start pl-7',
      default: 'bg-gray-700 text-white',
    };
    return (
      <button
        key={label}
        type="button"
        onClick={action}
        className={`${base} ${variants[variant]}`}
      >
        {label}
      </button>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-xs select-none">
        {/* Display */}
        <div className="px-4 pb-2 text-right">
          <span
            className="text-white font-light leading-none"
            style={{ fontSize: displayValue.length > 9 ? '2.5rem' : '4.5rem' }}
          >
            {displayValue}
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-3" style={{ gridAutoRows: '5rem' }}>
          {btn('AC', clear, 'function')}
          {btn('+/-', toggleSign, 'function')}
          {btn('%', inputPercent, 'function')}
          {btn('÷', () => inputOperator('÷'), 'operator')}

          {btn('7', () => inputDigit('7'))}
          {btn('8', () => inputDigit('8'))}
          {btn('9', () => inputDigit('9'))}
          {btn('×', () => inputOperator('×'), 'operator')}

          {btn('4', () => inputDigit('4'))}
          {btn('5', () => inputDigit('5'))}
          {btn('6', () => inputDigit('6'))}
          {btn('−', () => inputOperator('−'), 'operator')}

          {btn('1', () => inputDigit('1'))}
          {btn('2', () => inputDigit('2'))}
          {btn('3', () => inputDigit('3'))}
          {btn('+', () => inputOperator('+'), 'operator')}

          {/* Zero spans 2 cols */}
          <button
            type="button"
            onClick={() => inputDigit('0')}
            className="col-span-2 rounded-full bg-gray-700 text-white text-xl font-medium flex items-center pl-7 active:opacity-70 transition-opacity cursor-pointer"
          >
            0
          </button>
          {btn('.', inputDecimal)}
          {btn('=', inputEquals, 'operator')}
        </div>
      </div>
    </main>
  );
}