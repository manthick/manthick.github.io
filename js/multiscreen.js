/*
TO DO: 
Change existing and add new event listeners so
that when the user runs their cursor over the screens, 
clicks or double clicks,the screens interact with one another 
in interesting and perhaps unexpected ways.                                     
 
Use some of the ideas in the McCloud readings to think about how 
the screens might be related together.
*/

// the number of milliseconds between frames if the frame contains 
// an array of images
let pause_between_frames = 250;

//fscreen constructor
function Fscreen(filename, isLooping = false) {
  let tag, container;
  //if is an array of images...
  if (filename instanceof Array) {
    this.mode = "images";
    this.frames = filename;
    container = document.createElement("img");
    this.currentFrame = 0;
    //or if it's a video...
  } else if (filename.includes("mp4") || filename.includes("webm")) {
    this.mode = "video";
    container = document.createElement("video");
    container.src = filename;
    container.loop = isLooping;
    container.autoplay = true;
    container.muted = true; // Comment this line out if you need the audio.
  }
  this.isLooping = isLooping;
  this.id = fscreens.length;
  container.id = "screen" + this.id;
  container.classList.add("fScreen");

  //script that runs when mouse enters...
  container.addEventListener("mouseenter", () => {
    this.isLooping = false;
  });

  //and when it leaves...
  container.addEventListener("mouseleave", () => {
    this.isLooping = true;
  });

  //and if we click...
  container.addEventListener("click", () => {
    this.container.classList.toggle("invert");
  });

  //add container to the HTML body
  document.body.appendChild(container);
  this.container = container;
} //end Fscreen;

// wait until the page has loaded, and
// then start the animation
document.addEventListener("DOMContentLoaded", function () {
  animate();
});

// initialized as an empty array
let fscreens = [];

// TO DO: Replace the URLs of these videos with links
// to videos you have downloaded or created or that are 
// hosted on an accessible platform, like the 
// Internet Archive.  If they are your own copies
// you can store them on DropBox, or if you have
// a Standard or better account, on Vimeo.  You can
// use videos that are either of type MP4 or WEBM.

const videos = [
  "https://archive.org/download/turner_video_140324/140324.ia.mp4?t=00:00:03",
  "images/ultra-2.mp4",
  "images/ultra-3.mp4",
  "https://archive.org/download/ultramanepisode13englishdub/ULTRAMAN%20%20Episode%2006%20English%20Dub.mp4?t=00:10:56",
  "https://archive.org/download/return-of-ultraman-ep.-26-34/Ep.28%20Ultra%20Special%20Operation.ia.mp4?t=00:02:55",
  "https://archive.org/download/UMTIGA265/Ultraman%20Tiga%20-%20001.mp4?t=00:04:00",
  "https://archive.org/download/AnimeTheater10Ultraman/Anime%20Theater%2010%20-%20Ultraman.mp4?t=00:19:45",
  "https://archive.org/download/return-of-ultraman-ep.-26-34/Ep.26%20Mystery%21%20The%20Case%20of%20the%20Killer%20Beetle.ia.mp4?t=00:21:42",
  "https://archive.org/download/4-k-ultraman-tiga-gaiden-revival-of-the-ancient-giant/%5B4K%5DUltraman%20Tiga%2002.mp4?t=00:17:37"
 ];

// Put each videos in its own Fscreen.
for (let i = 0; i < 9; i++) {
  let screen = new Fscreen(videos[i], true);
  // screen.container.classList.toggle("invert");
  screen.container.playbackRate = 0.5;
  fscreens.push(screen);
}

// This is the main function that animates the frames of
// all of the screens.
async function animate() {
  //for each fscreen
  for (let fs of fscreens) {
    //if its mode is video...
    if (fs.mode === "video") {
      // if it should be playing and if it isn't
      // playing (using video property)
      if (fs.isLooping && !fs.container.playing) {
        fs.container.play();
      }
      // if it shouldn't be playing
      if (!fs.isLooping) {
        fs.container.pause();
      }
    } else {
      // it's an image!
      // if it's looping...
      if (fs.isLooping) {
        //advance currentFrame to the next frame
        fs.currentFrame = (fs.currentFrame + 1) % fs.frames.length;
        //update the img src to the new frame;
        fs.container.src = fs.frames[fs.currentFrame];
      } //end if
    } //end else
  } //end loop

  //take a moment
  await sleep();
  //and do it again
  animate();
}

//waits, by default for pause_between_frames.
async function sleep(ms = pause_between_frames) {
  return new Promise(function (resolve) {
    window.setTimeout(function () {
      resolve();
    }, ms);
  });
}

let usersManual = document.createElement("p");
// TO DO: Replace the string "This is a user's manual" 
// with the actual text of your user's manual.
usersManual.innerText = "This is a user's manual."
document.body.appendChild(usersManual);
