/**
 * Created by roman on 27.09.2015.
 */
"use strict";
import "../../sass/app.scss";
import Router from './router.js';
import '../libs/simple-scrollbar.js';
import _template from '../libs/tpl-engine.js';
import projects from './projects.js';
let project_tpl = require("../../templates/project.tpl.html");


//router.navigate('/about');

/*
 if (__DEV__) {
 console.log("DEV");
 }
 */
document.addEventListener("DOMContentLoaded", function(event) {
    var wrapper = document.getElementById("wrapper");
    var folding_panel = document.getElementById("folding-panel");
    var body = document.querySelector("body");
    var page_wrapper = document.getElementById("page-content-wrapper");
    var current_page = "";
    var router = new Router({mode: "hash"});

    router
        .add(/(.*)/, function(page) {
            var mq = window.matchMedia( "(min-width: 1024px)" );

            if (page && ['about', 'skills', 'experience', 'projects'].some((name)=>page === name)) {
                current_page = page;
                if (mq.matches) {
                    body.classList.add("page-is-shown");
                    openItemInfo(page, "page-content");
                    page_wrapper.classList.add(current_page);
                } else {
                    wrapper.classList.add('fold-is-open');
                    folding_panel.classList.add('is-open', current_page);
                    openItemInfo(page, "fold-content");
                }
            }
        })
        .check()
        .listen();




    body.addEventListener("click", function (evt) {
        var target = evt.target;
        if (target.tagName === "A" && target.classList.contains("page-close") ) {
            wrapper.classList.remove('fold-is-open');
            folding_panel.classList.remove('is-open', current_page);

            page_wrapper.classList.remove(current_page);
            body.classList.remove("page-is-shown");
            router.navigate("");
        }

        if (target.tagName === "DIV" && target.classList.contains("page-content-overlay")) {
            body.classList.remove("page-is-shown");
            page_wrapper.classList.remove(current_page);
            router.navigate("");
        }

        if (target.tagName === "A" && target.classList.contains("show-project-details")) {
            evt.preventDefault();
            let project = target.dataset.project;
            document.getElementById("project-details-body").innerHTML = _template(project_tpl, projects[project]);
            document.getElementById("project-details-page").classList.add("opened");
        }

        if (target.tagName === "A" && target.classList.contains("back-arrow")) {
            document.getElementById("project-details-page").classList.remove("opened");
        }


        while (target.tagName != "BODY") {
            if (target.tagName === "LI" && target.classList.contains("skill-category")) {
                evt.preventDefault();
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




    function openItemInfo(pageName, id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', pageName + ".html", true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                document.getElementById(id).innerHTML = xhr.responseText;
                SimpleScrollbar.initEl(document.getElementById("page-article"));
            }

        }
    }


});
