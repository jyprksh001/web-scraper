var jsdom = require("node-jsdom");

var mysql=require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@nurAdh2',
  database : 'dbname',
  port: 3306,
  multipleStatements: true
});


connection.connect(function(err) {
  if (err) console.log(err);
  console.log('connection established');
});

////////urls
var url1='http://www.uaeexchange.com/uae-exchange-currency-rates/ae/urss';
//bank transfer rates
var url2='http://www.alansariexchange.com/en/currency/';
//DD/TT sell rates
var url3='http://www.sharafexchange.com/exchange-rates.aspx';
//DD/tt only
var url4='http://www.luluexchange.com/index.php';
//dd/tt only
var url5='http://onlinefx.westernunion.com/Currency-calculator';
//need to discuss
var url6='http://www.orientexchange.com/Rates.aspx';
//dd rates
var url7='http://www.habibexchange.com/exngrate.htm';
//dead
//dd/tt
var url8='http://www.alghurairexchange.com/index.php?option=com_content&view=article&id=179';
//url 10-16
//1 aed--->conversion
var url9='http://in.advfn.com/currency-converter/';
//currently useless
var url10='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=BHD,ILS,AED,KWD,LBP,OMR,QAR,SAR,SYP&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x220';
var url11='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=ARS,BOB,BRL,CLP,COP,PEN,PYG,UYU,VEF,&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x219';
var url12='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=AWG,BBD,BMD,BSD,CAD,DOP,GTQ,JMD,MXN,PAB,USD,XCD,&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x279';
var url13='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=AUD,FJD,NZD,XPF,&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x122';
var url14='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=BDT,CNY,HKD,IDR,INR,JPY,KHR,KRW,LAK,LKR,MVR,MYR,NPR,PHP,PKR,SGD,THB,TWD,VND,&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x421';
var url15='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=EGP,GHS,GMD,KES,MAD,MGA,MUR,NAD,NGN,SCR,TND,UGX,XAF,XOF,ZAR,&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x317';
var url16='http://www.fxexchangerate.com/converter1.php?fm=AED&ft=BAM,BGN,CHF,CZK,DKK,EUR,GBP,HRK,HUF,ISK,LTL,MDL,MKD,NOK,PLN,RON,RSD,RUB,SEK,TRY,UAH,&hc=0F0F0F&hb=D4EA37&bb=F0F0F0&bo=03080D&lg=en&tz=4s&wh=196x421';

var schedule = require('node-schedule');

