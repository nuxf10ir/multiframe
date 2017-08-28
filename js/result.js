var RESULTS = {
    low: {
        text: "Чтобы филиалы начали работать самостоятельно, и на их контроль уходило меньше времени, попробуйте следовать следующим рекомендациям:",
        samples: 5
    },
    middle: {
        text: "Вы централизовали управление и контролируете финансистов в филиалах. Чтобы  на взаимодействие с ними тратить еще меньше времени, попробуйте реализовать следующие правила:",
        samples: 3
    },
    high: {
        text: "Похоже, у вас получилось наладить бесперебойную и эффективную работу финансовой службы во всех подразделениях!",
        samples: 0,
        invite: "Будем рады, если поделитесь своим опытом с коллегами и <a href=\"mailto:prokofieva@fd.ru\">станете автором журнала</a>."
    }
};

var SAMPLES = {
    1: "распределите ответственность",
    2: "работайте в одной ERP-системе",
    3: "создайте единую методологию",
    4: "привлекайте консультантов централизовано",
    5: "определите точки контроля",
    6: "установите уровни подчиненности",
    7: "учтите в должностных инструкциях специфику работы подразделений",
    8: "оценивайте подчиненных одинаково",
    9: "разработайте систему мотивации",
    10: "поддерживайте обратную связь"
};

var SAMPLES_RATE = [3, 1, 2, 6, 7, 5, 9, 8, 4, 10];





function getResult () {
    var answers = window.localStorage.getItem(STORE_NAME) || STORE_DEFAULT_VALUE,
        answersArr = [],
        samplesArr = [],
        score = 0,
        grade,
        index = 0,
        resultHTML = "",
        resultNode = document.getElementById("result-node");

    for (var i = 0; i < answers.length; i++) {
        var answer = answers[i] === "1";

        answer && score++;

        answersArr.push(answer);
    }

    switch (true) {
        case score < 4:
            grade = "low";
            break;
        case score < 8:
            grade = "middle";
            break;
        default:
            grade = "high";
            break;
    }

    while (samplesArr.length < RESULTS[grade]["samples"] && index < SAMPLES_RATE.length) {
        var answerIndex = SAMPLES_RATE[index];


        if (!answersArr[answerIndex - 1]) {
            samplesArr.push(SAMPLES[answerIndex]);
        }

        index++;

    }

    resultHTML += "<p>" + RESULTS[grade]["text"] + "</p>";

    if (samplesArr.length) {

        var sapmlesCount = samplesArr.length;

        resultHTML += "<ul>";

        for (var i = 0; i < sapmlesCount; i++) {

            var lastSign = (i === sapmlesCount - 1) ? "." : ";";

            resultHTML += "<li>" + samplesArr[i] + lastSign + "</li>";
        }

        resultHTML += "</ul>";

    }

    if (RESULTS[grade]["invite"]) {
        resultHTML += "<p>" + RESULTS[grade]["invite"] + "</p>";
    }


    resultNode.innerHTML = resultHTML;

    window.localStorage.removeItem(STORE_NAME);

    this.parentElement.parentElement.className += " has_result";

    window.frameElement.height = resultNode.offsetHeight + 100;

}

var resultButton = document.querySelector('button.button_type_result');

resultButton.addEventListener("click", getResult);