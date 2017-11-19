var SCROLL_STEP = 108;

// loading screen
setTimeout(function() {
    var loadingText = document.querySelector('.loading-content > span');
    loadingText.innerHTML = 'Patience!';
}, 300);

setTimeout(function() {
    var loadingText = document.querySelector('.loading-content > span');
    loadingText.innerHTML = 'Patience, young padawan...';
}, 1000);

setTimeout(function () {
    var slider = document.querySelector('.slider-nav');
    var loadingContent = document.querySelector('.loading-content');
    loadingContent.style = 'opacity: 0';
    slider.style = 'opacity: 1;'
}, 2000);

setTimeout(function () {
    var loadingContent = document.querySelector('.loading-content');
    loadingContent.style = 'display: none';
}, 3000);


// slider
function sliderScroll(direction) {
    var slider = document.querySelector('.slider-img');

    var offset;
    if (direction === 'left') {
        offset = SCROLL_STEP;
    } else {
        offset = -SCROLL_STEP;
    }

    var currentPosition = parseInt(slider.style.left, 10) + offset;

    // Move slider
    slider.style.left = currentPosition + '%';

    var slide = getSlideFromPosition(currentPosition);

    highlightCell(currentPosition);
    hideArrow(currentPosition);
    showHeader(slide);
    updateStepText(slide);
}

function goToSlide(slide) {
    var slider = document.querySelector('.slider-img');
    var currentPosition = getPositionFromSlide(slide);
    slider.style.left = currentPosition + '%';

    highlightCell(currentPosition);
    hideArrow(currentPosition);
    showHeader(slide);
    updateStepText(slide);
}


function getPositionFromSlide(slide) {
    return -(SCROLL_STEP * slide);
}

function getSlideFromPosition(position) {
    return -(position / SCROLL_STEP);
}

function hideArrow(currentPosition) {
    var arrowRight = document.querySelector('.arrow-right');
    var arrowLeft = document.querySelector('.arrow-left');

    if (-currentPosition < SCROLL_STEP) {
        arrowRight.style = 'opacity: 1; visibility: visible';
        arrowLeft.style = 'opacity: 0; visibility: hidden';

    } else if (-currentPosition >= SCROLL_STEP * 9) {
        arrowRight.style = 'opacity: 0; visibility: hidden';
        arrowLeft.style = 'opacity: 1; visibility: visible';
    } else {
        arrowRight.style = 'opacity: 1; visibility: visible';
        arrowLeft.style = 'opacity: 1; visibility: visible';
    }
}

function resetAllHighlights() {
    var counterUl = document.querySelector('.counter ul');
    counterUl.childNodes.forEach(function (child) {
        if (child.children) {
            child.children[0].className = '';
        }
    })
}

function highlightCell(position) {
    var counterUl = document.querySelector('.counter ul');
    var counterChildren = counterUl.children;
    var currentSlide = getSlideFromPosition(position);
    var cellToHighlight = counterChildren[currentSlide].children[0];
    resetAllHighlights();
    cellToHighlight.className = 'highlighted';
}

function resetAllHeaders() {
    for (var i = 0; i < 10; ++i) {
        var classArray = document.getElementById(i).className.split(' ');
        var indexOfShow = classArray.indexOf('show');

        if (indexOfShow > -1) {
            classArray.splice(indexOfShow, 1);
        }

        document.getElementById(i).className = classArray.join(' ');
    }
}

function showHeader(slide) {
    resetAllHeaders();
    document.getElementById(slide).className += ' show';
}


function updateStepText(slide) {
    var stepText = document.getElementById('stepText');
    var stepCounter = document.querySelector('.step-text span');
    var introText = document.getElementById('introText');
    var conclusiveText = document.getElementById('conclusiveText');
    if (slide === 0) {
        stepText.style = '';
        introText.style = 'display:block';
    } else if (slide === 9) {
        stepText.style = '';
        introText.style = 'display:none';
        conclusiveText.style = 'display:block';
    } else {
        stepCounter.innerHTML = slide;
        stepText.style = 'opacity: 1';
        introText.style = 'display:none';
        conclusiveText.style = 'display:none';
    }
}
