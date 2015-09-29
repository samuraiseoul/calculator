//prevent backspace from navigating
$(document).keydown(function(e) { if (e.keyCode == 8) e.preventDefault(); });

Mousetrap.bind('1', function() { handleInput(1, $('#display')); });
Mousetrap.bind('2', function() { handleInput(2, $('#display')); });
Mousetrap.bind('3', function() { handleInput(3, $('#display')); });
Mousetrap.bind('4', function() { handleInput(4, $('#display')); });
Mousetrap.bind('5', function() { handleInput(5, $('#display')); });
Mousetrap.bind('6', function() { handleInput(6, $('#display')); });
Mousetrap.bind('7', function() { handleInput(7, $('#display')); });
Mousetrap.bind('8', function() { handleInput(8, $('#display')); });
Mousetrap.bind('9', function() { handleInput(9, $('#display')); });
Mousetrap.bind('0', function() { handleInput(0, $('#display')); });
Mousetrap.bind('+', function() { handleInput('+', $('#display')); });
Mousetrap.bind('-', function() { handleInput('-', $('#display')); });
Mousetrap.bind('*', function() { handleInput('*', $('#display')); });
Mousetrap.bind('/', function() { handleInput('/', $('#display')); });
Mousetrap.bind('(', function() { handleInput('(', $('#display')); });
Mousetrap.bind(')', function() { handleInput(')', $('#display')); });
Mousetrap.bind('^', function() { handleInput('^', $('#display')); });
Mousetrap.bind('.', function() { handleInput('.', $('#display')); });
Mousetrap.bind(['=', 'enter'], function() { handleInput('=', $('#display')); });
Mousetrap.bind(['command+z', 'ctrl+z', 'meta+z', 'backspace'], function() { handleInput('undo', $('#display')); });
Mousetrap.bind(['command+shift+z', 'ctrl+shift+z', 'meta+shift+z'], function() { handleInput('redo', $('#display')); });