schedule.scheduleJob('* * */6 * * *', function(){
  //console.log('The answer to life, the universe, and everything!');



jsdom.env(url1,["http://code.jquery.com/jquery.js"],function (err, window) {
    //console.log("Country Name", window.$("tr td:nth-child(1)").text());
    var arr=[];var dst_curr,tt_rate,fc_buy,fc_sell,dst_country;

    window.$("tr td:nth-child(1),tr td:nth-child(2),tr td:nth-child(3),tr td:nth-child(4),tr td:nth-child(5)").each(function(){
    	//console.log(window.$(this).text().trim());
   	arr.push(window.$(this).text().trim());
    });
    		//console.log(JSON.stringify(arr));
		    var sql='';
		    for(i=5;i<arr.length-4;i+=5){
    		dst_curr=arr[i];
    		//console.log(dst_curr);
    		dst_country=arr[i+1];
    		tt_rate=arr[i+2];
    		fc_buy=arr[i+3];
    		fc_sell=arr[i+4];
    		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_curr,tt_rate,fc_buy,fc_sell,dst_country) VALUES ('UAE Exchange','AED',"+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+","+"'"+fc_buy+"'"+","+"'"+fc_sell+"'"+","+"'"+dst_country+"'"+");" 
    		//console.log ("sql: [" + sql + "]");
    		}
    		console.log(sql);

    		connection.query(sql, function(err,rows){
				if(err) throw err;
				console.log('data dumped');
			});
    //var b={};
	//for(i=1;i<arr.length;i++){
	//b.a.[arr[i]] =arr2[i];
	//b.b.[arr]
	//}
	//console.log(b);
	//c.uae=b;
});

jsdom.env(url2,["http://code.jquery.com/jquery.js"],function (errors, window){
    //console.log("country", window.$("tbody tr :nth-child(1)").text());
    var arr=[];var dst_curr,tt_rate,fc_buy,fc_sell,dst_country;
    window.$("td.CurrencyListItems,td.CurrencyListItemsIN,td.CurrencyListBANKNOTES,td.CurrencyListBANKNOTES2").each(function(){
    	arr.push(window.$(this).text().trim())
    })
    console.log(arr);
    arr.splice((arr.length-36),36);

    //var sql='';
    //for(i=0;i<arr.length-1;i=i+4){
  	//if(arr[i]=='-'|| arr[i]==''||arr[i+1]=='-'||arr[i+1]==''||arr[i+2]=='-'||arr[i+2]==''||arr[i+3]=='-'||arr[i+3]=='')
  	//{
  	//	console.log(arr[i],arr[i+1],arr[i+2],arr[i+3]);
  	//}
    //}
var arr3=["UK POUND","LABENESE POUND","EGYPT POUND","JORDAN DINAR","OMAN RIAL","KUWAIT DINAR","BAHRAIN DINAR","QATAR RIYAL","SAUDI RIYAL","INDIAN RUPEE","PAKISTAN RUPEE","YEMEN RIYAL","MOROCCO DIRHAM","SWISS FRANC","CANADIAN DOLLAR","THAILAND BHAT","SINGAPORE DOLLAR","JAPAN YEN","AUST. DOLLAR","MALAYSIAN RINGGIT","PHILIPPINE PESO","TUNIS DINAR","INDONESIAN RUPIAH","BANGLADESH TAKA","SRILANKAN RUPEE","NEW ZEALAND","EURO","U.S.A.DOLLAR","NEPAL RUPEE","SWEDISH KRONA","DANISH KRONE","NORWEGIAN KRONE","BRUNEI DOLLAR","TAIWAN DOLLAR","ETHIPOIAN BIRR","CHINESE YUAN"];
var arr31=["GBP","LBP","EGP","JOD","OMR","KWD","BHD","QAR","SAR","INR","PKR","YER","MAD","CHF","CAD","THB","SGD","JPY","AUD","MYR","PHP","TND","IDR","BDT","LKR","NZD","EUR","USD","NPR","SEK","DKK","NOK","BND","TWD","ETB","CNY"];
	var sql='';
 	for(i=0;i<arr.length-1;i=i+4){
       	dst_country=arr[i];
       	dst_curr=arr31[arr3.indexOf(arr[i])];
    	tt_rate=arr[i+1];
    	fc_buy=arr[i+2];
    	fc_sell=arr[i+3];
    	sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_curr,dst_country,tt_rate,fc_buy,fc_sell) VALUES ('Alan Sarie Exchange','AED',"+"'"+dst_curr+"'"+","+"'"+dst_country+"'"+","+"'"+tt_rate+"'"+","+"'"+fc_buy+"'"+","+"'"+fc_sell+"'"+");"  	
   	} 
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});
	
	
});

jsdom.env(url3,['http://code.jquery.com/jquery.js'], function(err,window){

//console.log("country",window.$("table tbody :nth-child(2)").text());
//,table tbody :nth-child(2),table tbody :nth-child(3),table tbody :nth-child(4)
var arr=[];
window.$("table tbody :nth-child(1),table tbody :nth-child(2),table tbody :nth-child(3),table tbody :nth-child(4)").each(function(){
	arr.push(window.$(this).text().trim())
});
	arr.splice(0,6);
	arr.splice(4,1);
	arr.splice(8,1);
	arr.splice(0,4);
	arr.splice(20,24);
	arr.splice(28,4);
	arr.splice(32,4);
	arr.splice(48,16);
	arr.splice(52,4);
	console.log(arr);
	
var arr3=["GBP","LABENESE POUND","EGYPT POUND","JORDAN DINAR","OMAN RIAL","KUWAIT DINAR","BAHRAIN DINAR","QATAR RIYAL","SAUDI RIYAL","INDIAN RUPEE","PAKISTAN RUPEE","YEMEN RIYAL","MOROCCO DIRHAM","SWISS FRANC","CANADIAN DOLLAR","THAILAND BHAT","SINGAPORE DOLLAR","JAPAN YEN","AUS DOLLAR","MALAYSIAN RINGGIT","PHILIPPINE PESO","TUNIS DINAR","INDONESIAN RUPIAH","BANGLADESH TAKA","SRILANKAN RUPEE","NEW ZEALAND","EURO","USD","NEPAL RUPEE","SWEDISH KRONA","DANISH KRONE","NORWEGIAN KRONE","BRUNEI DOLLAR","TAIWAN DOLLAR","ETHIPOIAN BIRR.","CHINESE YUAN","ALGERIAN DINAR",""];
var arr31=["GBP","LBP","EGP","JOD","OMR","KWD","BHD","QAR","SAR","INR","PKR","YER","MAD","CHF","CAD","THB","SGD","JPY","AUD","MYR","PHP","TND","IDR","BDT","LKR","NZD","EUR","USD","NPR","SEK","DKK","NOK","BND","TWD","ETB","CNY","DZD"];

	var sql='';
 	for(i=0;i<arr.length-1;i=i+4){
       	dst_country=arr[i];
    	dst_curr=arr31[arr3.indexOf(arr[i])];
    	tt_rate=arr[i+1];
    	fc_buy=arr[i+2];
    	fc_sell=arr[i+3];
    	sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_curr,dst_country,tt_rate,fc_buy,fc_sell) VALUES ('Sharaf Exchange','AED',"+"'"+dst_curr+"'"+","+"'"+dst_country+"'"+","+"'"+tt_rate+"'"+","+"'"+fc_buy+"'"+","+"'"+fc_sell+"'"+");"  	
   	} 
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});
	


