// CompliSense AI - Real-time Validation Logic

// MoneySense Rules Configuration
const MONEYSENSE_RULES = {
  maxInsuranceRatio: 0.15,        // Max 15% of income
  deathCoverageMultiple: 9,        // 9x annual income
  ciCoverageMultiple: 4,           // 4x annual income
  minEmergencyMonths: 3,           // Min 3 months expenses
  maxEmergencyMonths: 6,           // Recommended 6 months
  minRetirementRatio: 0.10         // Min 10% to retirement
};

// Life Stage Rules
const LIFE_STAGE_RULES = {
  'fresh-entrant': { minAge: 19, maxAge: 29, maxPremiumRatio: 0.12 },
  'starting-family': { minAge: 25, maxAge: 34, minEmergencyMonths: 6 },
  'supporting-parents': { minAge: 35, maxAge: 59 },
  'pre-retiree': { minAge: 55, maxAge: 64 },
  'golden-years': { minAge: 65, maxAge: 100 }
};

class ComplianceValidator {
  constructor() {
    this.validationResults = [];
    this.complianceScore = 100;
  }

  // Main validation function
  validateFHR(formData) {
    this.validationResults = [];
    this.complianceScore = 100;

    // Run all validation checks
    this.validateInsuranceSpending(formData);
    this.validateDeathCoverage(formData);
    this.validateCICoverage(formData);
    this.validateEmergencyFund(formData);
    this.validateRetirementSavings(formData);
    this.validateLifeStageAlignment(formData);

    return {
      results: this.validationResults,
      score: Math.max(0, this.complianceScore),
      status: this.getOverallStatus()
    };
  }

  // Insurance Spending Check
  validateInsuranceSpending(data) {
    const monthlyIncome = parseFloat(data.monthlyIncome) || 0;
    const monthlyPremium = parseFloat(data.monthlyPremium) || 0;
    const ratio = monthlyIncome > 0 ? monthlyPremium / monthlyIncome : 0;
    const maxAllowed = monthlyIncome * MONEYSENSE_RULES.maxInsuranceRatio;

    if (ratio <= MONEYSENSE_RULES.maxInsuranceRatio) {
      this.addResult({
        status: 'pass',
        title: 'Insurance Spending',
        message: `Premium $${monthlyPremium.toFixed(0)}/month = ${(ratio * 100).toFixed(1)}% of income`,
        detail: `Within MoneySense guideline of max 15%`
      });
    } else {
      const excess = monthlyPremium - maxAllowed;
      this.addResult({
        status: 'fail',
        title: 'Insurance Spending',
        message: `Premium $${monthlyPremium.toFixed(0)}/month = ${(ratio * 100).toFixed(1)}% of income`,
        detail: `Exceeds MoneySense guideline of max 15% ($${maxAllowed.toFixed(0)}/month)`,
        suggestion: `Reduce premium by $${excess.toFixed(0)} or consider extending policy term to lower monthly cost`
      });
      this.complianceScore -= 20;
    }
  }

  // Death/TPD Coverage Check
  validateDeathCoverage(data) {
    const annualIncome = (parseFloat(data.monthlyIncome) || 0) * 12;
    const deathCoverage = parseFloat(data.deathCoverage) || 0;
    const recommendedCoverage = annualIncome * MONEYSENSE_RULES.deathCoverageMultiple;
    const coverageRatio = annualIncome > 0 ? deathCoverage / annualIncome : 0;

    if (coverageRatio >= MONEYSENSE_RULES.deathCoverageMultiple) {
      this.addResult({
        status: 'pass',
        title: 'Death/TPD Coverage',
        message: `Coverage $${this.formatCurrency(deathCoverage)} = ${coverageRatio.toFixed(1)}x annual income`,
        detail: `Meets MoneySense guideline of 9x annual income`
      });
    } else if (coverageRatio >= 7) {
      const shortfall = recommendedCoverage - deathCoverage;
      this.addResult({
        status: 'warning',
        title: 'Death/TPD Coverage',
        message: `Coverage $${this.formatCurrency(deathCoverage)} = ${coverageRatio.toFixed(1)}x annual income`,
        detail: `Below MoneySense guideline of 9x ($${this.formatCurrency(recommendedCoverage)})`,
        suggestion: `Consider increasing coverage by $${this.formatCurrency(shortfall)} to meet recommended protection level`
      });
      this.complianceScore -= 10;
    } else {
      const shortfall = recommendedCoverage - deathCoverage;
      this.addResult({
        status: 'fail',
        title: 'Death/TPD Coverage',
        message: `Coverage $${this.formatCurrency(deathCoverage)} = ${coverageRatio.toFixed(1)}x annual income`,
        detail: `Significantly below MoneySense guideline of 9x ($${this.formatCurrency(recommendedCoverage)})`,
        suggestion: `Increase coverage by $${this.formatCurrency(shortfall)}. Consider term life insurance for affordable protection`
      });
      this.complianceScore -= 20;
    }
  }

