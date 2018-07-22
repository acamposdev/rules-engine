const assert = require('assert');
let Rule = require('../rules-engine').Rule;
let RulesEngine = require('../rules-engine').RulesEngine;
let rulesEngine = new RulesEngine();

callCenter = {
    agents: [],
    statistics: {
        by: {
            status: {

            },
            calls: {
                accepted: 0,
                rejected: 0
            }
        }
    },
    alerts: []  
}

person = {
    name: '',
    card: null
}

describe('RulesEngine test', function () {
    before(function () {
        var rules = []

        // Preparando reglas callCenter.statistics.by.calls.rejected
        rules.push(new Rule('callCenter.statistics.by.calls.rejected', '>', 10));
        rules.push(new Rule('callCenter.statistics.by.calls.rejected', '>', 20));
        rules.push(new Rule('callCenter.statistics.by.calls.rejected', '>', 30));
        rules.push(new Rule('callCenter.statistics.by.calls.rejected', '>', 40));
        rules.push(new Rule('callCenter.statistics.by.calls.rejected', '==', 10));

        // Preparando reglas callCenter.statistics.by.status["AVAILABLE"]
        rules.push(new Rule('callCenter.statistics.by.status["AVAILABLE"]', '==', 0));

        // Operadores basicos
        rules.push(new Rule('value',  '<', 10));
        rules.push(new Rule('value',  '>', 10));
        rules.push(new Rule('value', '<=', 10));
        rules.push(new Rule('value', '>=', 10));
        rules.push(new Rule('value', '==', 99));
        
        // valores undefined y stringd
        rules.push(new Rule('person.name', '==', 'John Doe'));
        rules.push(new Rule('person.card', '==', undefined));

        rulesEngine.load(rules);
    });
    afterEach(function () {
        // No needs implementation
    });
    it('Regla para strings OK', function(done) {
        var fact = person.name = 'John Doe';
        var match = rulesEngine.run(fact);
        assert.equal(1, match.length);
        done();
    });
    it('Regla para strings FAIL', function(done) {
        var fact = person.name = 'Nobody';
        var match = rulesEngine.run(fact);
        assert.equal(0, match.length);
        done();
    });
    it('Regla para undefined', function(done) {
        var fact = person = {};
        var match = rulesEngine.run(fact);
        assert.equal(0, match.length);
        done();
    });
    it('Regla "mayor que"', function(done) {
        var fact = value = 11;
        var match = rulesEngine.run(fact);
        assert.equal(2, match.length);
        done();
    });
    it('Regla "menor que"', function(done) {
        var fact = value = 9;
        var match = rulesEngine.run(fact);
        assert.equal(2, match.length);
        done();
    });
    it('Regla "igual"', function(done) {
        var fact = value = 99;
        var match = rulesEngine.run(fact);
        assert.equal(3, match.length);
        done();
    });
    it('Reglas cumplidas: 4 (calls rejected = 20)', function(done) {
        var fact1 = callCenter.statistics.by.calls.rejected = 20;
        var matchs1 = rulesEngine.run(fact1);
        assert.equal(4, matchs1.length);
        done();
    });
    it('Reglas cumplidas: 3 (calls rejected = 0)', function(done) {
        var fact2 = callCenter.statistics.by.calls.rejected = 0;
        var matchs2 = rulesEngine.run(fact2);
        assert.equal(3, matchs2.length);    
        done();
    });
    it('Reglas cumplidas: 4 (calls rejected = 10)', function(done) {
        var fact3 = callCenter.statistics.by.calls.rejected = 10;
        var matchs3 = rulesEngine.run(fact3);
        assert.equal(4, matchs3.length);  
        done();
    });
    it('Reglas cumplidas: 7 (calls rejected = 50)', function(done) {
        var fact4 = callCenter.statistics.by.calls.rejected = 50;
        var matchs4 = rulesEngine.run(fact4);
        assert.equal(7, matchs4.length);
        done();
    });
    it('Reglas cumplidas: 7 (calls rejected = 50 && status AVAILABLE = 0)', function(done) {
        var fact = callCenter.statistics.by = {
            calls: {
                rejected: 50,
            },
            status: {
                AVAILABLE: 0
            }
        }
        
        var matchs = rulesEngine.run(fact);
        assert.equal(8, matchs.length);
        done();
    });
  });