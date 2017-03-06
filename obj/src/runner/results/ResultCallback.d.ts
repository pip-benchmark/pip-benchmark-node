import { ExecutionState } from './ExecutionState';
import { BenchmarkResult } from './BenchmarkResult';
export declare type ResultCallback = (status: ExecutionState, result: BenchmarkResult) => void;
