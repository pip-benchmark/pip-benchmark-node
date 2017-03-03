import { ExecutionState } from './ExecutionState';
import { BenchmarkResult } from './BenchmarkResult';

export type ResultCallback = (status: ExecutionState, result: BenchmarkResult) => void;