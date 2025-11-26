import { useState, useMemo } from 'react';
import { PropertyForm } from './components/PropertyForm';
import { PaymentPlanTable } from './components/PaymentPlanTable';
import { calculatePaymentPlan, IncomePeriod } from './utils/calculatePlan';

export type Language = 'tr' | 'en';

export const translations = {
  tr: {
    title: 'Ödeme Planı Hesaplayıcı',
    propertyInfo: 'Mülk Bilgileri',
    propertyCost: 'Mülk Fiyatı (₺)',
    incomePeriods: 'Ek Gelir Dönemleri',
    start: 'Başlangıç',
    end: 'Bitiş',
    amount: 'Tutar (₺)',
    add: 'Ekle',
    interestRate: 'Faiz Oranı (% Aylık)',
    creditStartDate: 'Kredi Başlangıç Tarihi',
    paymentTerm: 'Vade (Ay)',
    paymentPlan: 'Ödeme Planı',
    totalPayment: 'Toplam Ödeme',
    totalInterest: 'Toplam Faiz',
    estInstallment: 'Tahmini Taksit Tutarı',
    installmentNo: '#',
    paymentDate: 'Ödeme Tarihi',
    payment: 'Taksit',
    additionalIncome: 'Ek Ödeme',
    netPayment: 'Net Ödeme',
    principal: 'Anapara',
    interest: 'Faiz',
    balance: 'Kalan',
    emptyState: 'Ödeme planını görmek için detayları giriniz.',
  },
  en: {
    title: 'Payment Plan Calculator',
    propertyInfo: 'Property Information',
    propertyCost: 'Property Cost (₺)',
    incomePeriods: 'Additional Income Periods',
    start: 'Start',
    end: 'End',
    amount: 'Amount (₺)',
    add: 'Add',
    interestRate: 'Interest Rate (% Monthly)',
    creditStartDate: 'Credit Start Date',
    paymentTerm: 'Payment Term (Months)',
    paymentPlan: 'Payment Plan',
    totalPayment: 'Total Payment',
    totalInterest: 'Total Interest',
    estInstallment: 'Est. Installment Amount',
    installmentNo: '#',
    paymentDate: 'Payment Date',
    payment: 'Payment',
    additionalIncome: 'Add. Income',
    netPayment: 'Net Payment',
    principal: 'Principal',
    interest: 'Interest',
    balance: 'Balance',
    emptyState: 'Enter details to see payment plan.',
  }
};

function App() {
  const [cost, setCost] = useState<number>(1250000);
  const [term, setTerm] = useState<number>(120);
  const [interestRate, setInterestRate] = useState<number>(2.79);
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [incomePeriods, setIncomePeriods] = useState<IncomePeriod[]>([]);
  const [language, setLanguage] = useState<Language>('tr');

  const t = translations[language];

  // Reactive calculation (Derived State)
  // We don't need useEffect here because the calculation is synchronous and fast.
  const plan = useMemo(() => {
    // Pass term as the installment count so they are always equal
    return calculatePaymentPlan(cost, term, term, interestRate, startDate, incomePeriods);
  }, [cost, term, interestRate, startDate, incomePeriods]);

  return (
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <button 
          onClick={() => setLanguage(prev => prev === 'tr' ? 'en' : 'tr')}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            border: 'none',
            background: 'var(--bg-color)',
            boxShadow: 'var(--clay-shadow)',
            color: 'var(--primary-color)',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {language === 'tr' ? 'EN' : 'TR'}
        </button>
      </div>

      <h1>{t.title}</h1>
      
      <PropertyForm
        cost={cost}
        setCost={setCost}
        term={term}
        setTerm={setTerm}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        startDate={startDate}
        setStartDate={setStartDate}
        incomePeriods={incomePeriods}
        setIncomePeriods={setIncomePeriods}
        t={t}
      />
      
      <PaymentPlanTable plan={plan} t={t} language={language} />
    </div>
  );
}

export default App;

