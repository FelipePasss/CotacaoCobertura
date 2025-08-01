const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { cotacoes, usuarios } = require('./database');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir arquivos estáticos
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));
app.use('/img', express.static(path.join(__dirname, 'frontend/img')));

// Configurar multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos PDF e imagens são permitidos!'), false);
    }
  }
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ===== ROTAS DE AUTENTICAÇÃO =====
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  usuarios.autenticar(email, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    
    if (user) {
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          email: user.email, 
          nome: user.nome, 
          role: user.role 
        } 
      });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  });
});

// ===== ROTAS DE COTAÇÕES =====
// Criar nova cotação
app.post('/api/cotacoes', (req, res) => {
  const dados = {
    ...req.body,
    data_criacao: new Date().toISOString()
  };
  
  cotacoes.criar(dados, (err, id) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar cotação' });
    }
    res.json({ success: true, id });
  });
});

// Listar todas as cotações
app.get('/api/cotacoes', (req, res) => {
  cotacoes.listar((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar cotações' });
    }
    res.json(rows);
  });
});

// Buscar cotação por ID
app.get('/api/cotacoes/:id', (req, res) => {
  cotacoes.buscarPorId(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar cotação' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Cotação não encontrada' });
    }
    res.json(row);
  });
});

// Atualizar cotação
app.put('/api/cotacoes/:id', (req, res) => {
  cotacoes.atualizar(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar cotação' });
    }
    res.json({ success: true });
  });
});

// Deletar cotação
app.delete('/api/cotacoes/:id', (req, res) => {
  cotacoes.deletar(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar cotação' });
    }
    res.json({ success: true });
  });
});

// Buscar cotações por status
app.get('/api/cotacoes/status/:status', (req, res) => {
  cotacoes.buscarPorStatus(req.params.status, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar cotações' });
    }
    res.json(rows);
  });
});

// ===== ROTAS DE USUÁRIOS =====
app.get('/api/usuarios', (req, res) => {
  usuarios.listar((err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
    res.json(rows);
  });
});

app.post('/api/usuarios', (req, res) => {
  usuarios.criar(req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
    res.json({ success: true });
  });
});

app.put('/api/usuarios/:email', (req, res) => {
  usuarios.atualizar(req.params.email, req.body, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
    res.json({ success: true });
  });
});

app.delete('/api/usuarios/:email', (req, res) => {
  usuarios.deletar(req.params.email, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
    res.json({ success: true });
  });
});

// ===== ROTAS DE UPLOAD =====
// Upload de carta de apresentação
app.post('/api/upload/carta-apresentacao/:id', upload.single('carta'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  
  const filePath = `/uploads/${req.file.filename}`;
  
  cotacoes.atualizar(req.params.id, { carta_apresentacao: filePath }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar carta de apresentação' });
    }
    res.json({ success: true, filePath });
  });
});

// Servir arquivos de upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== NOTIFICAÇÕES =====
app.post('/api/notificacoes', (req, res) => {
  // Sistema simples de notificações que será exibido no frontend
  const { tipo, mensagem, duracao = 6000 } = req.body;
  
  // Aqui você pode implementar um sistema mais sofisticado de notificações
  // Por enquanto, apenas retorna sucesso para o frontend processar
  res.json({ 
    success: true, 
    notificacao: { tipo, mensagem, duracao, timestamp: Date.now() } 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Sistema de Cotação de Coberturas iniciado com sucesso!`);
});