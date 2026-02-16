'use client';

import { useState, useRef, useEffect } from 'react';
import { Shield, Lock } from 'lucide-react';

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);
    setError(false);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all digits are filled
    if (newDigits.every(d => d !== '')) {
      const code = newDigits.join('');
      if (code === '9147') {
        setTimeout(() => onSuccess(), 300);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits(['', '', '', '']);
          inputRefs.current[0]?.focus();
        }, 600);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className={`relative z-10 text-center ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MurariHealth</h1>
          <p className="text-zinc-500 text-sm">Comprehensive Health Intelligence Platform</p>
        </div>

        <div className="glass-card p-8 max-w-sm mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-400">Enter Access Code</span>
          </div>

          <div className="flex gap-3 justify-center mb-6">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el; }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-[#0a0a0f] outline-none transition-all duration-200 ${
                  error
                    ? 'border-red-500 text-red-400'
                    : digit
                    ? 'border-indigo-500 text-white'
                    : 'border-zinc-700 text-white focus:border-indigo-500'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm animate-fade-in">Invalid access code</p>
          )}
        </div>

        <p className="mt-8 text-zinc-600 text-xs">
          Protected Health Information — Authorized Access Only
        </p>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
