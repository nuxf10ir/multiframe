function setAnswerCookie () {
    var answers = getCookie(COOKIE_NAME) || COOKIE_DEFAULT_VALUE,
        data = this.dataset.answer;



    answers[ANSWER_NUM - 1] = data;

    setCookie(COOKIE_NAME, answers.substring(0, ANSWER_NUM -1 ) + data + answers.substr(ANSWER_NUM) );


    this.parentElement.parentElement.className += " has_answer";

}

var buttons = document.querySelectorAll('button.button');


for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", setAnswerCookie);
}