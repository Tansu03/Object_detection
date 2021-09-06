img="";
status="";
object=[];
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status= Detecting object";
}

function modelLoaded()
{
  console.log("Model Loaded");
  status="true";
}

function gotResults(error, results)
{
   if (error)
   {
     console.log(error);
   }
   console.log(results);
   object=results;
}

function preload()
{}

function draw()
{
    image(video,0,0,380,380);
    if (status=="true")
    {
      r= random(225);
      g= random(225);
      b= random(225);
      objectDetector.detect(video, gotResults);
       for(i=0; i<object.length; i++) 
       {
       document.getElementById("status").innerHTML= "Status= Object Detected";
       document.getElementById("number_of_objects").innerHTML= "Number of objects="+object.length;
       fill(r,g,b);
       percent=floor(object[i].confidence*100);
       text(object[i].label+" "+ percent+ "%", object[i].x+20, object[i].y+20);
       noFill();
       stroke(r,g,b);
       rect(object[i].x, object[i].y, object[i].width, object[i].height);
       }
    }
}