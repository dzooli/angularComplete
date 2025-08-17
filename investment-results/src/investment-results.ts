// Use the below code as a help
// e.g., integrate it into a service or component
// You may need to tweak it, depending on where and how you use it

function calculateInvestmentResults() {
  const annualData = [];
  // const initialInvestment = 1000; // Example initial investment value
  // let investmentValue = initialInvestment;
  // const annualInvestment = 500; // Example annual investment value

  // const duration = 10; // Example duration in years
  // const interestRate = 5; // Example expected return percentage

  for (let i = 0; i < duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = investmentValue * (interestRate / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    const totalInterest =
      investmentValue - annualInvestment * year - initialInvestment;
    annualData.push({
      year: year,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
      totalInterest: totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    });
  }

  return annualData;
}
