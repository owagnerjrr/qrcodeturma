# Portal de Boas-Vindas — QR Code por Turma

Site estático com funções serverless na Vercel. Os dados reais **não devem ser commitados** neste repositório público.

## Como usar

1. Conecte este repositório à Vercel (framework: Other).
2. Em Project Settings > Environment Variables, configure `TURMAS_JSON` com um JSON contendo somente os campos necessários. Exemplo **fictício**:

```json
{"assistente-logistica-2026-10":{"nome":"Assistente de Logística","alunos":[{"nome":"Maria Exemplo","ra":"RA-FICTICIO"}],"orientacoes":[{"titulo":"Microsoft Teams","texto":"Consulte as instruções fornecidas pela unidade."}]}}
```

3. Implante e acesse `https://SEU-DOMINIO.vercel.app/?turma=assistente-logistica-2026-10`.
4. Gere o QR Code apontando **para o endereço real publicado**, nunca para o GitHub.

## Privacidade e segurança

A busca por nomes é apenas uma prova de conceito: nomes de alunos podem ser expostos a quem tiver o link. **Não habilite dados de alunos sem validação institucional e autorização adequada.** Apenas selecionar um nome não autentica ninguém. O RA e quaisquer senhas individuais **não são retornados por esta versão**. Para revelar o RA no informativo, implemente uma verificação de identidade aprovada pela instituição. Não armazene senhas nem informações sensíveis em repositórios públicos, JavaScript do navegador ou imagens públicas.

Para o piloto, recomenda-se usar somente dados fictícios até a aprovação de proteção de dados. A lista real pode ser importada para armazenamento privado após aprovação.
