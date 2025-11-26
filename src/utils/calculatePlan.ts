export interface IncomePeriod {
  id: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export interface PaymentPlanItem {
  installmentNumber: number;
  paymentDate: string;
  paymentAmount: number;
  monthlyIncome: number;
  netPaymentAmount: number;
  interestAmount: number;
  principalAmount: number;
  remainingBalance: number;
}

export interface PaymentPlanSummary {
  totalPayment: number;
  totalInterest: number;
  installmentAmount: number;
  schedule: PaymentPlanItem[];
}

export const calculatePaymentPlan = (
  cost: number,
  termMonths: number,
  installmentCount: number,
  monthlyInterestRate: number = 1.5,
  startDate: string = new Date().toISOString().split('T')[0],
  incomePeriods: IncomePeriod[] = []
): PaymentPlanSummary => {
  if (cost <= 0 || termMonths <= 0 || installmentCount <= 0) {
    return {
      totalPayment: 0,
      totalInterest: 0,
      installmentAmount: 0,
      schedule: [],
    };
  }

  // Monthly Interest Rate in decimal
  const r = monthlyInterestRate / 100;
  
  // If term differs from installments, we assume the loan calculates interest over 'termMonths'
  // but payments are made 'installmentCount' times.
  // To simplify standard loan logic: 
  // We usually calculate based on the number of periods. 
  // If term = 120 months and installments = 120, period is 1 month.
  // If term = 120 months and installments = 60, period is 2 months.
  
  const periodInMonths = termMonths / installmentCount;
  const periodRate = r * periodInMonths; // Approximate simple scaling of rate for period
  
  // Amortization Formula: A = P * (r(1+r)^n) / ((1+r)^n - 1)
  // P = Principal (cost)
  // r = periodRate
  // n = installmentCount
  
  let installmentAmount = 0;

  if (periodRate === 0) {
    installmentAmount = cost / installmentCount;
  } else {
    const numerator = periodRate * Math.pow(1 + periodRate, installmentCount);
    const denominator = Math.pow(1 + periodRate, installmentCount) - 1;
    installmentAmount = cost * (numerator / denominator);
  }

  let remainingBalance = cost;
  const schedule: PaymentPlanItem[] = [];
  let totalInterest = 0;
  
  // Parse start date
  const start = new Date(startDate);

  for (let i = 1; i <= installmentCount; i++) {
    const interestForPeriod = remainingBalance * periodRate;
    const principalForPeriod = installmentAmount - interestForPeriod;
    
    // Handle last installment rounding differences
    let currentPrincipal = principalForPeriod;
    let currentPayment = installmentAmount;
    
    if (i === installmentCount) {
      currentPrincipal = remainingBalance;
      currentPayment = remainingBalance + interestForPeriod;
    }

    remainingBalance -= currentPrincipal;
    if (remainingBalance < 0) remainingBalance = 0; // Floating point safety

    totalInterest += interestForPeriod;

    // Calculate payment date
    // Clone start date and add months
    const date = new Date(start);
    date.setMonth(start.getMonth() + (i * periodInMonths));
    
    // Calculate income for this specific date
    // We check if the payment date falls within any income period
    // Payment Date check: Is it >= period.start AND <= period.end
    // Comparison using strings (YYYY-MM-DD) or timestamps works.
    // Let's use timestamps for safety.
    const payTime = date.getTime();
    
    let monthlyIncome = 0;
    
    // Iterate to find the matching period.
    // The requirement is: "consider newer payment period for that date".
    // "Newer" implies the one added last to the list.
    // So we iterate and if multiple match, we overwrite with the later one.
    // Or simply: iterate forward and let the last match win.
    // (Previous logic was summing +=, now we want assignment =)
    
    incomePeriods.forEach(period => {
      const pStart = new Date(period.startDate).getTime();
      const pEnd = new Date(period.endDate).getTime();
      
      if (payTime >= pStart && payTime <= pEnd) {
        // Use '=' instead of '+=' to replace previous matches with newer ones
        monthlyIncome = period.amount;
      }
    });

    const netPayment = currentPayment - monthlyIncome;

    schedule.push({
      installmentNumber: i,
      paymentDate: date.toLocaleDateString('tr-TR'),
      paymentAmount: currentPayment,
      monthlyIncome: monthlyIncome,
      netPaymentAmount: netPayment > 0 ? netPayment : 0,
      interestAmount: interestForPeriod,
      principalAmount: currentPrincipal,
      remainingBalance: remainingBalance
    });
  }

  return {
    totalPayment: cost + totalInterest,
    totalInterest,
    installmentAmount: schedule.length > 0 ? schedule[0].paymentAmount : 0,
    schedule
  };
};

