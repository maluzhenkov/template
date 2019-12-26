const datepicker = {
  init: function() {
    const $rangeDatepicker = $("#date-range");
    const $rangeDatespicker = $("#dates-range");

    $rangeDatepicker.datepicker({
      minDate: 0,
      range: "period", // режим - выбор периода
      onSelect: function(dateText, inst, extensionRange) {
        // extensionRange - объект расширения
        $("#startDate").val(extensionRange.startDateText);
        $("#endDate").val(extensionRange.endDateText);
      }
    });
    $rangeDatespicker.datepicker({
      minDate: 0,
      range: "period", // режим - выбор периода
      onSelect: function(dateText, inst, extensionRange) {
        // extensionRange - объект расширения
        $("#startAndEndDates").val(
          extensionRange.startDateText + " - " + extensionRange.endDateText
        );
      }
    });

    $rangeDatespicker.datepicker("option", "dateFormat", "d M");
    $rangeDatespicker.datepicker("setDate", ["+1d", "+3d"]);

    // объект расширения (хранит состояние календаря)
    let extensionRange = $rangeDatespicker
      .datepicker("widget")
      .data("datepickerExtensionRange");
    if (extensionRange.startDateText && extensionRange.endDateText)
      $("#startAndEndDates").val(
        extensionRange.startDateText + " - " + extensionRange.endDateText
      );
  }
};

datepicker.init();
