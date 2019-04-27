// console.log("hello from index")
let capture;
let submitButton;
let locationData;

const MODEL_URL = 'face-api/weights/';

function preload(){
    faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    faceapi.loadFaceLandmarkModel(MODEL_URL)
    faceapi.loadFaceRecognitionModel(MODEL_URL)
    faceapi.loadFaceExpressionModel(MODEL_URL)
}


function setup(){
    createCanvas(200, 200).parent("#mySketch");
    capture = createCapture(VIDEO);
    capture.hide()
    capture.size(width, height);
    imageMode(CENTER);
    // getCurrentPosition(doThisOnLocation)

    console.log(faceapi);
    pixelDensity(0.5);

    submitButton = select("#submitButton");
    submitButton.mousePressed(getExpressions());


    
}


function getExpressions(){
    return async (e) => {
        let output = {
            image: '',
            expressions: []
        }
        
        const last_img = get()
        output.image = last_img.canvas.toDataURL()

        output.expressions = await faceapi.detectAllFaces(last_img.canvas).withFaceExpressions()

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(output)
        }

        fetch(`/api`, options).then(result => {
            // updateMyDots()
            console.log('success')
        })

    }

}

// function handleSubmit(e){
//     let output = {
//         location: {},
//         image: ''
//     }
    
//     // output.location.lat = locationData.latitude
//     // output.location.lon = locationData.longitude
    
//     const last_img = get()
//     output.image = last_img.canvas.toDataURL()

//     console.log(last_img)

//     const options = {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//             // "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: JSON.stringify(output)
//     }
//     fetch(`/api`, options).then(result => {
//         // updateMyDots()
//         console.log('success')
//     })

// }

function doThisOnLocation(position){
    locationData = position
    console.log(position.latitude)
    console.log(position.longitude)
    select("#lat").html( nfc(position.latitude, 4) )
    select("#lon").html( nfc(position.longitude, 4))
}

function draw(){
    background(220);
    image(capture,width/2,height/2, width*1.3, height)
}