//var b={};
//for(i=1;i<arr.length;i++){
//b[arr[i]] =arr2[i];
//}
//console.log(b);

});


/*
jsdom.env(url4,['http://code.jquery.com/jquery.js'], function(err,window){

console.log("country",window.$(".selectOption.rate").text());
});


jsdom.env(url4,['http://code.jquery.com/jquery.js'], function(err,window){

console.log("rate",window.$(".selectOption.rate").text());
}); //doubt


jsdom.env(url5,['http://code.jquery.com/jquery.js'], function(err,window){

console.log("country",window.$(".selectOption.rate").text());
});

jsdom.env(url6,['http://code.jquery.com/jquery.js'], function(err,window){
//console.log("country",window.$("tr td:nth-child(2)").text());
	var arr=[];
	window.$("tr td:nth-child(2)").each(function(){
		arr.push(window.$(this).text().trim());
	});
	//console.log(arr);
	var arr2=[];
	window.$("tr td:nth-child(6)").each(function(){
		arr2.push(window.$(this).text().trim());
	});
	//console.log(arr2);
	var b={};
	for(i=1;i<arr.length;i++){
	b[arr[i]] =arr2[i];
	}
	console.log(b);
	c.orient=b;
});

url dead
jsdom.env(url7,['http://code.jquery.com/jquery.js'], function(err,window){

console.log("tt",window.$(".MsoNormal b span").text());
var arr=[];
window.$(".MsoNormal b span").each(function(){
	arr.push(window.$(this).text());
});
console.log(arr);
});
*/


jsdom.env(url10,['http://code.jquery.com/jquery.js'], function(err,window){
	//console.log("tt", window.$("tbody tr td").text());

	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
		arr.push(window.$(this).text());
	});
	console.log(arr);
	
	var arr3=["Bahraini Dinar","Israeli Shekel","UAE Dirham","Kuwaiti Dinar","Lebanese Pound","Omani Rial","Qatar Rial","Saudi Arabian Riyal","Syrian Pound"]
	var arr31=["BHD","ILS","AED","KWD","LBP","OMR","QAR","SAR","SYP"]
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	
	
	console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});	

	//var b={};

	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

	//console.log(b);
	//e.data1=b;
	//d.push(e.data1);
});


jsdom.env(url11,['http://code.jquery.com/jquery.js'], function(err,window){
	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
		arr.push(window.$(this).text());
	});
	var arr3=["Argentine Peso","Bolivian Boliviano","Brazilian Real","Chilean Peso","Colombian Peso","Peruvian Nuevo Sol","Paraguayan Guarani","Uruguayan New Peso","Venezuelan Bolivar"];
	var arr31=["ARS","BOB","BRL","CLP","COP","PEN","PYG","UYU","VEF"];
	
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	//console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});
	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

	//console.log(b);
	//e.data2=b;
	//d.push(e.data2);
});

jsdom.env(url12,['http://code.jquery.com/jquery.js'], function(err,window){

	//console.log("tt", window.$("tbody tr td").text());
	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
		arr.push(window.$(this).text());
	});

	var arr3=["Aruba Florin","Barbados Dollar","Bermuda Dollar","Bahamian Dollar","Canadian Dollar","Dominican Peso","Guatemala Quetzal","Jamaican Dollar","Mexican Peso","Panama Balboa","United States Dollar","East Caribbean Dollar"];
	var arr31=["AWG","BBD","BMD","BSD","CAD","DOP","GTQ","JMD","MXN","PAB","USD","XCD"];
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	
	
	console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});
	//console.log(arr);
	//var b={};


	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

	//console.log(b);
	//e.data3=b;
	//d.push(e.data3);
});

