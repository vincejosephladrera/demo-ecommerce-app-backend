import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import adminRouter from './features/auth-admin/admin.router';
import categoriesRouter from './features/categories/categories.router';
import brandsRouter from './features/brands/brands.router';
import productsRouter from './features/products/products.router';
import productVariantsRouter from './features/product-variants/productVariants.router';

const app = express();


app.use(cors())
app.use(morgan('dev'));
app.use(express.json())

//to support query strings in the url
app.use(express.urlencoded({ extended: true }))

app.use('/admin', adminRouter)

app.use('/categories', categoriesRouter)

app.use('/brands', brandsRouter)

app.use('/products', productsRouter)

app.use('/product-variants', productVariantsRouter)


export default app;
