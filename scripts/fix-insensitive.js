const fs = require('fs');
const path = require('path');
const base = 'C:/Users/alibe/Desktop/mobilya';
const files = [
  'app/api/products/route.ts',
  'app/api/search/route.ts',
  'app/api/suppliers/route.ts',
];
files.forEach(f => {
  const fp = path.join(base, f);
  let c = fs.readFileSync(fp, 'utf8');
  c = c.replace(/, mode: 'insensitive'/g, '');
  fs.writeFileSync(fp, c, 'utf8');
  console.log('Fixed:', f);
});
