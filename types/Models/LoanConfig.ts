export interface Policy {
  policyCode: string;
  timeLimit: number;
}

export interface Periodicity {
  label: string;
  code: string;
  policies: Policy[];
}

export interface LoanConfig {
  minAmount: number;
  maxAmount: number;
  amountInterval: number;
  periodicity: Periodicity[];
}
