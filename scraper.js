let axios = require('axios');
let cheerio = require('cheerio');


let GetHTML = async () => {
    try
    {
        return await axios.get('https://finance.naver.com/marketindex/')
    }
    catch(error)
    {
        console.log(error);
    }
}

let GetWTIPricePerLiter = async () => {
    try
    {
        let result = '';
        await GetHTML().then(async (html) => {
            const $ = cheerio.load(html.data);
            const $MARKET3_LIST = $("div.market3").children("div.data").children("ul.data_lst");
            const $MARKET3_LIST_ELEMENTS = $MARKET3_LIST.children("li");

            const $WTI_ELEMENT = $MARKET3_LIST_ELEMENTS.children("a.wti").children("div.head_info").children("span.value");
            const WTI_PRICE_PER_LITER = $WTI_ELEMENT.text();

            result = WTI_PRICE_PER_LITER
        });

        return parseFloat(result);
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
};

let GetGasolinePricePerLiter = async () => {
    try
    {
        let result = '';
        await GetHTML().then((html) => {
            const $ = cheerio.load(html.data);
            const $MARKET3_LIST = $("div.market3").children("div.data").children("ul.data_lst");
            const $MARKET3_LIST_ELEMENTS = $MARKET3_LIST.children("li");

            const $GAS_ELEMENT = $MARKET3_LIST_ELEMENTS.children("a.gasoline").children("div.head_info").children("span.value");
            const GASOLINE_PRICE_PER_LITER = $GAS_ELEMENT.text();
    
            result = GASOLINE_PRICE_PER_LITER;
        });

        return parseFloat(result);
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

let GetGoldPricePerGram = async () => {
    try
    {
        let result = '';
        await GetHTML().then((html) => {
            const $ = cheerio.load(html.data);
            const $MARKET3_LIST = $("div.market3").children("div.data").children("ul.data_lst");
            const $MARKET3_LIST_ELEMENTS = $MARKET3_LIST.children("li");

            const $GOLD_ELEMENT = $MARKET3_LIST_ELEMENTS.children("a.gold_inter").children("div.head_info").children("span.value");
            const GOLD_PRICE_PER_LITER = $GOLD_ELEMENT.text();
    
            result = GOLD_PRICE_PER_LITER;
        });

        return parseFloat(result);
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

let GetGoldDomesticPricePerGram = async () => {
    try
    {
        let result = '';
        await GetHTML().then((html) => {
            const $ = cheerio.load(html.data);
            const $MARKET3_LIST = $("div.market3").children("div.data").children("ul.data_lst");
            const $MARKET3_LIST_ELEMENTS = $MARKET3_LIST.children("li");

            const $GOLD_DOMESTIC_ELEMENT = $MARKET3_LIST_ELEMENTS.children("a.gold_domestic").children("div.head_info").children("span.value");
            const GOLD_DOMESTIC = $GOLD_DOMESTIC_ELEMENT.text();

            result = GOLD_DOMESTIC;
        })
        
        return parseFloat(result);
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

let GetExchangeRate = async () => {
    try
    {
        let result = '';
        await GetHTML().then((html) => {
            const $ = cheerio.load(html.data);
            const $MARKET1_LIST = $("div.market1").children("div.data").children("ul.data_lst");
            const $MARKET1_LIST_ELEMENTS = $MARKET1_LIST.children("li").children("a.usd").children("div.head_info").children("span.value");

            const EXCHANGE_RATE = $MARKET1_LIST_ELEMENTS.text();
            result = EXCHANGE_RATE;
        });
        result = result.replace(/,/gi, "");
        return parseFloat(result);
    }
    catch(error)
    {
        console.log(error);
        return false;
    }
}

exports.GetWTIPrice = async () => {
    const WTI_PRICE = await GetWTIPricePerLiter();
    const EXCHANGE_RATE = await GetExchangeRate();

    return WTI_PRICE * EXCHANGE_RATE;
}

exports.GetGasolinePrice = async () => {
    let GASOLINE_PRICE = await GetGasolinePricePerLiter();

    return GASOLINE_PRICE;
}

exports.GetGoldPrice = async () => {
    let GOLD_PRICE = await GetGoldPricePerGram();
    const EXCHANGE_RATE = await GetExchangeRate();

    return GOLD_PRICE * EXCHANGE_RATE;
}

exports.GetGoldDomesticPrice = async () => {
    let DOMESTIC_GOLD_PRICE = await GetGoldDomesticPricePerGram();

    return DOMESTIC_GOLD_PRICE;
}

exports.ExchangeRate = async () => {
    let EXCHANGE_RATE = await GetExchangeRate();
    return EXCHANGE_RATE;
}