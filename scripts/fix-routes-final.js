const fs = require('fs');
const base = 'C:/Users/alibe/Desktop/mobilya';
const files = [
  'app/api/categories/[id]/route.ts',
  'app/api/orders/[id]/route.ts',
  'app/api/products/[id]/route.ts',
  'app/api/rfqs/[id]/route.ts',
  'app/api/suppliers/[id]/route.ts',
];
let count = 0;
files.forEach(f => {
  const fp = base + '/' + f;
  if (!fs.existsSync(fp)) { console.log('SKIP:', f); return; }
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  // Fix GET/PUT/POST/DELETE function signatures
  c = c.replace(
    /export async function (GET|PUT|POST|DELETE)\(request: NextRequest, \{ params(:\s*\{ id \})? \}: \{ params: (Promise<)?\{ id: string \}(>)? \}\)/g,
    'export async function $1(request: NextRequest, { params }: { params: Promise<{ id: string }> })'
  );
  // Add await params line if missing
  c = c.replace(
    /export async function (GET|PUT|POST|DELETE)\(request: NextRequest, \{ params \}: \{ params: Promise<\{ id: string \}> \}\) \{\n(?!\s*const \{ id \} = await params)/g,
    'export async function $1(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params\n'
  );
  // Fix instances where params.id is used but should be id
  c = c.replace(/params\.id\b(?!\s*=)/g, 'id');
  if (c !== orig) { count++; console.log('FIXED:', f); }
  fs.writeFileSync(fp, c, 'utf8');
});
console.log('Fixed ' + count + ' files');
