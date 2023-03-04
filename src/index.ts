// Instalando e configurando o Express

// Para adicionar o Express como dependência, usamos o comando:
// npm install express

// Devemos também adicionar a versão tipada dessa biblioteca como dependência de desenvolvimento  - afinal, estamos usando o Typescript:
// npm install @types/express -D


// ### CORS

// Instalaremos, também, uma * lib * auxiliar chamada *** CORS *** (* Cross - Origin Resource Sharing *) que nos permite enviar requisições de uma página estática(front), hospedada localmente, para um servidor HTTP(back), também executado localmente.
// npm install cors
// npm install @types/cors -D

// ### TS NODE DEV

// Instale a lib ** ts - node - dev ** e crie um script chamado ** dev ** que executa o arquivo ** index.ts ** diretamente.
// npm install ts-node-dev -D




//além de importar o express, também precisamos importar os objetos Request
//e Response, sempre entre chaves {} 👇🏽
import  express, { Request, Response} from 'express'

//import do CORS 👇🏽
import cors from 'cors';

//criação do servidor express 👇🏽
const app = express();

//configuração do middleware que garante que nossas respostas estejam sempre
//no formato json 👇🏽
app.use(express.json());

//configuração do middleware que habilita o CORS 👇🏽
app.use(cors());
//colocando nosso servidor para escutar a porta 3003 da nossa máquina (primeiro 
//parâmetro da função listen)
//a função de callback (segundo parâmetro da função listen) serve para sabermos 
//que o servidor está de pé, através do console.log que imprimirá a mensagem no 
//terminal 👇🏽
 
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

// app.method(path, handler);

app.get('/ping', (req: Request, res: Response) => {
  res.send('eai meu camarada!')
});

// É só executar o script de start.

// **Enquanto a aplicação estiver rodando**, podemos verificar o resultado no **Postman**!

// **GET http://localhost:3003/ping**

// Ou então **abrir direto no navegador**, pois toda página carregada é um **GET**.

// [**http://localhost:3003/ping**]
// (http://localhost:3003/ping)