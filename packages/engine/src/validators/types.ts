export interface ValidationError {
  rule_id: string;       // Unique rule identifier, e.g., 'SF-VP-001'
  severity: 'error' | 'warning';
  artifact: string;      // The file path of the artifact causing error
  message: string;       // Human readable error message
  suggestion?: string;   // Helpful suggestion to fix the error
  line?: number;         // Optional line number where the error occurred
  segment_id?: string;   // Optional segment identifier
}

export interface ValidationReport {
  project: string;
  stage: string;
  status: 'passed' | 'failed';
  validated_at: string;
  errors: ValidationError[];
  warnings: ValidationError[];
}
