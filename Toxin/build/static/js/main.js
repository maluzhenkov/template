"use strict";

$(document).ready(function () {
  svg4everybody({}); //slider

  $(".slider").slick({
    arrows: false,
    fade: true,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 6000
  }); //datepicker

  var datepicker = {
    init: function init() {
      var $rangeDatepicker = $("#date-range"); // const $rangeDatespicker = $("#dates-range");

      $rangeDatepicker.datepicker({
        minDate: 0,
        range: "period",
        // режим - выбор периода
        onSelect: function onSelect(dateText, inst, extensionRange) {
          // extensionRange - объект расширения
          $("#startDate").val(extensionRange.startDateText);
          $("#endDate").val(extensionRange.endDateText);
        }
      });
      $("#startDate,#endDate").on("click", function () {
        $rangeDatepicker.toggle();
      });
      $rangeDatepicker.datepicker("option", "prevText", "");
      $rangeDatepicker.datepicker("option", "nextText", ""); // $rangeDatespicker.datepicker({
      //   minDate: 0,
      //   range: "period", // режим - выбор периода
      //   onSelect: function(dateText, inst, extensionRange) {
      //     // extensionRange - объект расширения
      //     $("#startAndEndDates").val(
      //       extensionRange.startDateText + " - " + extensionRange.endDateText
      //     );
      //   }
      // });
      // $rangeDatespicker.datepicker("option", "dateFormat", "d M");
      // $rangeDatespicker.datepicker("setDate", ["+1d", "+3d"]);
      // // объект расширения (хранит состояние календаря)
      // let extensionRange = $rangeDatespicker
      //   .datepicker("widget")
      //   .data("datepickerExtensionRange");
      // if (extensionRange.startDateText && extensionRange.endDateText)
      //   $("#startAndEndDates").val(
      //     extensionRange.startDateText + " - " + extensionRange.endDateText
      //   );
    }
  };
  datepicker.init();
}); // Полифилы
// forEach IE 11

if ("NodeList" in window && !NodeList.prototype.forEach) {
  console.info("polyfill for IE11");

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    "use strict";

    return [].slice.call(object);
  };
}