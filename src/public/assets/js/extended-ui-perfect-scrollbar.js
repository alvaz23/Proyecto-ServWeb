/**
 * Perfect Scrollbar
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const playlists = document.getElementById('playlists_section');
    const songs = document.getElementById('songs_section'); 
    const newplaylist = document.getElementById('newplaylist_section'); 

    const verticalExample = document.getElementById('vertical-example'),
    horizontalExample = document.getElementById('horizontal-example'),
    horizVertExample = document.getElementById('both-scrollbars-example');

    // Vertical Example
    // --------------------------------------------------------------------
    if (playlists) {
      new PerfectScrollbar(playlists, {
        wheelPropagation: false
      });
    }
  
    if (songs) {
      new PerfectScrollbar(songs, {
        wheelPropagation: false
      });
    }

    if (newplaylist) {
      new PerfectScrollbar(newplaylist, {
        wheelPropagation: false
      });
    }

    // Vertical Example
    // --------------------------------------------------------------------
    if (verticalExample) {
      new PerfectScrollbar(verticalExample, {
        wheelPropagation: false
      });
    }

    // Horizontal Example
    // --------------------------------------------------------------------
    if (horizontalExample) {
      new PerfectScrollbar(horizontalExample, {
        wheelPropagation: false,
        suppressScrollY: true
      });
    }

    // Both vertical and Horizontal Example
    // --------------------------------------------------------------------
    if (horizVertExample) {
      new PerfectScrollbar(horizVertExample, {
        wheelPropagation: false
      });
    }
  })();
});
