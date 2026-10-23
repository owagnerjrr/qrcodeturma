import {timingSafeEqual} from 'node:crypto';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
const digits=s=>String(s||'').replace(/\D/g,'');
const igual=(a,b)=>{const x=Buffer.from(String(a)),y=Buffer.from(String(b));return x.length===y.length&&timingSafeEqual(x,y)};
const attempts=new Map();
export default function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).end();
 const {turma,nome,codigo,telefone}=req.body||{};
 if(typeof turma!=='string'||!/^[a-z0-9-]{2,60}$/.test(turma)||typeof nome!=='string'||nome.length>90||typeof codigo!=='string'||codigo.length>100||digits(telefone).length<10||digits(telefone).length>11)return res.status(400).json({erro:'Dados inválidos'});
 const ip=String(req.headers['x-forwarded-for']||'').split(',')[0].trim()||'unknown';
 const key=ip+':'+turma;const now=Date.now();const a=attempts.get(key)||{count:0,until:now+15*60*1000};
 if(now>a.until){a.count=0;a.until=now+15*60*1000}
 if(a.count>=8)return res.status(429).json({erro:'Muitas tentativas. Aguarde 15 minutos e procure a equipe da unidade.'});
 let turmas={},telefones={};
 try{turmas=JSON.parse(process.env.TURMAS_JSON||'{}');telefones=JSON.parse(process.env.TELEFONES_TURMA_JSON||'{}')}catch{}
 const t=turmas[turma];
 if(!t||!t.codigo||!igual(codigo,t.codigo))return res.status(403).json({erro:'Acesso inválido'});
 const aluno=(t.alunos||[]).find(x=>norm(x.nome)===norm(nome));
 const cadastrado=aluno&&telefones[turma]?.[String(aluno.ra)];
 if(!aluno||!cadastrado||!igual(digits(telefone),digits(cadastrado))){
   a.count++;attempts.set(key,a);
   return res.status(403).json({erro:'O telefone informado não corresponde ao número registrado no ato da matrícula.'});
 }
 attempts.delete(key);
 return res.status(200).json({nome:aluno.nome,ra:String(aluno.ra)});
}