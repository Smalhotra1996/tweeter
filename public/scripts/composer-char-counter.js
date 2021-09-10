$(document).ready(function () {
  // console.log("print ");
  // console.log($("#tweet-text"));
  // console.log($(".new-tweet textarea"));
  $(".new-tweet textarea").on("keyup", function (event) {
    //console.log(event.target.value.length);
    const MAXCHAR = 140;
    const targetLength = event.target.value.length;
    if ((MAXCHAR - targetLength) < 0) {
      $(".counter").addClass("color-negative")
    } else {
      $(".counter").removeClass("color-negative")
    }
    $(".counter").val(MAXCHAR - targetLength)
  })
  // --- our code goes here ---
});



