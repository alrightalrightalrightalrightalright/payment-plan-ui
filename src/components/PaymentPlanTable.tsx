import React from 'react';
import { PaymentPlanSummary } from '../utils/calculatePlan';

interface PaymentPlanTableProps {
  plan: PaymentPlanSummary;
}

export const PaymentPlanTable: React.FC<PaymentPlanTableProps> = ({ plan }) => {
  // Format currency helper
  const fmt = (n: number) => 
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(n);

  return (
    <div className="clay-card">
      <h2>Payment Plan</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <div className="summary-item">
          <span>Total Payment:</span>
          <span className="summary-value" style={{ color: 'var(--primary-color)' }}>
            {fmt(plan.totalPayment)}
          </span>
        </div>
        <div className="summary-item">
          <span>Total Interest:</span>
          <span className="summary-value">
            {fmt(plan.totalInterest)}
          </span>
        </div>
        <div className="summary-item">
          <span>Est. Installment Amount:</span>
          <span className="summary-value">
            {fmt(plan.installmentAmount)}
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto', maxHeight: '400px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Payment Date</th>
              <th>Payment</th>
              <th>Additional Income</th>
              <th>Net Payment</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Balance</th>
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
                  Enter details to see payment plan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

