const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Criar/conectar ao banco de dados
const dbPath = path.join(__dirname, 'cotacoes.db');
const db = new sqlite3.Database(dbPath);

// Inicializar tabelas
db.serialize(() => {
  // Tabela de cotações
  db.run(`CREATE TABLE IF NOT EXISTS cotacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    condominio TEXT NOT NULL,
    data_inicio TEXT NOT NULL,
    data_fim TEXT NOT NULL,
    colaboradores INTEGER NOT NULL,
    solicitante TEXT NOT NULL,
    email TEXT NOT NULL,
    observacoes TEXT,
    tipo_faturamento TEXT NOT NULL,
    quantidade_dias INTEGER NOT NULL,
    cargo TEXT NOT NULL,
    valor_diario REAL NOT NULL,
    valor_total REAL NOT NULL,
    desconto REAL DEFAULT 0,
    data_criacao TEXT NOT NULL,
    status TEXT DEFAULT 'Pendente',
    realizado TEXT DEFAULT 'Pendente',
    faturado TEXT DEFAULT 'Pendente',
    solicitante_sistema TEXT,
    aprovacao_admin TEXT DEFAULT 'Pendente',
    aprovacao_financeiro TEXT DEFAULT 'Pendente',
    pdf_assinado BOOLEAN DEFAULT 0,
    pdf_filename TEXT,
    data_aprovacao TEXT,
    data_finalizacao TEXT,
    data_cancelamento TEXT,
    motivo_cancelamento TEXT,
    data_assinatura TEXT,
    carta_apresentacao TEXT
  )`);

  // Tabela de usuários
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    nome TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`);

  // Inserir usuários padrão se não existirem
  const usuarios = [
    { email: 'luidilsantos@gscia.com.br', nome: "Luídil Santos", password: 'admin123', role: 'admin' },
    { email: 'rht03@gscia.com.br', nome: "RH Terceiro", password: 'rht123', role: 'finance' },
    { email: 'zildiannerocha@gscia.com.br', nome: "Zildianne Rocha", password: 'rht123', role: 'finance' },
    { email: 'rht50@gscia.com.br', nome: "RH Cinquenta", password: 'admin123', role: 'operations' },
    { email: 'atendimento@gscia.com.br', nome: "Atendimento", password: 'oper123', role: 'operations' },
    { email: 'coberturas@gscia.com.br', nome: "Coberturas", password: 'oper123', role: 'operations' },
    { email: 'rht55@gscia.com.br', nome: "RH Cinquenta e Cinco", password: 'oper123', role: 'operations' }
  ];

  usuarios.forEach(user => {
    db.run(`INSERT OR IGNORE INTO usuarios (email, nome, password, role) VALUES (?, ?, ?, ?)`,
      [user.email, user.nome, user.password, user.role]);
  });
});

// Funções para cotações
const cotacoes = {
  // Criar nova cotação
  criar: (dados, callback) => {
    const sql = `INSERT INTO cotacoes (
      condominio, data_inicio, data_fim, colaboradores, solicitante, email, observacoes,
      tipo_faturamento, quantidade_dias, cargo, valor_diario, valor_total, desconto,
      data_criacao, status, solicitante_sistema
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [
      dados.condominio, dados.data_inicio, dados.data_fim, dados.colaboradores,
      dados.solicitante, dados.email, dados.observacoes, dados.tipo_faturamento,
      dados.quantidade_dias, dados.cargo, dados.valor_diario, dados.valor_total,
      dados.desconto || 0, dados.data_criacao, dados.status || 'Pendente',
      dados.solicitante_sistema
    ], function(err) {
      callback(err, this.lastID);
    });
  },

  // Listar todas as cotações
  listar: (callback) => {
    db.all("SELECT * FROM cotacoes ORDER BY data_criacao DESC", callback);
  },

  // Buscar cotação por ID
  buscarPorId: (id, callback) => {
    db.get("SELECT * FROM cotacoes WHERE id = ?", [id], callback);
  },

  // Atualizar cotação
  atualizar: (id, dados, callback) => {
    const campos = Object.keys(dados).map(key => `${key} = ?`).join(', ');
    const valores = Object.values(dados);
    valores.push(id);
    
    db.run(`UPDATE cotacoes SET ${campos} WHERE id = ?`, valores, callback);
  },

  // Deletar cotação
  deletar: (id, callback) => {
    db.run("DELETE FROM cotacoes WHERE id = ?", [id], callback);
  },

  // Buscar por status
  buscarPorStatus: (status, callback) => {
    db.all("SELECT * FROM cotacoes WHERE status = ? ORDER BY data_criacao DESC", [status], callback);
  }
};

// Funções para usuários
const usuarios = {
  // Autenticar usuário
  autenticar: (email, password, callback) => {
    db.get("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password], callback);
  },

  // Listar todos os usuários
  listar: (callback) => {
    db.all("SELECT id, email, nome, role FROM usuarios ORDER BY nome", callback);
  },

  // Criar usuário
  criar: (dados, callback) => {
    db.run("INSERT INTO usuarios (email, nome, password, role) VALUES (?, ?, ?, ?)",
      [dados.email, dados.nome, dados.password, dados.role], callback);
  },

  // Atualizar usuário
  atualizar: (email, dados, callback) => {
    const campos = Object.keys(dados).map(key => `${key} = ?`).join(', ');
    const valores = Object.values(dados);
    valores.push(email);
    
    db.run(`UPDATE usuarios SET ${campos} WHERE email = ?`, valores, callback);
  },

  // Deletar usuário
  deletar: (email, callback) => {
    db.run("DELETE FROM usuarios WHERE email = ?", [email], callback);
  }
};

module.exports = {
  db,
  cotacoes,
  usuarios
};