import React from 'react';

interface PropertyFormProps {
  cost: number;
  setCost: (val: number) => void;
  term: number;
  setTerm: (val: number) => void;
  interestRate: number;
  setInterestRate: (val: number) => void;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  cost,
  setCost,
  term,
  setTerm,
  interestRate,
  setInterestRate,
}) => {
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

  return (
    <div className="clay-card">
      <h2>Property Information</h2>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="cost">Property Cost (₺)</label>
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
        <label htmlFor="rate">Interest Rate (% Monthly)</label>
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
        <div className="summary-item">
          <label htmlFor="term">Payment Term (Months)</label>
          <span className="summary-value">{term}</span>
        </div>
        <input
          id="term"
          type="range"
          className="clay-slider"
          min="1"
          max="120"
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

