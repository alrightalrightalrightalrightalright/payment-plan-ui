import React from 'react';
import { PaymentPlanSummary } from '../utils/calculatePlan';

interface PaymentPlanTableProps {
  plan: PaymentPlanSummary;
  t: any;
  language: string;
}

export const PaymentPlanTable: React.FC<PaymentPlanTableProps> = ({ plan, t, language }) => {
  // Format currency helper
  const fmt = (n: number) =>
    new Intl.NumberFormat(language === 'tr' ? 'tr-TR' : 'en-US', { style: 'currency', currency: 'TRY' }).format(n);

  return (
    <div className="clay-card">
      <h2>{t.paymentPlan}</h2>

      <div style={{ marginBottom: '2rem' }}>
        <div className="summary-item">
          <span>{t.totalPayment}:</span>
          <span className="summary-value" style={{ color: 'var(--primary-color)' }}>
            {fmt(plan.totalPayment)}
          </span>
        </div>
        <div className="summary-item">
          <span>{t.totalInterest}:</span>
          <span className="summary-value">
            {fmt(plan.totalInterest)}
          </span>
        </div>
        <div className="summary-item">
          <span>{t.estInstallment}:</span>
          <span className="summary-value">
            {fmt(plan.installmentAmount)}
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', maxHeight: '600px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>{t.installmentNo}</th>
              <th>{t.paymentDate}</th>
              <th>{t.payment}</th>
              <th>{t.additionalIncome}</th>
              <th>{t.netPayment}</th>
              <th>{t.principal}</th>
              <th>{t.interest}</th>
              <th>{t.balance}</th>
            </tr>
          </thead>
          <tbody>
            {plan.schedule.map((item) => (
              <tr key={item.installmentNumber}>
                <td>{item.installmentNumber}</td>
                <td>{item.paymentDate}</td>
                <td>{fmt(item.paymentAmount)}</td>
                <td style={{ color: '#2ecc71', fontWeight: 'bold' }}>
                  {item.monthlyIncome > 0 ? `${fmt(item.monthlyIncome)}` : '-'}
                </td>
                <td style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {fmt(item.netPaymentAmount)}
                </td>
                <td>{fmt(item.principalAmount)}</td>
                <td>{fmt(item.interestAmount)}</td>
                <td>{fmt(item.remainingBalance)}</td>
              </tr>
            ))}
            {plan.schedule.length === 0 && (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                  {t.emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

