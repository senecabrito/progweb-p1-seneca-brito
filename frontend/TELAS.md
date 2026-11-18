# Telas do Projeto 1 (S4)

Front: execute `npx http-server -p 5500 -c-1` dentro de `frontend/` · API: `npm run dev` dentro de `backend/`.

| Lista | Estado ou erro | Como provocar | O que aparece |
|---|---|---|---|
| Tutores | Carregando | DevTools → Network → throttling 3G → recarregue | Spinner “Carregando tutores…” |
| Tutores | Vazio | Inicie a API recém-iniciada (os dados ficam em memória) | “Nenhum tutor ainda…” |
| Tutores | Erro | Pare a API com Ctrl+C e recarregue | Mensagem de conexão e botão “Tentar de novo” |
| Tutores | Sucesso | Cadastre um tutor com nome e e-mail válidos | Tabela com o tutor cadastrado |
| Tutores | Erro de regra (409) | Tente cadastrar outro tutor com o mesmo e-mail | Aviso vermelho “Já existe um tutor com este e-mail” enviado pela API |
| Pets | Carregando | Throttling 3G e recarregue | Spinner “Carregando pets…” |
| Pets | Vazio | Inicie a API sem pets cadastrados | “Nenhum pet ainda…” |
| Pets | Erro | Pare a API e recarregue | Mensagem de conexão e botão “Tentar de novo” |
| Pets | Sucesso | Cadastre um tutor e crie um pet escolhendo-o no select | Tabela mostra o nome do tutor associado |
| Pets | Erro de regra (422) | Envie `tutorId` inexistente pela Network/API (por exemplo, após editar a requisição) | Aviso vermelho “Tutor informado não existe” da API |

## Camadas

- `api`: `js/api.js` e `js/config.js`
- `services`: `js/services/`
- `state`: `js/state/store.js`
- `ui`: `js/ui/`
- `main.js`: conecta stores, services e views.

O painel usa `textContent` para dados da API e do usuário. Nenhuma view injeta esses dados com `innerHTML`.
