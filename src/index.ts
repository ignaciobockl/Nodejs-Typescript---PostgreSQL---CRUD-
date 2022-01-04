import express from 'express';
import indexRoutes from './routes/index';


const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexRoutes);

app.listen(4000, () => {
    console.log('Server on port', 4000);
});



// https://www.youtube.com/watch?v=z4BNZfZ1Wq8&list=PLo5lAe9kQrwo-ILxlSGaFhF768hhPbrFB&index=8