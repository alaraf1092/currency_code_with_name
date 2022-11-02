const text = 'I\'m Al Araf, Araf Are you there?'
const regx = /araf/gi;
console.log(regx.test(text));

//next..........
//search -- provide the index of the desired word's first letter otherwise it will return -1.
console.log(text.search(regx)); //index of Araf's first letter is 7.

//match.....
console.log(text.match(regx)[0]);

//test....return true or false only.
console.log(regx.test(text));

//exec.....almost same as match.// returns only the first match.
console.log(regx.exec(text));


//practice......

const text2 = 'a "witch" and her "broom"';
const regxP = /"(\w+)"/g; //to capture the group we have used first bracket

//replacing with _witch_

console.log(text2.replace(regxP, '_$1_'));
console.log(text2.match(regxP));

//matching date........
const date = 'hello 2000-01-20,2001-12-01';
const regXP = /(?<year>\d{4})-(?<month>\d{2})-(?<day>[0-9]{2})/g;
console.log(date.replace(regXP, `$<day>.$<month>.$<year>`));
console.log(date.match(regXP));


const r = 'al';
console.log(r[0])