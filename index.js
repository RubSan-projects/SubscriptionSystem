const express = require('express');
const app = express();
const path = require ('path');
const routes = require('./routes/routes.js');


app.set('port',3000);

app.get('/',(req,res)=>{
   //res.send('Challenge Accepted!!!!')
   res.statusCode = 302;
   res.setHeader("Location", "https://www.adidas.co.uk/on/demandware.store/Sites-adidas-GB-Site/en_GB/Newsletter-Subscribe");
   res.end();
})

app.listen(app.get('port'),()=>{
   console.log('APP running on port 3000');
})

//Public
app.use(express.static(path.join(__dirname,'public')))
//Routes information
app.use(routes);


//API documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
