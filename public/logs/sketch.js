console.log("hello from logs")

let myData;
let $entries;
function preload(){
    myData = loadJSON('/api');
}

function setup(){
    noCanvas();
    noLoop();

    $entries = select("#entries");
}

function myEntryEl(item){
    const myImage = `<img src="${item.image}">`;
    // const lat = nfc(item.location.lat, 4)
    // const lon = nfc(item.location.lon, 4)
    // console.log(item.expressions[0].expressions)
    const expressions = item.expressions[0].expressions
    const dateString = moment(item.created).toDate().toString();
    let lis = ''
    
    expressions.forEach( exp => {
        lis += `<li> ${exp.expression} ${ exp.probability.toFixed(3)*100.0}% </li>`
    });

    console.log(lis)

    return`
        <div class="pa4 bn flex flex-column justify-center items-center ba br2 b--yellow bw2 mw5">
            <div class="w-100 flex flex-row justify-center items-center">${myImage}</div>
            <div class="w-100 tc yellow pa2">${dateString}</div>
            <div class="w-100 tc yellow pa2">
                <ul class="list pa0 tl f7">
                    ${ lis }
                </ul>
            </div>
        </div>
    `
}

function draw(){

    for(p in myData){
        let item = myData[p];
        let itemEl = myEntryEl(item);
        entries.innerHTML += itemEl
    }

}