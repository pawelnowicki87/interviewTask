import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import { messageRouter } from './routers/messageRouter.js';


const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/messages', messageRouter);

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Połączono z bazą danych');
    app.listen(PORT, () => {
      console.log(`Server działa na porcie ${PORT}`);
    });
  } catch (error) {
    console.error('Błąd połączenia z bazą:', error);
    process.exit(1);
  }
}

startServer();
