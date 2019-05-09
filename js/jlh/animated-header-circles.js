/*
	Scripts for Animated Header Circles
	Jonathan Harrison
	2019
*/

var $containerElement;

// ready
$(document).ready(function() {

	/* Elements */
    // setup SVG element and background/container
    var animationContainer = $("#animationContainer");
    var header = $("#animatedHeader");
    centerElement(header);
    TweenMax.set(header, { yPercent: -60 });

    var foreground = $("#headerForeground");
    centerElement(foreground);

    var background = $("#headerBackground");
    centerElement(background);
    $containerElement = document.getElementById("headerBackground");
    
    // make circle elements
    makeCircles($containerElement, 33);
    var elements = $(".animated-header-circle");

    /* Animate */
    // animate circles
    for (var i = 0; i < elements.length; i++) {
        animateElement(elements[i]);
    }

    // show animation container
    TweenMax.to(animationContainer, 0.01, { autoAlpha: 1 });

    // show circles
    var opacities = [0.55, 0.61, 0.71, 0.81, 0.91];
    TweenMax.staggerTo(elements, 2, { cycle: { opacity: opacities } }, 0.05);

});
// end ready


// move element to a random position relative to it's $containerElement
function animateElement(element) {
    var extraWidth = $containerElement.clientWidth * 0.05;
    var extraHeight = $containerElement.clientHeight * 0.05;
    var width = $containerElement.clientWidth + extraWidth;
    var height = $containerElement.clientHeight + extraHeight;

    // current position
    var position = $(element).position();

    // pick new position
    var xPos = randomInt(-extraWidth, width);
    var yPos = randomInt(-extraHeight, height);

    // distance from position to destination
    var a = xPos - position.left;
    var b = yPos - position.top;
    var distance = Math.round(Math.sqrt(a*a + b*b) * 100) / 100;

    // duration based on distance
    var duration = distance / 20;

    // minimum duration
    if (duration < 0.8) {
        duration = 0.8;
    }

    // short, random delay
    var delay = randomFloat(0.05, 0.2);

    // animate
    TweenMax.to(element, duration, { x: xPos, y: yPos, ease: Power1.easeInOut, delay: delay, onComplete: animateElement, onCompleteParams: [element] });
}

// make elements and attach them to a parent container
function makeCircles(container, amount) {
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var widthMin = containerWidth * 0.13;
    var widthMax = containerWidth * 0.21;

    var c = document.createDocumentFragment();
    for (var i = 0; i < amount; i++) {
        var e = document.createElement("div");
        var size = randomInt(widthMin, widthMax) + "px";
        centerElement(e);
        var xPos = randomFloat(0, 100) + "%";
        var yPos = randomFloat(0, 100) + "%";
        var colorClass = "animated-header-circle-color-3";
        var color = randomInt(1,3);
        if ( color == 1) {
            colorClass = "animated-header-circle-color-1";
        }
        else if (color == 2) {
            colorClass = "animated-header-circle-color-2";
        }
        e.className = "animated-header-circle " + colorClass;
        e.style.width = size;
        e.style.height = size;
        e.style.left = 0;
        e.style.top = 0;
        e.style.opacity = 0;
        // starting position from 0,0
        var startX = randomInt(0, containerWidth);
        var startY = randomInt(0, containerHeight);
        TweenLite.set(e, { x: startX, y: startY });
        c.appendChild(e);
    }

    container.appendChild(c);
}

/*
    Utilities
*/
// place an element at the center of its parent
function centerElement(element, xAxisOnly) {
    if (xAxisOnly) {
        TweenLite.set(element, { left:'50%', xPercent:'-50' });
    }
    else {
        TweenLite.set(element, { left:'50%',top:'50%', xPercent:'-50',yPercent:'-50'});
    }
}
// return a random float between 2 given floats
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
// return a random integer between 2 given ints
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
