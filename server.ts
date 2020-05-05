//Import node modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Import meat model
import Material from './models/Material';
import { GetGasolinePrice, GetGoldDomesticPrice, GetGoldPrice, GetWTIPrice, ExchangeRate} from './scraper';


let app = express();
let options:cors.CorsOptions = {
    allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept", 
        "X-Access-Token"
    ],
    credentials: true,
    methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
    origin: true,
    preflightContinue: false
}

app.use(bodyParser.json());
app.use(cors(options));

let materials = [
    new Material("삼겹살", 100, 1690, "https://media.giphy.com/media/tFKjJ4BM9nhM4/giphy.gif"), 
    new Material("한우", 100, 3000, "https://media.giphy.com/media/xUA7aXpxFxgtiFyrte/giphy.gif"), 
    new Material("호주산", 100, 3000, "https://media.giphy.com/media/hRYXatty4dJks/giphy.gif"),    
];

let exchangeRate = 0;

try
{
    GetWTIPrice().then((price) => {
        materials.push(new Material("WTI", 1, price, "https://media.giphy.com/media/8O1BElxvoXb9u/giphy.gif"));
    });

    GetGasolinePrice().then((price) => {
        materials.push(new Material("휘발유", 1, price, "https://media.giphy.com/media/W79wfYWCTWidO/giphy.gif"));
    });

    GetGoldPrice().then((price) => {
        materials.push(new Material("국제 금", 1, price, "https://media.giphy.com/media/wb6xgCSpLl0m4/giphy.gif"));
    })

    GetGoldDomesticPrice().then((price) => {
        materials.push(new Material("국내 금", 1, price, "https://media.giphy.com/media/XlvbF51R0T9uM/giphy.gif"));
    })

    ExchangeRate().then((rate) => {
        exchangeRate = rate;
    })
}
catch(error)
{
    console.log(error);
}
finally
{
    app.get('/', (req: express.Request, res: express.Response) => {
        return res.status(200).send(
            {
                materials,
                exchangeRate
            }
        );
    });
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`[+]Server us running on ${PORT} port...`);
    })
}
    
