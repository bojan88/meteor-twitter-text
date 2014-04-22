String.prototype.getTwitterText = function(entities) {
	if(!entities)
		return this;

	var start = Date.now();
	var new_text = new String();
	var ind_moved = 0;
	var indices_map = [];


	var old_text = escapeHTML(this);

	function escapeHTML(s) {
		return s.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	

	old_text = new String(old_text);

	entities.urls.forEach(function(entry) {
		indices_map[entry.indices[0]] = [entry.indices[1], "<a href='" + encodeURI(entry.url) + "' target='_blank'>" + entry.display_url + "</a>"];
	});

	entities.hashtags.forEach(function(entry) {
		indices_map[entry.indices[0]] = [entry.indices[1], "<a href='http://twitter.com/search?q=" + encodeURIComponent("#" + entry.text) + "' target='_blank'>" + "#" + entry.text + "</a> "];
	});

	entities.user_mentions.forEach(function(entry) {
		indices_map[entry.indices[0]] = [entry.indices[1], "<a title='" + entry.name + "' href='http://twitter.com/" + encodeURI(entry.screen_name) + "' target='_blank'>" + "@" + entry.screen_name + "</a>"];
	});

	if (entities.media) {
		entities.media.forEach(function(entry) {
			indices_map[entry.indices[0]] = [entry.indices[1], "<a title='" + entry.name + "' href='" + entry.expanded_url + "' target='_blank'>" + entry.display_url + "</a>"]
		});
	}

	for (i = 0; i < old_text.length; i++) {
		if (old_text[i].charCodeAt(0) >= 0xD800 && old_text[i].charCodeAt(0) <= 0xDBFF) {
			for (j = old_text.length + 1; j >= i; j--) {
				if (indices_map[j - 1]) {
					indices_map[j] = indices_map[j - 1];
					indices_map[j - 1] = undefined;
					indices_map[j][0] += 1;
				}
			}
		}
		if (!indices_map[i]) {
			new_text += old_text[i];
		} else {
			for (j = 0; j < indices_map[i][1].length; j++) {
				new_text += indices_map[i][1][j];
			}
			i = indices_map[i][0] - 1;
		}
	}

	return new_text;
}
