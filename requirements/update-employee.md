# Atualizar Funcionário

> ## Caso de sucesso

1. ✅ Recebe uma requisição do tipo **PUT** na rota **/api/employee/{employee_id}**
2. ✅ Valida se a requisição foi feita por um **usuário**
3. ✅ Valida o parâmetro **employee_id**
4. ⛔️ Valida dados obrigatórios
5. ✅ **Atualiza** um funcionário com os dados fonecidos
6. ✅ Retorna **200** com os dados atualizados do funcionário

> ## Exceções

1. ✅ Retorna erro **404** se a API não existir
2. ✅ Retorna erro **403** se não for um usuário
3. ✅ Retorna erro **403** se employee_id passado na URL for inválido
4. ✅ Retorna erro **403** se os dados fornecidos pelo client forem inválidos
5. ✅ Retorna erro **500** se der erro ao tentar atualizar funcionário