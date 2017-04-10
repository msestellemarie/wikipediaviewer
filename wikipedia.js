function searchResults(){
  $("form").on("submit", function(e){
    e.preventDefault();
    var search = $("input:text").val();
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + search + "&srqiprofile=wsum_inclinks_pv&callback=?", function(result){
      for(var i=0; i<5; i++){
        if(result.query.search[i].title === undefined){
          $(".title"+(i+1)).empty();
          $(".content"+(i+1)).empty();
        }
        else{
          $(".title"+(i+1)).html("<a target='_blank' href='https://en.wikipedia.org/wiki/" + result.query.search[i].title + "'>" + result.query.search[i].title + "</a>");
          $(".content"+(i+1)).html(result.query.search[i].snippet + "...");
          $(".c"+(i+1)).show();
        }
      }
      $(".random-pg").hide();
    });
  });
}

function randomArticle(){
  $(".random").click(function(){
    $.getJSON("https://en.wikipedia.org//w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5&callback=?", function(random){
      $(".title-random").html("<a target='_blank' href='https://en.wikipedia.org/wiki/" + random.query.random[0].title + "'>" + random.query.random[0].title + "</a>");
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + random.query.random[0].title + "&srqiprofile=wsum_inclinks_pv&callback=?", function(result){
        $(".content-random").html(result.query.search[0].snippet + "...");
        $(".random-pg").show();
        $(".c1").hide();
        $(".c2").hide();
        $(".c3").hide();
        $(".c4").hide();
        $(".c5").hide();
        $("input:text").val("");
      });
    });
  });
}

$(document).ready(function(){
  $(".col-xl-6").hide();
  searchResults();
  randomArticle();
});
