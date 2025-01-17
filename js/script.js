//                  slider on JS


let positionMember = 0;
let slideToShow = 3;
const slideToScroll = 1;

let membersContainer = document.querySelector('.members');
let membersTrack = document.querySelector('.members_track');
let members = document.querySelectorAll('.member');
let member = document.querySelector('.member');
let memberMobile = document.querySelectorAll('.member_mobile');
let prevMember = document.querySelector('.prev_member');
let nextMember = document.querySelector('.next_member');
let headerItems = document.querySelectorAll('.item_header');
console.log(headerItems);

let memberCount = members.length;
let coefficientMarginMember = 0.016;
let marginLeftMember = membersContainer.clientWidth * coefficientMarginMember;
let specWidthMember = ((marginLeftMember * slideToShow) - marginLeftMember) / slideToShow;
let memberWidth = (membersContainer.clientWidth / slideToShow) - specWidthMember;
let movePositionMember = slideToScroll * memberWidth;


window.addEventListener("resize", function () {
    findMarginAndWidthSlide();
})

findMarginAndWidthSlide();


function findMarginAndWidthSlide() {
    let width = window.innerWidth;
    if (width >= 992 && width <= 1920) {
        slideToShow = 3;
        coefficientMarginMember = 0.016;
    } else if (width >= 767 && width <= 991) {
        slideToShow = 2;
        coefficientMarginMember = 0.016;
    } else if (width <= 767) {
        return
    }
    marginLeftMember = membersContainer.clientWidth * coefficientMarginMember; // placeWidth = containerPlaces.width() / slideToShowPlaces;
    specWidthMember = ((marginLeftMember * slideToShow) - marginLeftMember) / slideToShow;
    memberWidth = (membersContainer.clientWidth / slideToShow) - specWidthMember;
    movePositionMember = slideToScroll * memberWidth;
    setSliders();
}

function setSliders() {
    members.forEach((element, index) => {
        if (index == 0) {
            element.style.minWidth = `${memberWidth}px`;
            element.style.marginLeft = '0';
        } else {
            element.style.minWidth = `${memberWidth}px`;
            element.style.marginLeft = `${marginLeftMember}px`;
        }
    });
}

prevMember.addEventListener('click', () => {
    positionMember += movePositionMember;
    setPosition(positionMember, membersTrack);
    checkBtn();
    let currentActive = document.querySelector('.member+.active');
    currentActive.className = 'member';
    currentActive.previousElementSibling.className += ' active'
})
nextMember.addEventListener('click', () => {
    positionMember -= movePositionMember;
    setPosition(positionMember, membersTrack);
    checkBtn();
    let currentActive = document.querySelector('.member+.active');
    currentActive.className = 'member';
    // ISSUE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    currentActive.nextElementSibling.className += ' active'
})


const setPosition = (pos, list) => {
    list.style.transform = `translateX(${pos}px)`
}

let checkActive = function (list) {
    list.forEach(element => {
        element.addEventListener('click', () => {
            list.forEach(element => {
                element.classList.remove("active");
            })
            element.className += ' active';
        })
    });
}

let checkActiveMobile = function (list) {
    list.forEach(element => {
        element.addEventListener('click', () => {
            element.classList.toggle('active')
        })
    });
}

checkActive(members);
checkActiveMobile(memberMobile);
checkActive(headerItems);




let checkBtn = () => {
    prevMember.disabled = positionMember == 0;
    nextMember.disabled = positionMember <= -(memberCount - slideToShow) * memberWidth;
}
checkBtn();

//                  slider on JQUERY
$(document).ready(function () {

    $('.conserts').slick({
        arrows: false,
        dots: true,
        infinite: false,
        adaptiveHeight: true,

    });
    $('.videos').slick({
        adaptiveHeight: true,
        infinite: false,
        initialSlide: 1

    });
    $('.members_mobile').slick({
        slidesToShow: 1,
    }).on('beforeChange', function(event, slick,currentSlide,nextSlide){
      currentSlide.removeClass('active')
        console.log(nextSlide.className);
;
    })

    $(window).on('resize orientationchange', function () {
        $('.conserts').slick('resize');
    });



    //                  menu burger

    $('.menu_burger_header').click(function () {
        $('.menu_header, .menu_burger_header').toggleClass('active')
    })


    //                  spoilet list_songs


    $('.list_songs').click(function () {
        $(this).toggleClass('active').next().slideToggle(300);
    })
    //                  video player


    let btn = $('.playPause');

    let tooglePlayPause = function () {
        if ($('.slick-slide.slick-current .videoFile').get(0).paused) {
            btn.removeClass("play").addClass(" pause");
            $('.slick-slide.slick-current .videoFile').get(0).play();
            $(".video_button").css('background', 'none')
        } else {
            btn.removeClass("pause").addClass(" play");
            $('.slick-slide.slick-current .videoFile').get(0).pause();
            $(".video_button").css('backgroundColor', '#df001f');

        }
    }

    $('.videos').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $(".video_button").css('backgroundColor', '#df001f');
        btn.removeClass("pause").addClass(" play");
        $('.slick-slide.slick-current .videoFile').get(0).pause();
    });
    btn.click(function () {
        tooglePlayPause();
    });
















})