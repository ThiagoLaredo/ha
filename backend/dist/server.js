"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const projects_1 = __importDefault(require("./routes/projects")); // <-- importando as rotas
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rota de teste (opcional, pode manter)
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando!' });
});
// Usar rotas de projetos
app.use('/api/projects', projects_1.default);
app.listen(port, () => {
    console.log(`🔥 Backend rodando em http://localhost:${port}`);
});
