let assert = require('chai').assert;

import { BenchmarkRunner } from '../../../src/runner/BenchmarkRunner';

suite('BenchmarksManager', ()=> {

    test('loadSuites', () => {
        let runner = new BenchmarkRunner();
        let manager = runner.suiteManager;

        assert.equal(0, manager.suites.length);
        runner.loadSuitesFromModule('./obj/src/standardbenchmarks');

        assert.equal(2, manager.suites.length);
    });

    test('addSuiteFromClass', () => {
        let runner = new BenchmarkRunner();
        let manager = runner.suiteManager;

        assert.equal(0, manager.suites.length);
        runner.addSuiteFromClass('./obj/src/standardbenchmarks,UtilityBenchmarkSuite');

        assert.equal(1, manager.suites.length);
    });

    test('selectAllBenchmarks', () => {
        let runner = new BenchmarkRunner();
        let manager = runner.suiteManager;

        runner.loadSuitesFromModule('./obj/src/standardbenchmarks');

        assert.equal(0, manager.getSelectedBenchmarks().length);

        runner.selectAllBenchmarks();
        assert.equal(5, manager.getSelectedBenchmarks().length);

        manager.unselectAllBenchmarks();
        assert.equal(0, manager.getSelectedBenchmarks().length);
    });

    test('selectBenchmarkByName', () => {
        let runner = new BenchmarkRunner();
        let manager = runner.suiteManager;

        runner.loadSuitesFromModule('./obj/src/standardbenchmarks');

        assert.equal(0, manager.getSelectedBenchmarks().length);

        runner.selectBenchmarksByName('Utility.Empty');
        assert.equal(1, manager.getSelectedBenchmarks().length);

        manager.unselectBenchmarksByName(['Utility.Empty']);
        assert.equal(0, manager.getSelectedBenchmarks().length);
    });

});