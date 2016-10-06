const _logStyle = 'background: #222; color: #bada55';

function log(message) {
	console.log('%c ' + message, _logStyle);
}

log('Please scroll through the playlist so that each album is visible once.\n' + 
      'Then double-click the page to export a spreadsheet.');

var albums = ['Artist,Title,Album'];

var fileName = 'export-google-play.csv';

var playlistTitleNode = document.querySelector('.info > .title > .title-text');
if (playlistTitleNode) {
	fileName = playlistTitleNode.innerText;
}

var addVisibleAlbums = function(){
	[].forEach.call(document.querySelectorAll('.song-row'), function(e){ 
		var albumNodes = [e.querySelector('td[data-col=\'artist\']'),
				e.querySelector('td[data-col=\'title\'] .column-content'),
				e.querySelector('td[data-col=\'album\']')];

		var albumString = albumNodes.map(function(s){ 
			return s.innerText.trim().replace(/,/g,''); 
		}).join(',');
 
		if(albums.indexOf(albumString) === -1){
			albums.push(albumString); console.log('Added: ' + albumString)
		}
	});
}

var createCsv = function(){
    var csv = 'data:text/csv;charset=utf-8,';
    albums.forEach(function(row){ csv += row + '\n'; }); 

    var uri = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute('href', uri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click(); 

    log('Download beginning!');
}

document.body.addEventListener('DOMNodeInserted', addVisibleAlbums, false);
document.body.addEventListener('dblclick', createCsv, false);
