var jsdom = require("jsdom");
var test = require('tape');
var unwrap = require('../');

test('unwrap-node', function (t) {
  jsdom.env('<div><b>hello worl</b>d</div>', function (err, window) {
    global.window = window;
    global.Node = window.Node;
    global.document = window.document;
    var div = document.querySelector('div');
    var b = div.firstChild;
    unwrap(b);
    t.equal(b.parentNode, null);
    t.equal(div.innerHTML, 'hello world');
    window.close();
    t.end();
  });
});

test('unwrap-node few elements', function (t) {
  jsdom.env('<div><b>hello worl<span>this is span</span></b>d</div>', function (err, window) {
    global.window = window;
    global.Node = window.Node;
    global.document = window.document;
    var div = document.querySelector('div');
    var b = div.firstChild;
    unwrap(b);
    t.equal(b.parentNode, null);
    t.equal(div.innerHTML, 'hello worl<span>this is span</span>d');
    var span = div.querySelector('span');
    unwrap(span);
    t.equal(div.innerHTML, 'hello worlthis is spand');
    window.close();
    t.end();
  });
});

test('should remove a 0-width space child node', function (t) {
  jsdom.env('<div>te<b>\u200B</b>st</div>', function (err, window) {
    global.window = window;
    global.Node = window.Node;
    global.document = window.document;
    var div = document.querySelector('div');
    var b = div.children[0];
    unwrap(b);
    t.equal(b.parentNode, null);
    t.equal(div.innerHTML, 'test');
    window.close();
    t.end();
  });
});
