'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const FILE=path.join(__dirname,'index.html');
const KEY=process.env.GAME_LINK_KEY;
if(!KEY||KEY.length<20)throw Error('Missing GAME_LINK_KEY; refusing to start an open game server');
const safe='/play/'+KEY;
const app=http.createServer((req,res)=>{
  const headers={'X-Robots-Tag':'noindex, nofollow, noarchive, nosnippet','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','Cache-Control':'no-store, private','Content-Security-Policy':"default-src 'none'; img-src data:; style-src 'unsafe-inline'; script-src 'unsafe-inline'; media-src blob: data:; font-src 'self' data:; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"};
  for(const [k,v] of Object.entries(headers))res.setHeader(k,v);
  if(req.url==='/health'){res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'});return res.end('ok');}
  const requested=(req.url||'').split('?')[0];
  if((req.method!=='GET'&&req.method!=='HEAD')||requested!==safe){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Not found');}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
  if(req.method==='HEAD')return res.end();
  fs.createReadStream(FILE).on('error',()=>res.destroy()).pipe(res);
});
app.listen(Number(process.env.PORT)||10000,'0.0.0.0',()=>console.log('Comedy Commandos link-gated game ready'));
