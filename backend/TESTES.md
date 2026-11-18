# Testes da API — Projeto 1 (S3)

API: Clínica Veterinária · entidades: Tutor e Pet · servidor: `npm run dev` em `http://localhost:3000`

Os status abaixo foram obtidos executando as requisições nesta ordem, com a memória da API limpa no início.

| # | Método | URL | Body | Status obtido | Observação |
|---|---|---|---|---|---|
| 1 | POST | `/tutores` | `{"nome":"Ana Silva","email":"ana@clinica.test","telefone":"83999990000"}` | 201 | cria tutor |
| 2 | POST | `/pets` | `{"nome":"Bidu","especie":"cão","raca":"vira-lata","dataNascimento":"2022-04-10","tutorId":1}` | 201 | cria pet vinculado ao tutor 1 |
| 3 | GET | `/pets?tutorId=1` | — | 200 | filtra pets do tutor |
| 4 | GET | `/pets/99` | — | 404 | pet inexistente |
| 5 | POST | `/tutores` | `{"nome":"Ana Duplicada","email":"ana@clinica.test"}` | 409 | regra: e-mail de tutor deve ser único |
| 6 | POST | `/pets` | `{"nome":"Luna","especie":"gato","tutorId":999}` | 422 | regra: tutor informado precisa existir |
| 7 | POST | `/pets` | `{"nome":"Rex","especie":"dinossauro","tutorId":1}` | 400 | regra: espécie deve estar na lista permitida |
| 8 | PUT | `/pets/1` | `{"nome":"Bidu Silva"}` | 200 | atualiza pet |
| 9 | DELETE | `/pets/1` | — | 204 | remove pet |