  // Critical Illness Coverage Check
  validateCICoverage(data) {
    const annualIncome = (parseFloat(data.monthlyIncome) || 0) * 12;
    const ciCoverage = parseFloat(data.ciCoverage) || 0;
    const recommendedCoverage = annualIncome * MONEYSENSE_RULES.ciCoverageMultiple;
    const coverageRatio = annualIncome > 0 ? ciCoverage / annualIncome : 0;

    if (coverageRatio >= MONEYSENSE_RULES.ciCoverageMultiple) {
      this.addResult({
        status: 'pass',
        title: 'Critical Illness Coverage',
        message: `Coverage $${this.formatCurrency(ciCoverage)} = ${coverageRatio.toFixed(1)}x annual income`,
        detail: `Meets MoneySense guideline of 4x annual income`
      });
    } else if (coverageRatio >= 3) {
      const shortfall = recommendedCoverage - ciCoverage;
      this.addResult({
        status: 'warning',
        title: 'Critical Illness Coverage',
        message: `Coverage $${this.formatCurrency(ciCoverage)} = ${coverageRatio.toFixed(1)}x annual income`,
        detail: `Below MoneySense guideline of 4x ($${this.formatCurrency(recommendedCoverage)})`,
        suggestion: `Consider adding CI rider for $${this.formatCurrency(shortfall)} additional coverage`
      });
      this.complianceScore -= 10;
    } else {
      const shortfall = recommendedCoverage - ciCoverage;
      this.addResult({
        status: 'fail',
        title: 'Critical Illness Coverage',
        message: `Coverage $${this.formatCurrency(ciCoverage)} = ${coverageRatio.toFixed(1)}x annual income`,
        detail: `Significantly below MoneySense guideline of 4x ($${this.formatCurrency(recommendedCoverage)})`,
        suggestion: `Increase CI coverage by $${this.formatCurrency(shortfall)}. Consider standalone CI plan or rider attachment`
      });
      this.complianceScore -= 20;
    }
  }

  // Emergency Fund Check
  validateEmergencyFund(data) {
    const monthlyExpenses = parseFloat(data.monthlyExpenses) || 0;
    const emergencyFund = parseFloat(data.emergencyFund) || 0;
    const monthsCovered = monthlyExpenses > 0 ? emergencyFund / monthlyExpenses : 0;
    const minRequired = monthlyExpenses * MONEYSENSE_RULES.minEmergencyMonths;
    const recommended = monthlyExpenses * MONEYSENSE_RULES.maxEmergencyMonths;

    if (monthsCovered >= MONEYSENSE_RULES.maxEmergencyMonths) {
      this.addResult({
        status: 'pass',
        title: 'Emergency Fund',
        message: `Fund $${this.formatCurrency(emergencyFund)} = ${monthsCovered.toFixed(1)} months expenses`,
        detail: `Exceeds MoneySense recommended 6 months coverage`
      });
    } else if (monthsCovered >= MONEYSENSE_RULES.minEmergencyMonths) {
      const shortfall = recommended - emergencyFund;
      this.addResult({
        status: 'warning',
        title: 'Emergency Fund',
        message: `Fund $${this.formatCurrency(emergencyFund)} = ${monthsCovered.toFixed(1)} months expenses`,
        detail: `Meets minimum 3 months but below recommended 6 months ($${this.formatCurrency(recommended)})`,
        suggestion: `Build emergency fund by $${this.formatCurrency(shortfall)} before increasing insurance premiums`
      });
      this.complianceScore -= 5;
    } else {
      const shortfall = minRequired - emergencyFund;
      this.addResult({
        status: 'fail',
        title: 'Emergency Fund',
        message: `Fund $${this.formatCurrency(emergencyFund)} = ${monthsCovered.toFixed(1)} months expenses`,
        detail: `Below MoneySense minimum 3 months ($${this.formatCurrency(minRequired)})`,
        suggestion: `Prioritize building emergency fund by $${this.formatCurrency(shortfall)} before committing to higher premiums`
      });
      this.complianceScore -= 15;
    }
  }

