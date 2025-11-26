import React, { useState } from 'react';
import { IncomePeriod } from '../utils/calculatePlan';

interface PropertyFormProps {
  cost: number;
  setCost: (val: number) => void;
  term: number;
  setTerm: (val: number) => void;
  interestRate: number;
  setInterestRate: (val: number) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  incomePeriods: IncomePeriod[];
  setIncomePeriods: (periods: IncomePeriod[]) => void;
  t: any;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  cost,
  setCost,
  term,
  setTerm,
  interestRate,
  setInterestRate,
  startDate,
  setStartDate,
  incomePeriods,
  setIncomePeriods,
  t,
}) => {
  // Local state for new period form
  const [newPeriodStart, setNewPeriodStart] = useState(startDate);
  const [newPeriodEnd, setNewPeriodEnd] = useState(startDate);
  const [newPeriodAmount, setNewPeriodAmount] = useState(0);

  // Helper to format number with dots (Turkish style) e.g. 1.000.000
  const formatNumber = (val: number) => {
    if (!val) return '';
    return new Intl.NumberFormat('tr-TR').format(val);
  };

  // Helper to parse string back to number
  const parseNumber = (val: string) => {
    // Remove all non-digits
    const cleaned = val.replace(/\D/g, '');
    return cleaned ? Number(cleaned) : 0;
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseNumber(rawValue);
    setCost(numericValue);
  };

  const handleNewAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = parseNumber(rawValue);
    setNewPeriodAmount(numericValue);
  };

  const addIncomePeriod = () => {
    if (newPeriodAmount <= 0 || !newPeriodStart || !newPeriodEnd) return;
    
    const newPeriod: IncomePeriod = {
      id: Math.random().toString(36).substr(2, 9),
      startDate: newPeriodStart,
      endDate: newPeriodEnd,
      amount: newPeriodAmount,
    };
    
    setIncomePeriods([...incomePeriods, newPeriod]);
    setNewPeriodAmount(0); // Reset amount but keep dates for easier consecutive entry
  };

  const removeIncomePeriod = (id: string) => {
    setIncomePeriods(incomePeriods.filter(p => p.id !== id));
  };

  // Slider Logic: Variable Steps
  // 1 to 12: Step 1
  // 12 to 36: Step 3
  // 36 to 120: Step 6
  const validTerms = React.useMemo(() => {
    const steps: number[] = [];
    // 1 to 12
    for (let i = 1; i <= 12; i++) steps.push(i);
    // 12 to 36 (step 3), starting from 15
    for (let i = 15; i <= 36; i += 3) steps.push(i);
    // 36 to 120 (step 6), starting from 42
    for (let i = 42; i <= 120; i += 6) steps.push(i);
    return steps;
  }, []);

  // Find index for current value to control slider
  // Default to index of 120 if not found, or nearest
  const currentSliderIndex = validTerms.indexOf(term) !== -1 
    ? validTerms.indexOf(term) 
    : validTerms.findIndex(t => t >= term);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.value);
    setTerm(validTerms[index]);
  };

  return (
    <div className="clay-card">
      <h2>{t.propertyInfo}</h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="cost">{t.propertyCost}</label>
        <input
          id="cost"
          type="text"
          inputMode="numeric"
          className="clay-input"
          value={cost === 0 ? '' : formatNumber(cost)}
          onChange={handleCostChange}
          placeholder="0"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label>{t.incomePeriods}</label>
        <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '1rem', marginTop: '0.5rem' }}>
          {/* List existing periods */}
          {incomePeriods.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1rem' }}>
              {incomePeriods.map(p => (
                <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>
                    {p.startDate} to {p.endDate}: <strong>{formatNumber(p.amount)} ₺</strong>
                  </span>
                  <button 
                    onClick={() => removeIncomePeriod(p.id)}
                    style={{ background: 'var(--error-color)', color: 'white', border: 'none', borderRadius: '0.5rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {/* Add new period form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem' }}>{t.start}</label>
                <input 
                  type="date" 
                  className="clay-input" 
                  value={newPeriodStart}
                  onChange={(e) => setNewPeriodStart(e.target.value)}
                  style={{ padding: '0.5rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.8rem' }}>{t.end}</label>
                <input 
                  type="date" 
                  className="clay-input" 
                  value={newPeriodEnd}
                  onChange={(e) => setNewPeriodEnd(e.target.value)}
                  style={{ padding: '0.5rem' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem' }}>{t.amount}</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  inputMode="numeric"
                  className="clay-input"
                  value={newPeriodAmount === 0 ? '' : formatNumber(newPeriodAmount)}
                  onChange={handleNewAmountChange}
                  placeholder="0"
                  style={{ flex: 1 }}
                />
                <button 
                  onClick={addIncomePeriod}
                  style={{ background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '1rem', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {t.add}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="rate">{t.interestRate}</label>
        <input
          id="rate"
          type="number"
          className="clay-input"
          value={interestRate === 0 ? '' : interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          step="0.1"
          min="0"
          placeholder="0"
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="startDate">{t.creditStartDate}</label>
        <input
          id="startDate"
          type="date"
          className="clay-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div className="summary-item">
          <label htmlFor="term">{t.paymentTerm}</label>
          <span className="summary-value">{term}</span>
        </div>
        <input
          id="term"
          type="range"
          className="clay-slider"
          min="0"
          max={validTerms.length - 1}
          value={currentSliderIndex}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  );
};

