const osmosis = require('osmosis')
const pp = require('./pp')

// osmosis('http://indiarunning.com/chennai.html')

function marathon_scraper(location) {
	var x = []
	function makeArray(t) {
	  x.push(t)
	}
	osmosis(`http://indiarunning.com/${location}.html`)
	.find('.wcustomhtml tr')
	.set({
	  date: 'td[2]',
	  event: 'td[3]',
	  ilink: 'td[3] a@href',
	  k1: 'td[8]',
	  k2: 'td[9]',
	  k3: 'td[10]'
	})
	.follow('td[3] a@href')
	.set({
	  link: '//*[@class="wcustomhtml"]//table[1]/tbody/tr[12]/td/font/a',
	  reg: '//*[@class="wcustomhtml"]//table[1]/tbody/tr[14]/td/font/a',
	  location: '//*[@class="wcustomhtml"]//table[1]/tbody/tr[16]/td/font'
	})
	// .data(makeArray)
	.data(makeArray)
	.done(function() {
		console.log(`${location}: `)
		console.log(pp(x,1))	// 1 is month offset, so gets next month events
	})	
}

marathon_scraper('chennai')
marathon_scraper('bengaluru')

