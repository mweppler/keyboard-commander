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
    if (key == 16 || key == 17 || key == 18) return;
    var i = 0;
    while (i < objs.length) {
      if (objs[i].code[objs[i].step] >= 3000) {
        modifier = 'altKey';
        code = objs[i].code[objs[i].step] - 3000;
      } else if (objs[i].code[objs[i].step] >= 2000) {
        modifier = 'ctrlKey';
        code = objs[i].code[objs[i].step] - 2000;
      } else if (objs[i].code[objs[i].step] >= 1000) {
        modifier = 'shiftKey';
        code = objs[i].code[objs[i].step] - 1000;
      } else if (objs[i].code[objs[i].step] < 1000) {
        modifier = null;
        code = objs[i].code[objs[i].step];
      }
      if (key == code && modifier == null || e[modifier] == true) {
        objs[i].step++;
        if (objs[i].step >= objs[i].code.length) {
          complete(objs[i].fn);
          objs[i].step = 0;
        }
      } else {
        objs[i].step = 0;
      }
      i++;
    }
  }

  !!d[evtLstr] ? d[evtLstr](kyUp, onKey, 0) : d.attachEvent('on' + kyUp, onKey);

  // make'r global
  w.keyboardCommand = function (obj) {
    objs.push(obj);
  }
})(this, document);
