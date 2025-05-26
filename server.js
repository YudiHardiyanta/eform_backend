// server.js (Express Setup menggunakan ES Module)
import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import verifyToken from './middleware/authMiddleware.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();  // Memuat variabel lingkungan dari file .env

const app = express();
const port = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';  // Kunci rahasia untuk JWT

app.use(express.json());
app.use(cors());  // Mengaktifkan CORS

app.use('/user',userRoutes);

// Dummy users untuk login (gunakan database sebenarnya untuk produksi)
const users = [
  { id: 1, username: 'user1', password: 'password' ,nama : 'user 1',role : ['pencacah','pengawas','admin']},
  { id: 2, username: 'user2', password: 'password' ,nama : 'user 2',role : ['pencacah']},
  { id: 3, username: 'user3', password: 'password' ,nama : 'user 3',role : ['pencacah']},
  { id: 4, username: 'user4', password: 'password' ,nama : 'user 4',role : ['pengawas','admin']},
  { id: 5, username: 'user5', password: 'password' ,nama : 'user 5',role : ['pengawas','admin']},
];


app.get('/gen',verifyToken,(req,res)=>{
  res.json({
    'code' : 200,
    'hash' : ''
  })
});

// Endpoint untuk login dan menghasilkan JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ 
    id: user.id, 
    username: user.username ,
    role:user.role,
    nama : user.nama
  }, SECRET_KEY, { expiresIn: '2d' });

  res.json({ token });
});

// Middleware untuk memverifikasi JWT


// Protected route (memerlukan JWT untuk akses)
app.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you are authorized!` });
});

// Protected route (memerlukan JWT untuk akses)
app.post('/logout', (req, res) => {
  res.json({ 
    code : 200,
    message: `logout successfull` 
  });
});


// Mulai server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