jsdom.env(url13,['http://code.jquery.com/jquery.js'], function(err,window){
	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
		arr.push(window.$(this).text());
	});
	var arr3=["Australian Dollar","Fiji Dollar","New Zealand Dollar","Pacific Franc"];
	var arr31=["AUD","FJD","NZD","XPF"];
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	
	
	console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});
	//console.log(arr);
	//var b={};
	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

	//console.log(b);
	//e.data4=b;
	//d.push(e.data4);

});

jsdom.env(url14,['http://code.jquery.com/jquery.js'], function(err,window){
	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
	arr.push(window.$(this).text());
	});
	var arr3=["Bangladesh Taka","Chinese Yuan","Hong Kong Dollar","Indonesian Rupiah","Indian Rupee","Japanese Yen","Cambodia Riel","Korean Won","Lao Kip","Sri Lanka Rupee","Maldives Rufiyaa","Malaysian Ringgit","Nepalese Rupee","Philippine Peso","Pakistani Rupee","Singapore Dollar","Thai Baht","Taiwan Dollar","Vietnam Dong"];
	var arr31=["BDT","CNY","HKD","IDR","INR","JPY","KHR","KRW","LAK","LKR","MVR","MYR","NPR","PHP","PKR","SGD","THB","TWD","VND"];
	
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});

	//console.log(arr);
	//var b={};


	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

	//console.log(b);
	//e.data5=b;
	//d.push(e.data5);
});

jsdom.env(url15,['http://code.jquery.com/jquery.js'], function(err,window){

	//console.log("tt", window.$("tbody tr td").text());

	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
		arr.push(window.$(this).text());
	});
	//console.log(arr);
	var arr3=["Egyptian Pound","Ghanaian Cedi","Gambian Dalasi","Kenyan Shilling","Moroccan Dirham","Mauritius Rupee","Namibian Dollar","Nigerian Naira","Seychelles Rupee","Tunisian Dinar","Ugandan Shilling","CFA Franc (BEAC)","CFA Franc (BCEAO)","South African Rand"];
	var arr31=["EGP","GHS","GMD","KES","MAD","MGA","MUR","NAD","NGN","SCR","TND","UGX","XAF","XOF","ZAR"];
	
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	
	
	console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	});
	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

	//console.log(b);
	//e.data6=b;
	//d.push(e.data6);

});

jsdom.env(url16,['http://code.jquery.com/jquery.js'], function(err,window){

	//console.log("tt", window.$("tbody tr td").text());
	var arr=[];
	var dst_country,tt_rate,sql="";
	window.$("tbody tr td").each(function() {
		arr.push(window.$(this).text());
	});
	//console.log(arr);
	var arr3=["Bulgarian Lev","Swiss Franc","Czech Koruna","Danish Krone","Euro","British Pound","Croatian Kuna","Hungarian Forint","Iceland Krona","Lithuanian Lita","Moldovan Leu","Macedonian Denar","Norwegian Krone","Polish Zloty","Romanian New Leu","Russian Rouble","Swedish Krona","Turkish Lira","Ukraine Hryvnia"];
	var arr31=["BAM","BGN","CHF","CZK","CZK","DKK","EUR","GBP","HUF","ISK","LTL","MDL","MKD","NOK","PLN","RON","RSD","RUB","SEK","TRY","UAH"];
	
	for(i=1;i<arr.length-1;i=i+2){
		dst_country=arr[i];
		dst_curr=arr31[arr3.indexOf(arr[i])];
		tt_rate=arr[i+1];
		sql=sql+"INSERT into fx_rate_web_scraped (exchange_house,src_curr,dst_country,dst_curr,tt_rate) VALUES ('fx Exchange','AED',"+"'"+dst_country+"'"+","+"'"+dst_curr+"'"+","+"'"+tt_rate+"'"+");"  	
	
	}
	console.log(sql);
   	connection.query(sql, function(err,rows){
		if(err) throw err;
		console.log('data dumped');
	
	});

	//for(i=1;i<arr.length-1;i=i+2){
	//console.log(arr[i]+' '+arr[i+1]+'\n');
	//b[arr[i]] = arr[i+1];
	//b[arr[i].trim()] = arr[i+1].trim();
	//}

});

});
