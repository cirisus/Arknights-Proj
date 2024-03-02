document.addEventListener('DOMContentLoaded', function() {
    const phaseLength = 500;
    const phaseNum = 6;
    const autoInterval = 3000;
    const transformSpeed = 500;
    const viewportRatio = 5 / 1.5;

    var carousel = document.querySelector('.u_SliderClip');
    var track = document.querySelector('.u_ItemsTrack');
    var items = document.querySelectorAll('.u_Item');
    var index = 0;
    var intervalId;
    var isHovered = false;

    //Viewport size
    const u_ItemsTrack = document.querySelector('.u_ItemsTrack');
    u_ItemsTrack.style.width = `${phaseLength * phaseNum}px`;//Track final width

    const u_Viewport = document.querySelectorAll('.u_SliderClip, .u_SliderMain');
        u_Viewport.forEach(element => {
            element.style.width = `${phaseLength}px`; //Viewport width
        });
    const viewportWidth = document.querySelector('.u_SliderClip').offsetWidth;
    const viewportHeight = viewportWidth / viewportRatio;//Viewport height

    const dynamicHeightElements = document.querySelectorAll('.u_SliderContainer, .u_SliderClip, .u_SliderMain, .u_ItemsTrack, .u_Item, .u_RelocationIsolator');

    dynamicHeightElements.forEach(element => {
        element.style.height = `${viewportHeight}px`;
    });
    //indicator generation
    const liElements = [];
    for (let i = 1; i <= phaseNum; i++) {
        const li = document.createElement('li');
            li.classList.add("present");
        const button = document.createElement('button');
            button.id = `button-${i}`;
            button.className = `u_indicator-${i}`;
            button.setAttribute('aria-controls', `item-${i}`);
            button.setAttribute('role', 'tab');
            button.setAttribute('data-item', 'select');
            button.textContent = i;
        li.appendChild(button);
    liElements.push(li);
    }
    const ul = document.querySelector('ul[role="tablist"]');
        liElements.forEach((li, i) => {
        li.addEventListener('click', () => {
            stopAutoSlide();
            index = i;
            updateTrackPosition();
            startAutoSlide();
        });
        ul.appendChild(li);
    });
    //Track transition
    var slideTransition = 'transform ' + transformSpeed + 'ms cubic-bezier(.6,0,.4,1)';
    track.style.transition = slideTransition;

    const indicators = document.querySelectorAll('ul[role="tablist"] li');
    function updateIndicator() {
        indicators.forEach((li, i) => {
            if (i === (index - 1 + indicators.length) % indicators.length) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }
    function updateTrackPosition() {
        var transformValue = -index * phaseLength;
        track.style.transform = 'translate3d(' + transformValue + 'px,0,0)';
        index = (index + 1) % items.length;
        updateBackgroundImage();
        requestAnimationFrame(updateIndicator);
    }
    function updateBackgroundImage() {
        var currentIndex = index === 0 ? items.length - 1 : index - 1;
        var img = items[currentIndex].querySelector('span').style.backgroundImage;
        document.documentElement.style.setProperty('--img', img);
    }
    function startAutoSlide() {
        intervalId = setInterval(updateTrackPosition, autoInterval);//autoslide interval
    }
    function stopAutoSlide() {
        clearInterval(intervalId);
        intervalId = null;
        isHovered = true;
    }
    function resumeAutoSlide() {
        isHovered = false;
        if (!intervalId) {
            startAutoSlide();
        }
    }
    //Slider throttle
    var isAnimating = false;

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', resumeAutoSlide);

    startAutoSlide();

    window.prevSlide = function() {
        if (isAnimating) return;
        isAnimating = true;
        stopAutoSlide();
        index = (index - 2 + items.length) % items.length;
        updateTrackPosition();
        setTimeout(() => isAnimating = false, transformSpeed);
    };
    window.nextSlide = function() {
        if (isAnimating) return;
        isAnimating = true;
        stopAutoSlide();
        updateTrackPosition();
        setTimeout(() => isAnimating = false, transformSpeed);
    };
});