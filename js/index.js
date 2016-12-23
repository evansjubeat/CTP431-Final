var myElement = document.getElementById('myElement');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
var mc2 = new Hammer(myElement);
var pinch = new Hammer.Pinch();
var rotate = new Hammer.Rotate();
pinch.recognizeWith(rotate);
mc2.add([pinch, rotate]);

mc.add( new Hammer.Tap() );
// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.add( new Hammer.Tap({ event: 'quadrupletap', taps: 2 }) );
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panleft panright panup pandown tap press", function(ev) {
    myElement.textContent = ev.type +" gesture detected.";
});
mc2.on("pinch rotate", function(ev) {
    myElement.textContent += ev.type +" ";
});