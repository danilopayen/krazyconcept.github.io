document.addEventListener("DOMContentLoaded", function () {

    /************************ Add Class On Scroll **************************
     **********************************************************************/

    $(function () {

        $('.scroll-down').click(function () {

            $('html, body').animate({
                scrollTop: $("div.block-content").offset().top - 80
            }, 1000)

        });

        /*** On Scroll ***/

        var header = $("header");
        var logo = $(".logo");
        var topNav = $(".top-nav");
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll > 0) {
                header.addClass("on-scroll");
                logo.addClass("on-scroll");
                topNav.addClass("on-scroll");
            } else {
                header.removeClass("on-scroll");
                logo.removeClass("on-scroll");
                topNav.removeClass("on-scroll");
            }
        });

        /*** On Click Add Close To Nav ***/

        var nav = document.querySelector(".navbar.top-nav .navbar-toggler");
        nav.addEventListener("click", function () {
            if (nav.classList.contains("close") !== true) {
                nav.classList.add("close");
            }

            else if (nav.classList.contains("close") !== false) {
                nav.classList.remove("close");
            }
        });

        if ($('#navbarResponsive') !== null) {

            $('.nav-link.js-scroll-trigger').click(function () {
                $('.navbar-toggler').removeClass('close');
            });

        }


    });

    /************************ Reveal Form *********************************
     **********************************************************************/

    var contactBtn = document.querySelector('.contact-btn');
    var formWrap = document.querySelector('.wrap-contact');

    contactBtn.addEventListener("click", function () {

        formWrap.style.display = "flex";

    });

    /****************************** Form Input Validation ***************************
     *******************************************************************************/

    $(function () {

        /*==================================================================
        [ Focus Contact2 ]*/

        $('.input').each(function () {
            $(this).on('blur', function () {
                if ($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })
        })

        /*==================================================================
        [ Validate after type ]*/

        $('.validate-input .input').each(function () {
            $(this).on('blur', function () {
                if (validate(this) == false) {
                    showValidate(this);
                }

                else {
                    $(this).parent().addClass('true-validate');
                }
            })
        })

        /*==================================================================
        [ Validate ]*/

        var input = $('.validate-input .input');

        $('.validate-form').on('submit', function () {
            var check = true;

            for (var i = 0; i < input.length; i++) {
                if (validate(input[i]) == false) {
                    showValidate(input[i]);
                    check = false;
                }
            }

            return check;
        });


        $('.validate-form .input').each(function () {
            $(this).focus(function () {
                hideValidate(this);
                $(this).parent().removeClass('true-validate');
            });
        });

        function validate(input) {
            if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
                if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                    return false;
                }
            }
            else {
                if ($(input).val().trim() == '') {
                    return false;
                }
            }

        }

        function showValidate(input) {
            var thisAlert = $(input).parent();

            $(thisAlert).addClass('alert-validate');

        }

        function hideValidate(input) {
            var thisAlert = $(input).parent();

            $(thisAlert).removeClass('alert-validate');

        }

    });

    /************************** Form Ajax Submit ***********************
     ******************************************************************/

    // get the form elements defined in your form HTML above

    var form = document.getElementById("form");
    var button = document.getElementById("submit");
    var status = document.getElementById("my-form-status");

    // Success and Error functions for after the form is submitted

    function success() {
        form.reset();
        button.style = "display: none ";
        status.innerHTML = "Thanks!";
    }

    function error() {
        status.innerHTML = "Oops! There was a problem.";
    }

    // handle the form submission event

    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });

    function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                success(xhr.response, xhr.responseType);
            } else {
                error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
    }

    /*********************************************************************/

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 56)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }

    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

});






