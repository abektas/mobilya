const fs = require('fs');
const path = require('path');
const base = 'C:/Users/alibe/Desktop/mobilya';
const files = [
  'app/api/orders/[id]/route.ts',
  'app/api/products/[id]/route.ts',
  'app/api/rfqs/[id]/route.ts',
  'app/api/suppliers/[id]/route.ts',
  'app/api/categories/[id]/route.ts',
];
let count = 0;
files.forEach(f => {
  const fp = path.join(base, f);
  if (!fs.existsSync(fp)) return;
  let c = fs.readFileSync(fp, 'utf8');
  const original = c;
  c = c.replace(/\{ params \}: \{ params: \{ id: string \} \}/g, '{ params }: { params: Promise<{ id: string }> }');
  fs.writeFileSync(fp, c, 'utf8');
  count++;
  console.log('Fixed: ' + f);
});
console.log('Done. Fixed ' + count + ' files.');
