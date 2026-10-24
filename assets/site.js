// Product filters and search
(function () {
  var grid = document.querySelector('.js-grid');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.children);
    var search = document.querySelector('.search');
    var chips = document.querySelectorAll('.chip');
    var count = document.querySelector('.js-count');
    var empty = document.querySelector('.empty');
    var filter = '';
    function apply() {
      var q = (search.value || '').trim().toLowerCase();
      var n = 0;
      cards.forEach(function (c) {
        var ok = (!filter || (' ' + c.dataset.cats + ' ').indexOf(' ' + filter + ' ') > -1) &&
                 (!q || c.dataset.name.indexOf(q) > -1);
        c.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (count) count.textContent = n;
      empty.hidden = n > 0;
    }
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        filter = b.dataset.f;
        apply();
      });
    });
    search.addEventListener('input', apply);
  }

  // Forms: open the visitor's email app with the details filled in (no server needed)
  document.querySelectorAll('form.js-mail').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      Array.prototype.forEach.call(f.elements, function (el) {
        if (el.name && el.value) lines.push(el.name + ': ' + el.value);
      });
      window.location.href = 'mailto:' + f.dataset.to + '?subject=' + encodeURIComponent(f.dataset.subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));
    });
  });

  // Close mobile menu after choosing a link
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { var t = document.getElementById('nav-t'); if (t) t.checked = false; });
  });
})();
