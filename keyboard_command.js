(function(w, d) {
  var objs = [],
      key,
      evtLstr = 'addEventListener',
      kyUp = 'keyup';

  function complete(fn) {
    fn();
  }

  function onKey(e) {
    key = e.which || e.keyCode;
    for (var i = 0; i < objs.length; i++) {
      if (key == objs[i].code[objs[i].step]) {
        objs[i].step++;
        if (objs[i].step >= objs[i].code.length) {
          complete(objs[i].fn);
          objs[i].step = 0;
        }
      } else {
        objs[i].step = 0;
      }
    }
  }

  !!d[evtLstr] ? d[evtLstr](kyUp, onKey, 0) : d.attachEvent('on' + kyUp, onKey);

  // make'r global
  w.keyboardCommand = function (obj) {
    objs.push(obj);
  }
})(this, document);