  // Retirement Savings Check
  validateRetirementSavings(data) {
    const monthlyIncome = parseFloat(data.monthlyIncome) || 0;
    const retirementSavings = parseFloat(data.retirementSavings) || 0;
    const ratio = monthlyIncome > 0 ? retirementSavings / monthlyIncome : 0;
    const minRequired = monthlyIncome * MONEYSENSE_RULES.minRetirementRatio;

    if (ratio >= MONEYSENSE_RULES.minRetirementRatio) {
      this.addResult({
        status: 'pass',
        title: 'Retirement Savings',
        message: `Saving $${retirementSavings.toFixed(0)}/month = ${(ratio * 100).toFixed(1)}% of income`,
        detail: `Meets MoneySense guideline of min 10%`
      });
    } else {
      const shortfall = minRequired - retirementSavings;
      this.addResult({
        status: 'warning',
        title: 'Retirement Savings',
        message: `Saving $${retirementSavings.toFixed(0)}/month = ${(ratio * 100).toFixed(1)}% of income`,
        detail: `Below MoneySense guideline of min 10% ($${minRequired.toFixed(0)}/month)`,
        suggestion: `Allocate $${shortfall.toFixed(0)}/month more to retirement. Consider rebalancing insurance premium vs retirement savings`
      });
      this.complianceScore -= 10;
    }
  }

  // Life Stage Alignment Check
  validateLifeStageAlignment(data) {
    const age = parseInt(data.age) || 0;
    const lifeStage = this.determineLifeStage(age);
    const hasChildren = data.hasChildren === 'yes';
    const numChildren = parseInt(data.numChildren) || 0;

    let stageMessages = [];

    if (lifeStage === 'fresh-entrant') {
      stageMessages.push('MoneySense recommends: Protection (term life + hospitalization) before investment products');
      if (data.productType === 'investment-linked') {
        this.addResult({
          status: 'warning',
          title: 'Life Stage Alignment',
          message: 'Fresh Entrant (19-29 years)',
          detail: 'Investment-linked products may not be age-appropriate',
          suggestion: 'MoneySense recommends prioritizing basic protection coverage first'
        });
        this.complianceScore -= 5;
        return;
      }
    } else if (lifeStage === 'starting-family' && hasChildren) {
      stageMessages.push(`Family protection priority: Income replacement (9x) + Education fund ($${(numChildren * 100000).toLocaleString()}) + Mortgage protection`);
    } else if (lifeStage === 'pre-retiree') {
      stageMessages.push('MoneySense suggests: Reduce protection coverage, increase retirement savings, optimize CPF LIFE');
      if (data.policyTerm && parseInt(data.policyTerm) > 10) {
        this.addResult({
          status: 'warning',
          title: 'Life Stage Alignment',
          message: 'Pre-Retiree (55-64 years)',
          detail: `Policy term ${data.policyTerm} years extends beyond typical retirement age`,
          suggestion: 'Consider shorter term (10 years) or whole life with reduced coverage'
        });
        this.complianceScore -= 5;
        return;
      }
    } else if (lifeStage === 'golden-years') {
      const monthlyPremium = parseFloat(data.monthlyPremium) || 0;
      const retirementSavings = parseFloat(data.totalSavings) || 300000;
      const totalPremiumCost = monthlyPremium * 12 * 20; // 20 year projection
      const savingsImpact = totalPremiumCost / retirementSavings;

      if (savingsImpact > 0.10) {
        this.addResult({
          status: 'fail',
          title: 'Life Stage Alignment',
          message: 'Golden Years (65+ years)',
          detail: `Premium cost ($${this.formatCurrency(totalPremiumCost)} over 20 years) = ${(savingsImpact * 100).toFixed(0)}% of retirement savings`,
          suggestion: 'MoneySense recommends max 10% of retirement funds for insurance. Focus on MediShield Life supplementation instead'
        });
        this.complianceScore -= 20;
        return;
      }
    }

    this.addResult({
      status: 'pass',
      title: 'Life Stage Alignment',
      message: this.getLifeStageLabel(lifeStage),
      detail: 'Recommendation aligns with MoneySense life stage guidelines'
    });
  }

  // Helper Functions
  addResult(result) {
    this.validationResults.push(result);
  }

  determineLifeStage(age) {
    if (age >= 19 && age <= 29) return 'fresh-entrant';
    if (age >= 25 && age <= 34) return 'starting-family';
    if (age >= 35 && age <= 59) return 'supporting-parents';
    if (age >= 55 && age <= 64) return 'pre-retiree';
    if (age >= 65) return 'golden-years';
    return 'unknown';
  }

  getLifeStageLabel(stage) {
    const labels = {
      'fresh-entrant': 'Fresh Entrant (19-29 years)',
      'starting-family': 'Starting a Family (25-34 years)',
      'supporting-parents': 'Supporting Parents (35-59 years)',
      'pre-retiree': 'Pre-Retiree (55-64 years)',
      'golden-years': 'Golden Years (65+ years)'
    };
    return labels[stage] || 'Unknown Life Stage';
  }

  getOverallStatus() {
    if (this.complianceScore >= 90) return 'excellent';
    if (this.complianceScore >= 75) return 'good';
    if (this.complianceScore >= 60) return 'fair';
    return 'poor';
  }

  formatCurrency(amount) {
    return amount.toLocaleString('en-SG', { maximumFractionDigits: 0 });
  }
}

// Initialize validator
const validator = new ComplianceValidator();
