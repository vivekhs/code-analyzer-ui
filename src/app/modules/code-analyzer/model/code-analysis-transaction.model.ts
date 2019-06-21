import { AnalysisReport } from './analysis-report';

export interface CodeAnalysisTransaction {
    userId: string;
    transactionId: string;
    createdTS: Date,
    analysisReport: AnalysisReport[]
}

