Webcam.set({

    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
 Webcam.attach('#camera');

 function take_snapshot()
 {
     Webcam.snap(function(data_uri) {

        document.getElementById("result").innerHTML='<img id="captured_image" src="' +data_uri+'">';

     });
 }

 console.log('ml5 version:',ml5.version);

 classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/pYkwjQZWi/model.json',modelLoaded);

 function modelLoaded(){
    console.log('model Loaded');
}




function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results)
{

if(error){
    console.error(error);
}    else{

    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
  
    gesture= results[0].label;
   ToSpeak ="" ;
    speak();
    if(gesture=="Thumbs up")
    {
     ToSpeak= "it is the all the best emoji "   ;
     document.getElementById("result_emotion_name").innerHTML ="&#128077;";
    }
   else if(gesture=="right arrow"){
        ToSpeak= "Right arrow emoji" ;
        document.getElementById("result_emotion_name").innerHTML ="&#128073;";
    } 
    else if(gesture=="v for victory"){
        ToSpeak= "That was a marvelous victory"  ;
        document.getElementById("result_emotion_name").innerHTML ="&#9996;";
    }  

}
}
function speak(){

    var synth =  window.speechSynthesis;

    speak_data = ToSpeak;

var utterThis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterThis);
   


}