/* NOTE: If you use JS_2 the code will NOT load montage.json
   it will instead use the javascript object in this file 
*/

let vid = document.querySelector("video");
let caption = document.querySelector("#caption");

let data = [
    {
        "start": "00:01:11",
        "end": "00:01:13",
        "description": "Battle Ship On Sail"
    },
    {
        "start": "01:04:19",
        "end": "1:04:28",
        "description": "Battle Ship On Sail"
    },
    {
        "start": "00:04:14",
        "end": "00:04:33",
        "description": "A New Day Is Starting"
    },
    {
        "start": "00:08:40",
        "end": "00:08:59",
        "description": "Working Hard"
    },
    {
        "start": "00:10:05",
        "end": "00:10:21",
        "description": "Enjoy The Meal"
    },
    {
        "start": "00:14:19",
        "end": "00:14:53",
        "description": "Call To Assembly"
    },
    {
        "start": "00:14:57",
        "end": "00:15:25",
        "description": "Here Comes The Captain"
    },
    {
        "start": "00:15:41",
        "end": "00:15:57",
        "description": "The Captain's Speech"
    },
    {
        "start": "00:16:10",
        "end": "00:16:12",
        "description": "The Captain's Speech"
    },
    {
        "start": "00:16:19",
        "end": "00:16:25",
        "description": "The Captain's Speech"
    },
    {
        "start": "00:56:31",
        "end": "00:56:32",
        "description": "The Captain's Speech"
    },
    {
        "start": "00:16:37",
        "end": "00:16:43",
        "description": "The Captain's Speech"
    },
    {
        "start": "01:08:39",
        "end": "01:08:41",
        "description": "Meeting Another Ship"
    },
    {
        "start": "01:09:28",
        "end": "01:09:45",
        "description": "Meeting Another Ship"
    },
    {
        "start": "01:10:22",
        "end": "01:10:33",
        "description": "Meeting Another Ship"
    },
    {
        "start": "00:43:56",
        "end": "00:44:40",
        "description": "Welcome Our Hero"
    },
    {
        "start": "00:45:04",
        "end": "00:46:33",
        "description": "Welcome Our Hero"
    },
    {
        "start": "00:46:38",
        "end": "00:46:46",
        "description": "Gift Of Love"
    },
    {
        "start": "00:46:56",
        "end": "00:47:13",
        "description": "Gift Of Love"
    },
    {
        "start": "00:56:17",
        "end": "00:56:23",
        "description": ""
    }
];


//begins when video is capable of being played, only fires once
vid.addEventListener("canplay", function () {
    process(data);
}, { once: true });

async function process(data) {
    for (let item of data) {
        if (parseTime(item.start) > parseTime(item.end)) {
            throw ("negative duration!");
        }
        caption.textContent = item.description;
        vid.currentTime = parseTime(item.start);

        await passed(parseTime(item.end));
    }
    vid.pause();
    caption.textContent = "fin";
}

async function passed(time) {
    //Promises are a bit advanced, but they're very useful when working with asynchronous media
    return new Promise(function (resolve) {
        vid.addEventListener("timeupdate", function () {
            if (vid.currentTime > time) {
                resolve();
            }
        });
    });
}

function parseTime(time) {
    if (typeof time === "number") {
        return time;
    } else if (typeof time === "string") {
        var a = time.split(':'); // split it at the colons
        if (a.length === 2) {
            a = ("00:" + time).split(":");
        }
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        return (seconds);
    }
    throw ("invalid or unknown time");
}
