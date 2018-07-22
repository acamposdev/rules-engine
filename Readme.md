# RULES

Basic rules engine

## Example

```javascript
let Rule = require('rules-engine').Rule;
let RulesEngine = require('rules-engine').RulesEngine;

let rulesEngine = new RulesEngine();

// Rules definition
let rules = [];
rules.push(new Rule('person.name', '==', 'John Doe'));
//rules.push(new Rule('person.card', '==', undefined));

// Load rules into engine
rulesEngine.load(rules);

person = {};
// Definition a facs to evaluate. Need match with person.name or person.card
var fact = person.name = 'John Doe';
var match = rulesEngine.run(fact);
// output -> match it's an array that contain one entry for each rule matched
```

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**