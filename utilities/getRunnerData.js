var cheerio = require('cheerio');
var curl = require('node-curl');
exports.runnerdata = function(id,fn){
  curl('http://www.athletic.net/TrackAndField/Athlete.aspx?AID='+id, function(err) {
      $ = cheerio.load(this.body);
        var $histevent = $('.histEvent')
        var length = $histevent.length
        var events = []
        for(var i=0;i<length;i++){
          !function(){
            var event = {}
            event.name = $($histevent[i]).find('strong').text()
            var times = []
            var seasons =$($histevent[i]).find('[style^="color: "]')
            for(var j=0;j<seasons.length;j++){
              times.push($(seasons[j]).text().trim())
            }
            event.times = times
            events.push(event)
          }()
        }
        fn(events)
    });
  }


