img="";
status="";
objects=[];
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
  status= true;
}

function gotResults(error, results)
{
   if (error)
   {
     console.log(error);
   }
   console.log(results);
   objects=results;
}

function preload()
{}

function draw()
{
    image(video,0,0,380,380);
    if (status== true)
    {
      r= random(225);
      g= random(225);
      b= random(225);
      objectDetector.detect(video, gotResults);
       for(i=0; i<objects.length; i++)
       {
       document.getElementById("status").innerHTML= "Status= Object Detected";
       document.getElementById("number_of_objects").innerHTML= "Number of objects="+objects.length;
       fill(r,g,b);
       percent=floor(objects[i].confidence*100);
       text(objects[i].label+" "+ percent+ "%", objects[i].x+20, objects[i].y+20);
       noFill();
       stroke(r,g,b);
       rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
}