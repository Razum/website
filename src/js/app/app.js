/**
 * Created by roman on 27.09.2015.
 */
import "../../sass/app.scss";
import Router from './router.js';

"use strict";
console.info(new Router());
/*
 if (__DEV__) {
 console.log("DEV");
 }
 */
document.addEventListener("DOMContentLoaded", function(event) {
    var wrapper = document.getElementById("wrapper");
    var folding_panel = document.getElementById("folding-panel");
    var fold_content = document.getElementById("fold-content");
    var flipper = document.getElementById("flipper");

    var current_page = "";

    wrapper.addEventListener("click", function (evt) {
        evt.preventDefault();
        var target = evt.target,
            href = "";

        while (target.tagName != "BODY") {
            if (target.tagName === "A" && target.classList.contains("page-item-link")) {
                wrapper.classList.add('fold-is-open');
                href = target.getAttribute('href');
                current_page = href.slice(0, -5);
                folding_panel.classList.add('is-open', current_page);
                openItemInfo(href);
                //flipper.classList.add("active");


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

    function openItemInfo(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                fold_content.innerHTML = xhr.responseText;
            }

        }
    }



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
    }, false)

});
