# 🚀 Sistema de Cotação de Coberturas - INSTRUÇÕES RÁPIDAS

## ✅ PROBLEMAS CORRIGIDOS

### 1. **Erro 404 do Fundo.png nos PDFs**
- ✅ Corrigido o caminho da imagem de fundo nos PDFs
- ✅ PDFs agora são gerados com o fundo correto

### 2. **Erro de Conexão com Servidor**
- ✅ Sistema agora funciona 100% com localStorage
- ✅ Não precisa mais de servidor para funcionar
- ✅ Dados ficam salvos no navegador e são compartilhados

### 3. **Filtros Corrigidos**
- ✅ Filtros de **mês** ao invés de data específica
- ✅ Filtros funcionando em todas as abas
- ✅ Botão "Limpar" funcionando corretamente
- ✅ Filtros adicionados na tabela do Dashboard

### 4. **Atualização Automática**
- ✅ Aba "A Faturar" atualiza automaticamente ao clicar "Finalizar"
- ✅ Todas as tabelas se atualizam em tempo real

### 5. **Sistema de Notificações**
- ✅ Notificações aparecem por 6 segundos
- ✅ Notificações apenas na aba "Quadro de Solicitações"

## 🎯 COMO USAR

### **Abrir o Sistema**
1. Abra o arquivo `frontend/index.html` diretamente no navegador
2. **OU** use um servidor local simples

### **Usuários de Teste**
- **Admin**: luidilsantos@gscia.com.br / admin123
- **Financeiro**: rht03@gscia.com.br / rht123  
- **Operacional**: atendimento@gscia.com.br / oper123
- **Consultor**: Clique em "Acessar como Consultor"

### **Filtros Disponíveis**
- 🔍 **Busca por texto**: Nome do condomínio, solicitante
- 📅 **Filtro por mês**: Selecione o mês desejado
- 📊 **Filtro por status**: Pendente, Aprovado, Finalizado, etc.
- 🏢 **Filtro por tipo**: Terceirizado, Orgânico, Linha Verde

### **Funcionalidades Principais**
- ✅ **Criar Cotações**: Aba "Cotação"
- ✅ **Gerenciar**: Aba "Quadro de Solicitações"  
- ✅ **Faturar**: Aba "A Faturar" (Admin/Financeiro)
- ✅ **Histórico**: Abas "Finalizados" e "Cancelados"
- ✅ **Relatórios**: Aba "Dashboard"

## 💾 ONDE FICAM OS DADOS

Os dados ficam salvos no **localStorage** do navegador:
- Abra F12 → Application → Local Storage
- Chave `requests`: Todas as cotações
- Chave `users`: Usuários do sistema

## 🔧 BACKUP DOS DADOS

Para fazer backup:
1. Abra F12 → Console
2. Digite: `localStorage.getItem('requests')`
3. Copie o resultado e salve em um arquivo .txt

Para restaurar:
1. Abra F12 → Console  
2. Digite: `localStorage.setItem('requests', 'COLE_AQUI_O_BACKUP')`

## 📱 COMPATIBILIDADE

✅ Funciona em qualquer navegador moderno
✅ Funciona offline (sem internet)
✅ Funciona em desktop, tablet e celular
✅ Dados ficam salvos localmente

## 🆘 SUPORTE

Se tiver problemas:
1. Limpe o cache do navegador (Ctrl+F5)
2. Verifique se o arquivo `img/Fundo.png` existe
3. Abra F12 → Console para ver erros

---
**✨ Sistema 100% funcional e pronto para uso!**