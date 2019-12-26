$(document).ready(function() {
  AOS.init({
    offset: -600
  });

  $("a[href^='#']").click(function() {
    const href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(href).offset().top + "px" });
    return false;
  });

  $("#promo-slider").slick({
    arrows: false,
    fade: true,
    dots: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000
  });

  $('button[type="submit"]').click(function(e) {
    /*Валидация полей формы*/
    $("#form-access").validate({
      //Правила валидации
      rules: {
        email: {
          required: true,
          email: true
        }
      },
      //Сообщения об ошибках
      messages: {
        email: {
          required: "Обязательно укажите E-mail",
          email: "Введите корректный E-mail"
        }
      },
      /*Отправка формы в случае успеха валидации*/
      submitHandler: function() {
        sendAjaxForm("#form-access", "#", "#modal"); //Вызываем функцию отправки формы
        return false;
      }
    });
  });

  function sendAjaxForm(form, url, modal) {
    $(form)
      .find('button[type="submit"]')
      .attr("disabled", "disabled");
    setTimeout(function() {
      $(form)
        .find('button[type="submit"]')
        .removeAttr("disabled");
    }, 5000);
    $(modal).toggleClass("open");
    return false;
    $.ajax({
      url: url, //url страницы (ajax-form.php)
      type: "POST", //метод отправки
      dataType: "html", //формат данных
      data: $(form).serialize(), // Сеарилизуем объекты формы
      success: function(response) {
        //Данные отправлены успешно

        //Ваш код если успешно отправлено
        alert("Успешно отправлено!");
      },
      error: function(response) {
        // Данные не отправлены

        //Ваш код если ошибка
        alert("Ошибка отправления");
      }
    });
  }

  $(".modal")
    .find(".close")
    .on("click", function() {
      $(this)
        .closest(".modal")
        .toggleClass("open");
    });
});
