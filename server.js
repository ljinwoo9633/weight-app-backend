"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Import node modules
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
//Import meat model
var Material_1 = __importDefault(require("./models/Material"));
var scraper_1 = require("./scraper");
var app = express_1.default();
var options = {
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
};
app.use(body_parser_1.default.json());
app.use(cors_1.default(options));
var materials = [
    new Material_1.default("삼겹살", 100, 1690, "https://media.giphy.com/media/tFKjJ4BM9nhM4/giphy.gif"),
    new Material_1.default("한우", 6000, 3000, "https://media.giphy.com/media/xUA7aXpxFxgtiFyrte/giphy.gif"),
    new Material_1.default("호주산", 100, 3000, "https://media.giphy.com/media/hRYXatty4dJks/giphy.gif"),
];
var exchangeRate = 0;
try {
    scraper_1.GetWTIPrice().then(function (price) {
        materials.push(new Material_1.default("WTI", 1, price, "https://media.giphy.com/media/8O1BElxvoXb9u/giphy.gif"));
    });
    scraper_1.GetGasolinePrice().then(function (price) {
        materials.push(new Material_1.default("휘발유", 1, price, "https://media.giphy.com/media/W79wfYWCTWidO/giphy.gif"));
    });
    scraper_1.GetGoldPrice().then(function (price) {
        materials.push(new Material_1.default("국제 금", 1, price, "https://media.giphy.com/media/wb6xgCSpLl0m4/giphy.gif"));
    });
    scraper_1.GetGoldDomesticPrice().then(function (price) {
        materials.push(new Material_1.default("국내 금", 1, price, "https://media.giphy.com/media/XlvbF51R0T9uM/giphy.gif"));
    });
    scraper_1.ExchangeRate().then(function (rate) {
        exchangeRate = rate;
    });
}
catch (error) {
    console.log(error);
}
finally {
    app.get('/', function (req, res) {
        return res.status(200).send({
            materials: materials,
            exchangeRate: exchangeRate
        });
    });
    var PORT_1 = process.env.PORT || 5000;
    app.listen(PORT_1, function () {
        console.log("[+]Server us running on " + PORT_1 + " port...");
    });
}
