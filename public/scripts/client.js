/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $(".arrowdown").on("click", () => {

    $("#tweet-text").get(0).scrollIntoView(false)
  })
  $("#emptyerror").hide();
  $('#charcount').hide();
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $("#submittweet").submit(function (event) {
    event.preventDefault();
    // Reset error messages 
    $("#emptyerror").hide();
    $('#charcount').hide();
    // Get the tweet content
    const tweetText = $("#tweet-text").val();
    if (tweetText.length === 0) {
      $("#emptyerror").slideDown("slow")
    }
    else if (tweetText.length > 140) {
      $("#charcount").slideDown("slow")
    }
    else {
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $("form").serialize()
      }).then(function (response) {
        loadTweets()
        $('#tweet-text').val("");
        $('.counter').text(140);
      })
        .catch(function (error) {
          console.error(error);
        })
    }
  }
  );
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      success: function (data) {

        renderTweets(data)
      }
    })
  }
  const createTweetElement = function (tweetObj) {
    const tweet = $(`
      <article class="tweet">
        <header>
            <p><i class="fas fa-child"></i>${tweetObj.user.name}</p>
            <p class="username">${tweetObj.user.handle}</p>
        </header>
          <b>${escape(tweetObj.content.text)}</b>
          <footer>
            <p>${timeago.format(tweetObj.created_at)}</p>
            <div>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
        </footer>
      </article>
    `);
    return tweet;
  }

  const renderTweets = function (tweets) {
    for (let tweetObj of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweetObj));
    }
  }
  loadTweets()
});


