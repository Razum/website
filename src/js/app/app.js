/**
 * Created by roman on 27.09.2015.
 */
import "../../sass/app.scss";
import Router from './router.js';

"use strict";

console.info(new Router());
var router = new Router({root: "/", mode: "history"})
/*
 if (__DEV__) {
 console.log("DEV");
 }
 */
document.addEventListener("DOMContentLoaded", function(event) {
    var wrapper = document.getElementById("wrapper");
    var folding_panel = document.getElementById("folding-panel");
    var fold_content = document.getElementById("fold-content");
    var overlay = document.getElementById("page-overlay");
    var page_content = document.getElementById("page-content");

    var current_page = "";

    wrapper.addEventListener("click", function (evt) {
        evt.preventDefault();
        var target = evt.target,
            href = "";

        while (target.tagName != "BODY") {
            if (target.tagName === "A" && target.classList.contains("page-item-link")) {

                var mq = window.matchMedia( "(min-width: 1024px)" );
                href = target.getAttribute('href');
                current_page = href.slice(0, -5);
                if (mq.matches) {
                    document.querySelector("body").classList.add("page-is-shown");
                    openItemInfo(href, "page-content");
                    page_content.classList.add(current_page);
                } else {
                    wrapper.classList.add('fold-is-open');
                    folding_panel.classList.add('is-open', current_page);
                    openItemInfo(href, "fold-content");
                }



                break;
            } else {
                target = target.parentNode;
            }
        }

    }, false);



    var close_btn = document.getElementById("cd-close");
    close_btn.addEventListener("click", function () {
        wrapper.classList.remove('fold-is-open');
        folding_panel.classList.remove('is-open', current_page);
    }, false);

    function openItemInfo(url, id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById(id).innerHTML = xhr.responseText;
            }

        }
    }

    overlay.addEventListener("click", function (evt) {
        var target = evt.target;
        if (target.tagName === "DIV" && target.classList.contains("page-content-overlay")) {
            document.querySelector("body").classList.remove("page-is-shown");
            page_content.classList.remove(current_page);
        }

    }, false);



    folding_panel.addEventListener("click", function (evt) {
        evt.preventDefault();
        var target = evt.target;
        while (target.tagName != "BODY") {
            if (target.tagName === "LI" && target.classList.contains("skill-category")) {
                [].forEach.call(document.querySelectorAll('.skill-category'), function (elm) {
                    elm.classList.remove("active")
                });
                target.classList.add("active");

                var category = target.dataset.category;
                document.getElementById("skill-list").setAttribute("class", "skill-list " + category);

                break;
            } else {
                target = target.parentNode;
            }
        }
    }, false);
    page_content.addEventListener("click", function (evt) {
        evt.preventDefault();
        var target = evt.target;
        while (target.tagName != "BODY") {
            if (target.tagName === "LI" && target.classList.contains("skill-category")) {
                [].forEach.call(document.querySelectorAll('.skill-category'), function (elm) {
                    elm.classList.remove("active")
                });
                target.classList.add("active");

                var category = target.dataset.category;
                document.getElementById("skill-list").setAttribute("class", "skill-list " + category);

                break;
            } else {
                target = target.parentNode;
            }
        }
    }, false);

});
