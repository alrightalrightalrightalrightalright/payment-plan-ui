import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PropertyForm } from '../components/PropertyForm';
import { PaymentPlanTable } from '../components/PaymentPlanTable';
import { calculatePaymentPlan, IncomePeriod } from '../utils/calculatePlan';
import { Language, translations } from '../utils/translations';

interface OutletContextType {
    language: Language;
}

export const CreditArchitect = () => {
    const { language } = useOutletContext<OutletContextType>();
    const t = translations[language];

    const [cost, setCost] = useState<number>(1250000);
    const [term, setTerm] = useState<number>(120);
    const [interestRate, setInterestRate] = useState<number>(2.79);
    const [startDate, setStartDate] = useState<string>('2026-01-01');
    const [incomePeriods, setIncomePeriods] = useState<IncomePeriod[]>([]);

    const plan = useMemo(() => {
        return calculatePaymentPlan(cost, term, term, interestRate, startDate, incomePeriods);
    }, [cost, term, interestRate, startDate, incomePeriods]);

    return (
        <>
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
        </>
    );
};
