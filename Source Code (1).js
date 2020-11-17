// ==UserScript==
// @name         حساب معدل طلاب المعهد التقاني للحاسوب
// @encoding     utf-8
// @version      18.11.2020
// @description  حساب معدل طلاب المعهد التقاني للحاسوب
// @author       Mohammad Hammad
// @include      https://svuis.svuonline.org/SVUIS/std_profileS.php
// @grant        none
// ==/UserScript==

(function () {
  //region style
  var style =
    '<style>.tahasoft{background:blue none repeat scroll 0 0;border-radius: 5px;box-shadow: 1px 1px 3px #e7e7e7;margin: 3px;color:white;float:left;padding:8px;text-shadow:none;width:258px;overflow: hidden;}.tahasoft p{font-family:"segoe ui",arial,tahoma,serif;font-size:16px;line-height:24px;}.tahasoft img{float:right;padding-right:10px;}.ts1{background:#fc6a00 none repeat scroll 0 0;}.ts2{background:#028ccb none repeat scroll 0 0;}.ts3{background:#fba400 none repeat scroll 0 0;}.ts4{background:#00bb71 none repeat scroll 0 0;}.avgDiv{background:#fff;margin:auto;width:100%;padding:24px 0;text-align:center;font-size:17px;font-family:arial serif;text-shadow:1px 1px #FCF5CF;direction:rtl;display:inline-block}#lastUpdateAnchor{font-family:tahoma,serif;target=_blank;float:right;margin-right:13px;font-size:9px;margin-top:3px;color:#808080}.chart{display:table;table-layout:fixed;width:60%;max-width:700px;height:200px;margin:0 auto;background-image:linear-gradient(to top,rgba(0,0,0,.1) 2%,rgba(0,0,0,0) 2%);background-size:100% 50px;background-position:left top}.chart li{position:relative;display:table-cell;vertical-align:bottom;height:200px}.chart span{margin:0 1em;display:block;background:rgba(209,236,250,.75);animation:draw 1s ease-in-out}.chart span:before{position:absolute;left:0;right:0;top:100%;padding:5px 1em 0;display:block;text-align:center;content:attr(title);word-wrap:break-word}@keyframes draw{0%{height:0}}</style>';

  $("html > head").append(style);
  //endregion
  //endregion

  //region images variables
  var img1 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD8klEQVR4nO2aT0gUURzHZ7UorWMXOxQSkgQFhV4qSroEnTSEiroJkf2lW/8syISok4dORdC/gxBEUBQFuWVQeS4yE6KDCIEZFiFJ++nw3sDPtzO7szNvdkabL+zl/d78vn/2vZnZmXWcBQygHugD3gLTwHvgJrA6aW2xA2gGPuONaaAjaY2xAagF3hmmx4C/RggLcyUAe4TRj8BmPd4IPBC1m0lrjQVAvzDZZdQaxUp4n5TGWAE8FAGs8aiPudsgCX2xA+gVAfQYtc2i9jYpjbEC2CZMfgd6gDVAlz4nuOhLWmssAC5QHp+B+qS1WkdA8++A5qS1WgdwXpgsAN16O/SiToz9qEtkbdJarcPLfNKaqgZ9kpM4nLSmqiFV5oFFwAZgF7CqCnym+SNxc/oJyQHHgV+GoE/Alpg4z6XCvBZzx+dyA+q+u9MyX6rMdxpihlAPIb6KsW/ACkt8Zw2+ozb6RhH0XIg5KMZrgUdetQhc6TKvRU2Kb3mJUdspxF6PyJM+847jOMCUFjQOLDZqbUJw6IcPwBnD/LHoyi0BGBTC9hu1+6IW6s4s1eYdp0hgAXiCOkvLn52zQGPE3qHNA1uBdqA9zPGlGq9H7f0gGKSCn5/AaeP44xF05t0mYXt4NTXNfwFmDNHjqKevLvLAsgC9rZnX/ewG4GF+CFgO1KEeOe0D1gE1wCbUUxkXL2UIQM7ofcowf8KCXnsB+Jkvc4wZwmvgMjCsV80ocAu4atu85rcTQBjz4lgzhHKwYl5zRw8ginnRowV1RZD4APwxxi6FFurNGy0AG+Z1nw7RYwRo1eMNwF1RuxVKqD9vsACAJfpb2o16uVhjy7zuf0X0Md/YNIiVMBqmfwne0gFooyeB38ZSnAB+2DCveQZEryaP+gddm8G4OkRBkABuUx6RzGseeWfXZ9RaRW04Co8Hr38AzN2XAC9Qt7IjYmzW6xsLIaQFdbsM8BP13KAJ9cZG8l2MymXwlgzgsSA+JMZzzF2yZS9LqK20V3+2+8y55rPCXIwBdZEcF3OWDGBC1yZNYtSPCBf3AhAtFfOf+syp1yEUKMYbYG1op/660hOAmNuCOicMoK4OHUBNxe4CoFwAcgt0i/EwWyBwANVEuQDajWU4hHqXJv9gNAWsDEA0/wLQE27gjwJwICDRvA0gh3qTOs1cjAFtFRDNzwDExEXARtQJqei/NQGI5ncAFogqCoAA9w2WdKU2gKqsmCyALIAKAhB7ckcIogURgIt8CKIsgCyALIAsgCyALIAsgCyALIAsgCyALIAsANvzw6JkAMAzPSEvJ6Iehecr/LwSx0/GMD/sZ0rwyPFnDsX/7PqfMPPfB/APm1/u/Q4c0pkAAAAASUVORK5CYII=";
  var img2 =
    "data:image/png;base64,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";
  var img3 =
    "data:image/png;base64,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";
  var img4 =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEkUlEQVR4nO2bT4hNURzHzcvCZMpMYbzNNB5FkyRKmUxWNBaKzEIazUJNz8RCSRqkRFEsldSUlCwslIiyZGOjQSzYsEAW/kxhhY/F/d7mvDf3nPvevW/uO9d7vzrN/P7/ed1zzj3ndxcsiAFgDfAA+EF+4AdBzGvi8otLvgf42NxcUsFHoCdNAQ7K0HtgM9Cfk7FZMQMcTFOA4zLyKLGRJgHwSLEfT2NkE/BXhp4BD3Myninmv8CmtJU8Afwmf/AbOJEqeaMIq4BRoBwxQjhp4c/HmDT8RvFHgVUNSb6G4oTQn4nDwGd/6DQrn65g2gVoF6BdgHYBWroAnxTLlgx9bpHPT1n5dAXzRMGMZehzTD6fZOXTFcx1BXM+Q5/n5fN6Vj5dwZxWMLcz9HlbPk9n5dMVzH4F8zxDn8/lc39WPl3BbFQwv4DOCP5azRPDddgcls7aCF6nfAFsTBt/QwB4pYAOR/BGxDtXh71z0hmJ4B0W71XauBsGzL4VvgMWRvDXAUuAq8BOg34MOGbgOyWzBFgXYWehfACU5y+jOgFYDHxTYKMWmUHx7wovAN81CqLdlcygxcao+N+AxfOXUQIALim4l0CHQe8GTgGr9WwXgQlgB7BBY4doRcmslk63YadDtgEuNSdLBwArgT8KcK9BPyDaZeHLqp9hYw5ZJvyy8AOGzF7R/gArs8ytZgDOKsgZYL1oXQQTVx+wDygRLJ2DwJDGoGglyfRJp0s21ssmwNnmZukAPdf3FegHoM/gbRX9niE7oxHOAfcks9XQ65MtZLuQfWZ1gJ75twr4NbqYIFi/LwDb9IsWgXGNomjbJNMpnR7ZQDa73d49AYJlL7xKe4yxQQKWEpzYThu0adGWGrRO6SJbc5ZFrwHYDfxUAm+A7aJ3ADeAo4bsUdE6hG+XDrKxu1l5pAJgAHjBLNwCig75omRCeAEMZBlzwwFYBFwxkpoBjmiuMMcRZmd6pLOo2fE3DIA9wFfi4Suwp9nxNhxatgAt/QgQMwkC14BrBv7/TIJYlkGDXwA+axSqePleBnFshKrkVgArLLx8boSwbIUtsuPAuIOfr60wjpchi2zFy5BFLj8vQ0S8DsfIDwFDNcj5/zqM5UAkRqemAkjW7wMRLEdiDvmaHgFD3t8jMWo4FLXoOSfBCHk/D0WJORZ36FmXQYu8t8fi1osRh451IxSj59fFCDFXYzG6FVvhGnX8uhojxeWoJrbYCTNCz6vL0UTX40r+qUZdRcCz6/FEDRIpC+BVg0TiFpkUj8CYfHrRIpO4SSrJJCg9r5qkQuivUy/RMihdr9rkIgtAcBo0BZSEdzG3P6BiI8Rsf0B4J1iSjYEq27koQNjSPiG8oj/AYquiP4DgyhxgskrO3wLol58ElgO7gF4s/QGGDVt/QK9sLJfNAcl7XYAp4buEp+4PUBEApoR7WYBhgoaokn7NXiXfS/L+ANPGhPgj8pVdAajtk5kv+ntG9DvCbwq/KHxa+CGCE9+f+r8sHpItSxfZKsu26QtLTI37ZIZW/miKVv9sjvaHk+1PZ1v742kV4b/+fP4fRZGnMTjcBbAAAAAASUVORK5CYII=";
  //endregion

  //region variables
  var last_update = "18-11-2020";
  var TotalHoursWithoutSkippedEnglish = 0;
  var countOfPassedSubjects = 0;
  var numerator = 0;
  var denominator = 0;
  var EnglishHoursPassedArray = [];
  var EnglishHoursPassed = 0;
  var year = "";
  var NxtYear = "";
  var sumEquivalent = 0;
  var remainToNxt = 0;
  var remain = 0;
  var totlaHours = 0;
  var LastDivInRow;
  var markDiv;
  var SubjectCode;
  var mark;
  var CreditHours;
  var assignmentDiv;
  var classDiv;
  var examDiv;
  var assignmentMark;
  var examMark;
  var semester;
  var s;
  var html;
  var help;
  var evaluation;
  var subjectsArray = [];
  var average;
  var assignmentDiv1;
  var assignmentDiv2;
  var assignmentDiv3;
  var assignmentDiv4;
  var assignmentDiv5;
  var assignmentDiv6;
  var helpDiv;
  var bb = 0;
  var mm = 0;
  var semestersArray = [];
  var semestersAveragesDiv;
  //endregion

  // region loop table divs
  $("tr td.tdpadding_c a").each(function () {
    var SpecialStatusAnchorTitle = $(this).attr("title");

    if (
      SpecialStatusAnchorTitle === "Passed ()" ||
      SpecialStatusAnchorTitle === "Registered ()"
    ) {
      LastDivInRow = $(this).parent().siblings(":last");

      classDiv = $(this).parent().next().next().next();
      assignmentDiv1 = classDiv.next().next();
      assignmentDiv2 = assignmentDiv1.next();
      assignmentDiv3 = assignmentDiv2.next();
      assignmentDiv4 = assignmentDiv3.next();
      assignmentDiv5 = assignmentDiv4.next();
      assignmentDiv6 = assignmentDiv5.next();
      examDiv = assignmentDiv6.next();
      markDiv = examDiv.next();
      helpDiv = markDiv.next();

      SubjectCode = LastDivInRow.parent()
        .next()
        .children(".tdpadding_c:first-child")
        .next()
        .next()
        .next()
        .html();
      mark = parseInt(markDiv.html());
      examMark = parseFloat(examDiv.html());
      assignmentMark = 0;

      help = helpDiv.html() === "Helped";
      if (!isNaN(parseFloat(assignmentDiv1.html())))
        assignmentMark += parseFloat(assignmentDiv1.html());
      if (!isNaN(parseFloat(assignmentDiv2.html())))
        assignmentMark += parseFloat(assignmentDiv2.html());
      if (!isNaN(parseFloat(assignmentDiv3.html())))
        assignmentMark += parseFloat(assignmentDiv3.html());
      if (!isNaN(parseFloat(assignmentDiv4.html())))
        assignmentMark += parseFloat(assignmentDiv4.html());
      if (!isNaN(parseFloat(assignmentDiv5.html())))
        assignmentMark += parseFloat(assignmentDiv5.html());
      if (!isNaN(parseFloat(assignmentDiv6.html())))
        assignmentMark += parseFloat(assignmentDiv6.html());
      semester = classDiv.html();
      s = semester;
      semester = 20 + semester.substr(semester.length - 2);
      if (SubjectCode === "BAT") return;
      markDiv.css("background", "#BCFFF8");

      if (
        (mark >= 60 && mark <= 100 && SubjectCode !== "PT") ||
        help === true ||
        (mark >= 50 && mark <= 100 && SubjectCode == "L1") ||
        (mark >= 50 && mark <= 100 && SubjectCode == "L2") ||
        (mark >= 50 && mark <= 100 && SubjectCode == "L3")
      ) {
        // console.log(s + " : semester = " + semester + ", assignmentMark = " + Math.round(assignmentMark) + ", examMark = " + Math.round(examMark));
        if (
          parseInt(semester) >= 2016 &&
          help === false &&
          (Math.round(assignmentMark) < 10 || Math.round(examMark) < 28) &&
          !isNaN(assignmentMark) &&
          !isNaN(examMark)
        ) {
          // console.log('continue...');
          return true;
        }
        //
        countOfPassedSubjects++;
        markDiv.css({ background: "#54BF48", color: "#fff" });
        assignmentDiv1.css({ background: "#fff6f2" });
        assignmentDiv2.css({ background: "#fff6f2" });
        assignmentDiv3.css({ background: "#fff6f2" });
        assignmentDiv4.css({ background: "#fff6f2" });
        assignmentDiv5.css({ background: "#fff6f2" });
        assignmentDiv6.css({ background: "#fff6f2" });
        CreditHours = LastDivInRow.parent()
          .next()
          .children(".tdpadding_c:first-child")
          .next()
          .next()
          .next()
          .next()
          .next()
          .css("background", "#FFF87B")
          .html();
        CreditHours = parseInt(CreditHours) < 3 ? 3 : parseInt(CreditHours);
        numerator = numerator + mark * CreditHours;
        denominator = denominator + CreditHours;
        TotalHoursWithoutSkippedEnglish = 132 - denominator;
        // console.log('hours=' + denominator + ", subject=" + SubjectCode)
        subjectsArray.push({
          Semester: s.substr(s.length - 3),
          Subject: SubjectCode,
          Mark: mark,
          CreditHours: CreditHours,
        });
      }
      if (
        SpecialStatusAnchorTitle === "Registered ()" &&
        SubjectCode !== "PT"
      ) {
        LastDivInRow = $(this).parent().siblings(":last");
        var courseCode = LastDivInRow.parent()
          .next()
          .children(".tdpadding_c:first-child")
          .next()
          .next()
          .next()
          .html();
        CreditHours = parseInt(
          LastDivInRow.parent()
            .next()
            .children(".tdpadding_c:first-child")
            .next()
            .next()
            .next()
            .next()
            .next()
            .css("background", "#FFF87B")
            .html()
        );
      }
    }
    if (SpecialStatusAnchorTitle === "Equivalent ()") {
      LastDivInRow = $(this).parent().siblings(":last");
      courseCode = LastDivInRow.parent()
        .next()
        .children(".tdpadding_c:first-child")
        .next()
        .next()
        .next()
        .html();
      CreditHours = LastDivInRow.parent()
        .next()
        .children(".tdpadding_c:first-child")
        .next()
        .next()
        .next()
        .next()
        .next()
        .css("background", "#FFF87B")
        .html();
      CreditHours = parseInt(CreditHours) < 3 ? 3 : parseInt(CreditHours);
      sumEquivalent += CreditHours;
    }
  });
  //endregion

  // region calculate: average, Total hours, remain hours
  var myJSON = JSON.stringify(subjectsArray);
  // console.log(myJSON);

  $.each(subjectsArray, function (i, obj) {
    if (semestersArray.indexOf(obj.Semester) === -1 && obj.Semester.length > 1)
      semestersArray.push(obj.Semester);
    bb += obj.Mark * obj.CreditHours;
    mm += obj.CreditHours;
  });

  average = parseFloat((bb / mm).toFixed(2));
  if (EnglishHoursPassedArray.length > 0)
    EnglishHoursPassed = EnglishHoursPassedArray[0];
  if (average < 65) evaluation = "مقبول";
  if (average >= 65 && average < 75) evaluation = "جيد";
  if (average >= 75 && average < 85) evaluation = "جيد جداً";
  if (average >= 85 && average < 95) evaluation = "ممتاز";
  if (average >= 95 && average <= 100) evaluation = "مرتبة شرف";
  totlaHours = denominator + EnglishHoursPassed + sumEquivalent;
  // remain     = TotalHoursWithoutSkippedEnglish - EnglishHoursPassed;
  remain = 132 - totlaHours;
  // endregion

  // region all semesters averages

  var semestersAverages = [];
  var b, m;
  for (var i = 0; i < semestersArray.length; i++) {
    b = 0;
    m = 0;
    $.each(subjectsArray, function (j, obj) {
      if (obj.Semester === semestersArray[i]) {
        b += obj.Mark * obj.CreditHours;
        m += obj.CreditHours;
      }
    });
    semestersAverages.push({
      semester: semestersArray[i],
      average: (b / m).toFixed(2),
    });
  }
  console.log(semestersAverages);
  semestersAveragesDiv = '<ul class="chart">';
  for (i = 0; i < semestersAverages.length; i++) {
    var sAvg = parseFloat(semestersAverages[i].average);
    if (sAvg === 0) continue;
    semestersAveragesDiv +=
      '<li><span style="height:' +
      sAvg +
      '%" ' +
      'title="' +
      semestersAverages[i].semester +
      " " +
      sAvg +
      '"></span></li>';
  }
  semestersAveragesDiv += "</ul><br/>";
  //endregion

  // region calculate :current year, next year, remain credit hours to next year

  var allCreditHours = 132,
    creditHoursForSecond = 45;
  if (totlaHours < creditHoursForSecond) {
    year = "الأولى";
    remainToNxt = creditHoursForSecond - totlaHours;
    NxtYear = "الثانية";
  }
  if (totlaHours >= creditHoursForSecond && totlaHours < allCreditHours) {
    year = "الثانية";
    remainToNxt = allCreditHours - totlaHours;
    NxtYear = "التخرج";
  }
  if (totlaHours == allCreditHours) {
    year = "التخرج";
    remainToNxt = 0;
    NxtYear = "";
  }
  // endregion

  //region set html results
  html =
    '<div class="avgDiv"><div class="tahasoft ts1"><img src="' + img1 + '">';
  html += "<p>المعدل<br /> " + average + " (" + evaluation + ") </p>";
  html += '</div><div class="tahasoft ts2"><img src="' + img2 + '">';
  if (year == "الأولى") {
    var language = "";
    if (remainToNxt > 10) {
      language = "ساعة";
    } else {
      language = "ساعات";
    }
    html +=
      "<p>السنة الحالية: " +
      year +
      '<br /><span style="font-size:13px">باقي ' +
      remainToNxt +
      " " +
      language +
      " لتصبح سنة " +
      NxtYear +
      "<span></p>";
  }
  if (year === "الثانية") {
    language = "";
    if (remainToNxt > 10) {
      language = "ساعة";
    } else {
      language = "ساعات";
    }
    html +=
      "<p>السنة الحالية: " +
      year +
      '<br /><span style="font-size:13px">باقي ' +
      remain +
      " " +
      language +
      " للتخرج <span></p>";
  }
  if (year == "التخرج") {
    html +=
      "<p>مبارك التخرج<br /><span style='font-size:13px'> * * * * * <span></p>";
  }
  html += '</div><div class="tahasoft ts3"><img src="' + img3 + '">';
  html += "<p>الساعات المتبقية للتخرج <br />" + remain + " </p>";
  html += '</div><div class="tahasoft ts4"><img src="' + img4 + '">';
  html += "<p>عدد الساعات المجتازة <br /> " + totlaHours + " </p>";
  html += "</div></div>";
  console.log(html);
  $(".act_link").before(semestersAveragesDiv);
  $(".act_link").before(html);
  $(".ts4").after(
    "<a id='lastUpdateAnchor' target='_blank' href='https://www.facebook.com/groups/TIC.SVU/permalink/2387287554622010'>last update: " +
      last_update +
      "</a>"
  );
  // endregion
})();