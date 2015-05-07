$('document').ready(function(){
		$('button').click(function(){
			try {
				handleInput($(this).val(), $('#display'));
			} catch(e) {
				$("#error").text(e.message);
			}
		});
});