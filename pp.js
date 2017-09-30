// var data = require('./data')

module.exports = function(data, monthOffset=0) {

var validData = data.filter(function(t) { return ! isNaN(Date.parse(t.date)) })

var processedData = validData.map( function(e) {
	var p = {}
	p.event = e.event
	p.dateStr = e.date
	p.date = new Date(Date.parse(e.date))
    
    var t = e.location;
    if( !t.localeCompare('Location:') )
    	p.location = ''
    else {
    	t = t.split('Location: ')[1]
    	t = t.split(', Chennai')[0]
    	t = t.split(', Bengaluru')[0]
    	t = t.split('\'').join('')
    	p.location = t
	}

	p.category = [].concat(e.k1, e.k2, e.k3).join(' ').trim()
	p.link = e.link || e.ilink
    return p
})

var curMonth = new Date().getMonth() + monthOffset

var monthData = processedData.filter( function(t) { return curMonth === t.date.getMonth()})

function getFormatted(row) {
	var t = row.dateStr + ' - ' + row.event + ' - '
	if(row.category) t+= row.category + ' - '
	if(row.location) t+= row.location + ' - '
	t += row.link
	return t
}

monthData.reverse()
	
var message = ""
monthData.forEach( function(row) {
	message += getFormatted(row) + "\n"
})

return message
}