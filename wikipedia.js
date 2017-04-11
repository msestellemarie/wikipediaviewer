function searchResults(){
  $("form").on("submit", function(e){
    e.preventDefault();
    var search = $("input:text").val();
    if(search !== ""){
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&exchars=140&exlimit=max&exintro=1&explaintext=1&gsrsearch=" + search + "&gsrnamespace=0&gsrlimit=5&gsrqiprofile=wsum_inclinks_pv&callback=?", function(result){
        if(result.query === undefined){
          alert("There are no results!");
          $(".col-xl-6").hide();
          $("input:text").val("");
        }
        else{
          var count = 1;
          for(var each in result.query.pages){
            $(".title"+count).html("<a target='_blank' href='https://en.wikipedia.org/wiki/" + result.query.pages[each].title + "'>" + result.query.pages[each].title + "</a>");
            $(".content"+count).html(result.query.pages[each].extract);
            $(".c"+count).show();
            count += 1;
          }
          $(".random-pg").hide();
        }
      });
    }
  });
}

function randomArticle(){
  $(".random").click(function(){
    //switch to one request using extracts, if possible
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5&callback=?", function(random){
      $(".title-random").html("<a target='_blank' href='https://en.wikipedia.org/wiki/" + random.query.random[0].title + "'>" + random.query.random[0].title + "</a>");
      $.getJSON("https://en.wikipedia.org//w/api.php?action=query&format=json&prop=extracts&titles=" + random.query.random[0].title + "&exchars=140&exlimit=max&exintro=1&explaintext=1&callback=?", function(result){
        $(".content-random").html(result.query.pages[Object.keys(result.query.pages)[0]].extract);
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
