var SR = new webkitSpeechRecognition();
var r = document.getElementById('result1');

function startConverting () {
	if ('webkitSpeechRecognition' in window) {
		SR.lang = 'ru-RU';
		SR.interimResults = true;
		SR.continuous = true;
		SR.start();
		var final_res = '';
		SR.onresult = function(data) {
			var interim = '';
			for (var i = data.resultIndex; i < data.results.length; ++i) {
				var transcript = data.results[i][0].transcript;
				transcript.replace("\n", "<br>");
				if (data.results[i].isFinal) {
					final_res += transcript;
				} else {
					interim += transcript;
				}
			}
			r.value = final_res + interim;
		};
		SR.onerror = function (data) {};
	} else {
		r.innerHTML = 'Произошла ошибка';
	}
}

function stopConverting() {
	SR.stop();
}