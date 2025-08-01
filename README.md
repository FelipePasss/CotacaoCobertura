# Sistema de Cotação de Coberturas - GSCIA

Sistema completo para gerenciamento de cotações de coberturas e diárias, desenvolvido para o Grupo Solução & Cia.

## 🚀 Funcionalidades Implementadas

### ✅ Melhorias Recentes
- **Sistema de Banco de Dados**: Substituição do localStorage por SQLite para persistência de dados compartilhada
- **Notificações Inteligentes**: Sistema de notificações que aparecem por 6 segundos na aba "Quadro de Solicitações"
- **PDFs com Fundo**: Correção do problema de fundo nos PDFs gerados
- **Atualização Automática**: A aba "A Faturar" agora atualiza automaticamente ao clicar em "Finalizar"
- **Filtros Avançados**: Botões de filtro em todas as abas para facilitar a busca
- **Carta de Apresentação**: Funcionalidade para anexar carta de apresentação do colaborador cotado
- **Remoção de Email**: Removida a funcionalidade de envio de email que causava erros

### 📋 Funcionalidades Principais
- **Gestão de Cotações**: Criação, edição e acompanhamento de cotações
- **Múltiplos Perfis**: Admin, Financeiro, Operacional e Consultor
- **Dashboard Gerencial**: Visão completa com estatísticas e gráficos
- **Exportação Excel**: Exportação de dados para planilhas
- **Geração de PDFs**: Propostas profissionais com fundo personalizado
- **Upload de Documentos**: Anexo de PDFs assinados e cartas de apresentação
- **Sistema de Status**: Controle completo do fluxo de aprovação

## 🛠️ Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passo a Passo

1. **Clone ou baixe o projeto**
```bash
cd CotacaoCobertura-main
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor**
```bash
npm start
```

4. **Acesse o sistema**
Abra seu navegador e acesse: `http://localhost:3001`

## 👥 Usuários Padrão

### Administrador
- **Email**: luidilsantos@gscia.com.br
- **Senha**: admin123

### Financeiro
- **Email**: rht03@gscia.com.br
- **Senha**: rht123

### Operacional
- **Email**: atendimento@gscia.com.br
- **Senha**: oper123

### Consultor
- Acesso direto sem login, apenas informando o nome

## 📊 Estrutura do Sistema

### Abas Principais
1. **Cotação**: Criação de novas cotações
2. **Quadro de Solicitações**: Gerenciamento de cotações pendentes
3. **Finalizados**: Histórico de cotações concluídas
4. **Cancelados**: Cotações canceladas ou reprovadas
5. **Dashboard**: Visão gerencial com estatísticas
6. **A Faturar**: (Admin/Financeiro) Cotações prontas para faturamento

### Filtros Disponíveis
- **Busca por texto**: Condomínio, solicitante, email
- **Filtro por status**: Pendente, Aprovado, Reprovado
- **Filtro por data**: Data de criação, finalização, cancelamento
- **Filtro por tipo**: Terceirizado, Orgânico, Linha Verde

## 🔧 Configuração

### Banco de Dados
O sistema utiliza SQLite para armazenamento local. O arquivo `cotacoes.db` será criado automaticamente na primeira execução.

### Upload de Arquivos
Os arquivos enviados são armazenados na pasta `uploads/` que é criada automaticamente.

### Personalização
- **Logo**: Substitua o arquivo em `frontend/img/GSCIA-FACILITIES-HORIZONTAL.png`
- **Fundo PDF**: Substitua o arquivo em `frontend/img/Fundo.png`
- **Cores**: Edite as variáveis CSS no início do arquivo `index.html`

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- Desktop (recomendado)
- Tablets
- Smartphones

## 🔒 Segurança

- Autenticação por email/senha
- Controle de acesso por perfil
- Validação de arquivos no upload
- Sanitização de dados de entrada

## 🚀 Desenvolvimento

### Estrutura de Arquivos
```
CotacaoCobertura-main/
├── server.js              # Servidor Express
├── database.js            # Configuração do banco SQLite
├── package.json           # Dependências do projeto
├── frontend/
│   ├── index.html         # Interface principal
│   └── img/               # Imagens e recursos
├── uploads/               # Arquivos enviados
└── cotacoes.db           # Banco de dados SQLite
```

### Scripts Disponíveis
- `npm start`: Inicia o servidor em produção
- `npm run dev`: Inicia o servidor em modo desenvolvimento (com nodemon)

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Sistema desenvolvido exclusivamente para o Grupo Solução & Cia.
Todos os direitos reservados © 2025.