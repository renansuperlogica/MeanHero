var express     = require('express'); 
var app         = express(); 
var bodyParser  = require('body-parser');  
 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var port = process.env.PORT || 8000; 

var router  = express.Router(); 
 
var mongoose = require('mongoose'); 
 
mongoose.connect('mongodb://root:123456@ds159493.mlab.com:59493/node-restful');

var Heroi = require('./models/heroi');

router.use(function(req, res, next) {
    console.log('Algo está acontecendo aqui........');
    next(); //aqui é para sinalizar de que prosseguiremos para a próxima rota. E que não irá parar por aqui!!!
});

router.route('/herois')
 
    /* 1) Método: Criar heroi (acessar em: POST http://localhost:8080/api/herois */
    .post(function(req, res) {
        var heroi = new Heroi();
 
        //aqui setamos os campos do heroi (que virá do request)
        heroi.nome = req.body.nome;
 
        heroi.save(function(error) {
            if(error)
                res.send(error);
 
            res.json({ message: 'Hero created! Congratulations.' });
        });
    })
    /* 2) Método: Selecionar Todos (acessar em: GET http://locahost:8080/api/herois) */
    .get(function(req, res) {
 
        //Função para Selecionar Todos os 'herois' e verificar se há algum erro:
        Heroi.find(function(err, Heroi) {
            if(err)
                res.send(err);
 
            res.json(Heroi);
        });
    });
    
router.route('/herois/:id')
 
    /* 3) Método: Selecionar Por Id (acessar em: GET http://localhost:8080/api/herois/:id) */
    .get(function(req, res) {
 
        //Função para Selecionar Por Id e verificar se há algum erro:
        Heroi.findById(req.params.id, function(error, Heroi) {
            if(error)
                res.send(error);
 
            res.json(Heroi);
        });
    })
    
    .put(function(req, res) {

        //Primeiro: Para atualizarmos, precisamos primeiro achar o Usuario. Para isso, vamos selecionar por id:
        Heroi.findById(req.params.id, function(error, Heroi) {
            if(error) 
                res.send(error);
            
            //Segundo: Diferente do Selecionar Por Id... a resposta será a atribuição do que encontramos na classe modelo:
            Heroi.nome = req.body.nome;

            //Terceiro: Agora que já atualizamos os campos, precisamos salvar essa alteração....
            Heroi.save(function(error) {
                if(error)
                    res.send(error);

                res.json({ message: 'Heroi Updted!' });
            });
        });
    })
    
    .delete(function(req, res) {

        //Função para excluir os dados e também verificar se há algum erro no momento da exclusão:
        Heroi.remove({
        _id: req.params.id
        }, function(error) {
            if(error)
                res.send(error);

            res.json({ message: 'Heroi excluded! '});
        });
    });;


app.use('/api', router); 

app.listen(port);
console.log('Iniciando a aplicação na porta ' + port);