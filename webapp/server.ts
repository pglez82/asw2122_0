import express,{Application} from 'express'; 
//for using an import here we need to configure the tsconfig.json
//setting the option module to commonjs

var app:Application = express()
app.use(express.static('build'))
app.listen(3000)