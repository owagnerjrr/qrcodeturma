# Portal QR Code Turma

Portal de boas-vindas com QR Code por turma, busca por primeiro nome e código coletivo de acesso. Projeto para Vercel.

## Configuração privada

Defina a variável de ambiente `TURMAS_JSON` na Vercel. Exemplo fictício:

```json
{"assistente-logistica-2026-10":{"nome":"Assistente de Logística","codigo":"CODIGO-EXEMPLO","alunos":[{"nome":"Maria Exemplo","ra":"123456"}],"orientacoes":[{"titulo":"Wi-Fi","texto":"Solicite as instruções de conexão na unidade."}]}}
```

Link da turma: `https://qrcodeturma.vercel.app/?turma=assistente-logistica-2026-10`.

**Não inclua planilhas reais, senhas ou dados pessoais no GitHub.** O código coletivo restringe o acesso externo, mas **não autentica individualmente**: qualquer pessoa com o código poderá pesquisar os RAs da turma. A adoção com dados reais requer validação institucional, política de privacidade, proteção contra abuso/rate limiting e avaliação de LGPD. Não exiba senhas pessoais.
