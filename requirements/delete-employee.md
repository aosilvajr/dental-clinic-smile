# Deletar Funcionário

> ## Caso de sucesso

1. ⛔️ Recebe uma requisição do tipo **DEL** na rota **/api/employee/{employee_id}**
2. ⛔️ Valida se a requisição foi feita por um admin
3. ⛔️ Valida o parâmetro **employee_id**
4. ⛔️ **Deleta** um funcionário com os dados fonecidos
5. ⛔️ Retorna **204** (não retorna nada)

> ## Exceções

1. ⛔️ Retorna erro **404** se a API não existir
2. ⛔️ Retorna erro **403** se não for um admin
3. ⛔️ Retorna erro **403** se employee_id passado na URL for inválido
4. ⛔️ Retorna erro **500** se der erro ao tentar deletar funcionário