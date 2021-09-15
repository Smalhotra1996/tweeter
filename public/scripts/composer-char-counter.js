$(document).ready(function () {
  $(".new-tweet textarea").on("keyup", function (event) {
    const MAXCHAR = 140;
    const targetLength = event.target.value.length;
    if ((MAXCHAR - targetLength) < 0) {
      $(".counter").addClass("color-negative")
    } else {
      $(".counter").removeClass("color-negative")
    }
    $(".counter").val(MAXCHAR - targetLength)
  })
});



