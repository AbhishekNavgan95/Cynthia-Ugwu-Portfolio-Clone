// cursor tracker
cursortracker();
function cursortracker() {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector(".cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
    });
}

//cursor expand
expandCursor();
function expandCursor() {
    window.addEventListener("mousemove", e => {
        var targetElement = e.target;
        if (targetElement.tagName.toLowerCase() === 'a' || targetElement.tagName.toLowerCase() === '' || targetElement.tagName.toLowerCase() === 'span') {
            document.querySelector(".cursor").style.width = `64px`;
            document.querySelector(".cursor").style.height = `64px`;
            document.querySelector(".cursor").style.left = `-30px`;
            document.querySelector(".cursor").style.top = `-27px`;
            document.querySelector(".cursor").style.mixBlendMode = `difference`;
        }
        else if (targetElement.tagName.toLowerCase() === 'section') {
            document.querySelector(".cursor").style.width = `64px`;
            document.querySelector(".cursor").style.height = `64px`;
            document.querySelector(".cursor").style.left = `-30px`;
            document.querySelector(".cursor").style.top = `-27px`;
            document.querySelector(".cursor").style.mixBlendMode = `hard-light`;
            document.querySelector(".cursor").innerHTML = "View";

        }
        else {
            document.querySelector(".cursor").innerHTML = "";
            document.querySelector(".cursor").style.width = `12px`;
            document.querySelector(".cursor").style.height = `12px`;
            document.querySelector(".cursor").style.left = `-5px`;
            document.querySelector(".cursor").style.top = `-5px`;
        }
    });
}

// time
setInterval(setTime, 100);
function setTime() {
    var d = new Date();
    var formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: "2-digit" });
    let time = document.querySelectorAll(".time");
    time.forEach((e) => {
        e.innerHTML = formattedTime + " IST";
    });
}

// page 3 image hover effect
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX - 60,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

// gsap
let tl = gsap.timeline();
let tl2 = gsap.timeline();

tl.from(".from-btm-ele", {
    y: "100%",
    duration: .5,
    stagger: .5,
    opacity: 0,
    delay: 3.3
});

tl2.from(".from-top-ele", {
    y: "-100%",
    duration: .5,
    stagger: .5,
    opacity: 0,
    delay: 3.3
});

gsap.from(".from-top-1-ele", {
    y: "-100%",
    duration: .5,
    opacity: 0,
    delay: 3.3
});


gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

gsap.from(".about", {
    y: "20%",
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".about",
        scroller: ".main",
    }
});

gsap.from(".subscribe", {
    y: "20%",
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".subscribe",
        scroller: ".main",
    }
});

gsap.from(".creator", {
    y: "20%",
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".creator",
        scroller: ".main",
    }
});

gsap.from(".footer", {
    duration: .5,
    opacity: 0,
    delay: .5,
    scrollTrigger: {
        trigger: ".creator",
        scroller: ".main",
    }
});

gsap.to(".intro", {
    y: "-100%",
    delay: 2.3,
    duration: .2
});

function start() {
    gsap.from(".from-top-mobile-nav", {
        y: -100,
        duration: .5,
        opacity: 0,
        delay: .5
    });

    gsap.from(".mobile-nav-links", {
        y: -100,
        duration: .4,
        opacity: 0,
        stagger: .2
    });

    gsap.from(".from-btm-mobile-nav", {
        y: 100,
        duration: .5,
        opacity: 0,
        delay: .5
    });
}


let menuBtn = document.querySelector(".menu-btn");
let navLinks = document.querySelector(".nav-links");
let main = document.querySelector(".main");
let mobileNav = document.querySelector(".mobile-nav");

menuBtn.addEventListener("click", function () {
    if (window.innerWidth >= 769) {
        console.log("hello");
        if ((navLinks.classList.contains("display-none") && (!menuBtn.classList.contains("display-none")))) {
            navLinks.classList.remove("display-none");
            menuBtn.classList.add("display-none");
        }
        else {
            navLinks.classList.add("display-none");
            menuBtn.classList.remove("display-none");
        }
    }
    else {
        mobileNav.classList.remove("display-none");
        start();
        mobileNav.style.transform = "translateY(0%)";
    }
});

document.querySelector(".close-btn").addEventListener("click", () => {
    mobileNav.style.transform = "translateY(-100%)"
});

main.addEventListener("click", () => {
    if (menuBtn.classList.contains("display-none")) {
        menuBtn.classList.remove("display-none");
        navLinks.classList.add("display-none");
    }
});

// loader
time();
function time() {
    var a = 0
    setInterval(function () {
        a += Math.floor(Math.random() * 20)
        if (a < 100) {
            document.querySelector(".timer").innerHTML = a + "%"
        } else {
            a = 100
            document.querySelector(".timer").innerHTML = a + "%"
        }
    }, 200);
}