### Sobre o Desafio☝
Servidor que receberá inscrições em um formulário. A partir das regras de negócio definidas, você precisará construir uma API REST que realize a inscrição, caso ela >seja válida, armazenando os dados em um banco de dados relacional.

Inscrição no fluxo: No sistema de captação de leads inbound temos um formulário de inscrição em um fluxo de mensagens com notícias e informações sobre os precatórios >de nossos credores. Para isso, precisamos de uma API capaz de receber a inscrição pelo formulário e realizar o registro no banco de dados.

Disparo de mensagens: Também precisamos de um serviço periódico que seja executado uma vez ao dia, sempre no mesmo horário, para atualizar no banco de dados qual a >última mensagem disparada para cada inscrição.

Observação: O desafio deve ser desenvolvido utilizando Javascript/Typescript. Fica a seu critério qual banco de dados utilizar, desde que faça sentido ao desafio >proposto.

Regras de negócio
> - [x] 1 - A inscrição só deve ser feita com um email válido.

> - [x] 2 - Não devem ser registradas linhas duplicadas com o mesmo email no banco de dados.

> - [x] 3 - A propriedade "position" da tabela "message_flow" indica o dia em que a mensagem deve ser enviada.

> - [x] 4 - A propriedade "last_message" da tabela "subscriptions" indica a última mensagem enviada para aquela inscrição.

> - [x] 5 - A propriedade "last_message" deve ser atualizada todos os dias com a próxima mensagem do fluxo.

> - [x] 6 - A propriedade "last_message" não deve ser atualizada em inscrições marcadas com "active" igual a "false".

> - [x] 7 - Caso a inscrição já tenha recebido todas as mensagens do fluxo, a propriedade "active" deve ser marcada como "false".
