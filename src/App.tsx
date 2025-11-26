import { useState, useMemo } from 'react';
import { PropertyForm } from './components/PropertyForm';
import { PaymentPlanTable } from './components/PaymentPlanTable';
import { calculatePaymentPlan } from './utils/calculatePlan';

function App() {
  const [cost, setCost] = useState<number>(1250000);
  const [term, setTerm] = useState<number>(120);
  const [interestRate, setInterestRate] = useState<number>(2.79);

  // Reactive calculation (Derived State)
  // We don't need useEffect here because the calculation is synchronous and fast.
  const plan = useMemo(() => {
    // Pass term as the installment count so they are always equal
    return calculatePaymentPlan(cost, term, term, interestRate);
  }, [cost, term, interestRate]);

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
      />
      
      <PaymentPlanTable plan={plan} />
    </div>
  );
}

export default App;

