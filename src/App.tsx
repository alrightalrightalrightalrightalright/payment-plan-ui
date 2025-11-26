import { useState, useMemo } from 'react';
import { PropertyForm } from './components/PropertyForm';
import { PaymentPlanTable } from './components/PaymentPlanTable';
import { calculatePaymentPlan } from './utils/calculatePlan';

function App() {
  const [cost, setCost] = useState<number>(1250000);
  const [term, setTerm] = useState<number>(120);
  const [interestRate, setInterestRate] = useState<number>(2.79);
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [additionalIncome, setAdditionalIncome] = useState<number>(0);

  // Reactive calculation (Derived State)
  // We don't need useEffect here because the calculation is synchronous and fast.
  const plan = useMemo(() => {
    // Pass term as the installment count so they are always equal
    return calculatePaymentPlan(cost, term, term, interestRate, startDate, additionalIncome);
  }, [cost, term, interestRate, startDate, additionalIncome]);

  return (
    <div className="container">
      <h1>Payment Plan Calculator</h1>
      
      <PropertyForm
        cost={cost}
        setCost={setCost}
        term={term}
        setTerm={setTerm}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        startDate={startDate}
        setStartDate={setStartDate}
        additionalIncome={additionalIncome}
        setAdditionalIncome={setAdditionalIncome}
      />
      
      <PaymentPlanTable plan={plan} />
    </div>
  );
}

export default App;

