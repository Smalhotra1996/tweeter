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
    $("#emptyerror").hide();
    $('#charcount').hide();


    //console.log("hello there");
    const tweetText = $("#tweet-text").val();
    console.log("tewwt-textlength", tweetText.length);
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

        //data: $("#tweet-text").serialize()
        data: $("form").serialize()
      }).then(function (response) {
        loadTweets()
        $('#tweet-text').val("");
        $('.counter').text(140);
        //console.log("response ", response);
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
        //console.log(data);
        renderTweets(data)

        // console.log("hello000");
      }
    })
  }
  const createTweetElement = function (tweetObj) {
    const tweet = $(`<article class="tweet">
        
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
  
</article> `);

    return tweet;
  }
  // const $tweet = createTweetElement(tweetObj);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); //
  const renderTweets = function (tweets) {
    for (let tweetObj of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweetObj));
    }
  }
  //renderTweets(tweetObj);
  loadTweets()

});


    // .then(function (morePostsHtml) {
    //   console.log('Success: ', morePostsHtml);
    //   $button.replaceWith(morePostsHtml);
    // });
