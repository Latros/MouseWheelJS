(function() {
  'use strict';
  window.MouseWheelJS = {};
  window.MouseWheelJS.invalidEventErrorMsg = "MouseWheelJS Error: Trying to listen to an invalid scroll event. Allowed events are: [\"scroll\",\"scrollUp\",\"scrollDown\"].";
  window.MouseWheelJS.prevDocumentScrollPos = window.scrollY;
  window.MouseWheelJS.validEvents = ['scroll', 'scrollUp', 'scrollDown'];
  function on (eventName, callback) {
    var validEvent = this.validEvents.indexOf(eventName) > -1;
    if (!validEvent) throw window.MouseWheelJS.invalidEventErrorMsg;
    document.addEventListener('scroll', scrollDispatcher.bind(window.MouseWheelJS, eventName, callback));
  }
  function scrollDispatcher (eventName, callback, scrollEvent) {
    var scrollDirection = this.prevDocumentScrollPos <= window.scrollY ? 'down' : 'up';
    this.prevDocumentScrollPos = window.scrollY;
    if (eventName === 'scrollUp' && scrollDirection === 'up') return callback(scrollEvent, scrollDirection);
    else if (eventName === 'scrollDown' && scrollDirection === 'down') return callback (scrollEvent, scrollDirection);
    else if (eventName === 'scroll') return callback (scrollEvent, scrollDirection);
    else return;
  }
  window.MouseWheelJS.on = on;
})();
