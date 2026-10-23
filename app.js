const params=new URLSearchParams(location.search),turma=params.get('turma'),chave=params.get('acesso'),campo=document.getElementById('nome'),saida=document.getElementById('resultado'),detalhes=document.getElementById('detalhes'),rotulo=document.getElementById('turma-label');history.replaceState(null,'',location.pathname+'?turma='+encodeURIComponent(turma||''));if(chave)sessionStorage.setItem('turma-'+turma,chave);const token=chave||sessionStorage.getItem('turma-'+turma);const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();let config=null,timer=0;function msg(s){const p=document.createElement('p');p.textContent=s;saida.append(p)}function limpar(){saida.replaceChildren();detalhes.hidden=true;detalhes.replaceChildren()}async function carregar(){if(!turma||!/^[a-z0-9-]{2,60}$/.test(turma)||!token){msg('Escaneie o QR Code atualizado fornecido pelo professor.');campo.disabled=true;return}try{const r=await fetch('/api/turma?slug='+encodeURIComponent(turma));if(!r.ok)throw Error();config=await r.json();rotulo.textContent=config.nome}catch{campo.disabled=true;msg('Turma ainda não cadastrada.')}}async function buscar(){limpar();const nome=norm(campo.value);if(nome.length<2||!config)return;try{const r=await fetch('/api/buscar',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({turma,nome,codigo:token})});if(!r.ok){msg('QR Code inválido ou consulta indisponível. Peça ajuda ao professor.');return}const data=await r.json();if(!data.alunos.length){msg('Nenhum aluno encontrado. Confira o primeiro nome.');return}for(const a of data.alunos){const b=document.createElement('button');b.textContent=a.nome;b.onclick=()=>abrir(a);saida.append(b)}}catch{msg('Falha de conexão. Tente novamente.')}}function abrir(a){
 limpar();
 const h=document.createElement('h2');h.textContent='Seu informativo';
 const card=document.createElement('div');card.className='informativo';
 const top=document.createElement('div');top.className='faixa-aluno';
 const nome=document.createElement('strong');nome.textContent=a.nome;
 const ra=document.createElement('span');ra.textContent='RA: '+a.ra;
 top.append(nome,ra);
 const img=document.createElement('img');img.src='/informativo-base.svg';img.alt='Informativo de acesso do Senac';img.loading='eager';
 card.append(top,img);
 const botao=document.createElement('button');botao.textContent='Baixar meu informativo em imagem';
 botao.addEventListener('click',async()=>{
  botao.disabled=true;
  try{
   await img.decode();
   const canvas=document.createElement('canvas');canvas.width=800;canvas.height=1270;
   const ctx=canvas.getContext('2d');
   ctx.fillStyle='#073b81';ctx.fillRect(0,0,800,140);
   ctx.fillStyle='#ffffff';ctx.textAlign='center';
   let size=29;ctx.font='bold '+size+'px Arial';
   while(ctx.measureText(a.nome).width>740&&size>16){size--;ctx.font='bold '+size+'px Arial'}
   ctx.fillText(a.nome,400,54);
   ctx.font='bold 31px Arial';ctx.fillText('RA: '+a.ra,400,105);
   ctx.drawImage(img,0,140,800,1130);
   const link=document.createElement('a');
   link.href=canvas.toDataURL('image/png');
   link.download='informativo-'+String(a.ra)+'.png';
   document.body.append(link);link.click();link.remove();
  }catch(e){alert('Não foi possível baixar. Faça uma captura de tela do informativo.')}
  finally{botao.disabled=false}
 });
 const voltar=document.createElement('button');voltar.textContent='Voltar à pesquisa';
 voltar.onclick=()=>{limpar();campo.value='';campo.focus()};
 const nota=document.createElement('p');nota.className='muted';nota.textContent='Confira seu nome e RA. Não compartilhe seu informativo com outras pessoas.';
 detalhes.append(h,card,botao,voltar,nota);detalhes.hidden=false;
 detalhes.scrollIntoView({behavior:'smooth',block:'start'});
}campo.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(buscar,300)});carregar();