# Criar Funcionário

> ## Caso de sucesso

1. ⛔️ Recebe uma requisição do tipo **POST** na rota **/api/employee**
2. ⛔️ Valida se a requisição foi feita por um admin
4. ⛔️ Valida dados obrigatórios
5. ⛔️ Cria um funcionário com os dados fonecidos
6. ⛔️ Retorn 200 com os dados do funcionário

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
2. ⛔️ Retorna erro **403** se o usuário não for ADMIN
3. ⛔️ Retorna erro **400** se os dados obrigatórios não forem fornecidos pelo client
4. ⛔️ Retorna erro **500** se der erro ao tentar criar funcionário