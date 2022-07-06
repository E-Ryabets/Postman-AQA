pm.test(`Переменная запроса pagevar = значению текущей страницы`, function() 
{
    let jsonData1 = pm.response.json();
    let pageCurrent = pm.variables.get("pagevar");
    pm.expect(jsonData1.data.paginationMeta.currentPage).to.eql(pageCurrent);
});

let testMoment = pm.response.json().data.last_update;
let survivals = pm.response.json().data.rows[0].total_recovered;
let currentCountry = pm.response.json().data.rows[0].country;

pm.test(`На момент ${testMoment} количество выздоровевших в ${currentCountry}  = ${survivals}`, function () {
    let jsonData2 = pm.response.json();
        pm.expect(jsonData2.status).to.eql("success");
        pm.expect(pm.response.text()).to.include("country_abbreviation");
});

let headerSearch = "X-Frame-Options";

pm.test(`Хедеры ответа сервера соответствуют документации и содержат хедер ${headerSearch}`, function () {
    pm.response.to.have.header(`${headerSearch}`);

});

let rt = pm.response.responseTime;
pm.environment.set("rtLimit", 500);
let rtL = pm.environment.get("rtLimit");

pm.test(`Время ответа составило ${rt} ,что не превышает лимит в ${rtL}`, function () {
    pm.expect(pm.response.responseTime).to.below(rtL);
});

pm.environment.set("search", "Russia");

