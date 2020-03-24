"use strict";

/*****************

Chesses
Pippin Barr

******************/

let MOBILE = false;

let chess;
let $p5Canvas;

$(document).ready(chessesSetup);

function chessesSetup() {

  let title = "CHESSES2";
  $('#title').text(`${title}`)

  let author = 'BY <a href="https://www.pippinbarr.com/" target="_blank">&nbsp;PIPPIN BARR</a>';
  $('#author').html(`${author}`)


  let menu = [{
      title: "SAMSARA",
      // info: "Pieces go through the great chain of existence as they are moved."
    },
    {
      title: "REVERSAL",
      // info: "Pieces change sides with every move."
    },
    {
      title: "FOG",
      // info: "Each piece can see the square adjacent to it, as well as any squares it attacks. The view each player has is the combination of the views of all pieces. Take turns to play your moves and look away when your opponent is playing."
    },
    {
      title: "XR",
      info: "Use this virtual board to play cross-reality chess! Orient your device screen up and place appropriately sized chess pieces in the standard opening position!"
    },
    {
      title: "LEWITT",
      info: `An homage to <a href="https://en.wikipedia.org/wiki/Sol_LeWitt">Sol LeWitt</a>'s <a href="https://en.wikipedia.org/wiki/Sol_LeWitt#Wall_drawings">wall drawings</a>.`
    },
    {
      title: "MUSICAL",
      // info: "A melody is played using the current game position as its score."
    },
    {
      title: "3D",
      // info: "Chess has finally entered the third dimension!"
    },
    {
      title: "CHECK-RS",
      info: "Checkers-style capturing only. Knights, being non-linear, cannot capture anything. Win by capturing the opponent's king."
    },
  ];
  menu.sort((a, b) => a.title < b.title ? -1 : 1);

  for (let i = 0; i < menu.length; i++) {
    let $menuItem = $('<div>')
      .addClass('menu-item active')
      .attr('id', menu[i].title)
      .html(`${menu[i].title}`)
      .data('game', menu[i].title)
      .data('info', menu[i].info)
      .on('click', menuClicked)
      .on('touchstart', menuClicked)
      .appendTo('#menu');
    let $infoSymbol = $('<span class="info">ⓘ</span>');
    $menuItem.append($infoSymbol);
  }


  let $infoPanel = $('<div>')
    .addClass('info-panel')
    .appendTo('#game')

  let $infoText = $('<div>')
    .addClass('info-text')
    .html("DRAUGHTS<p>What is this?</p>")
    .appendTo($infoPanel);

  $('.info').on('click', function(e) {
    e.stopPropagation();
    if (!$('.info-panel').is(':visible')) {
      $('.info-text').html(`<p>${$(this).parent().data('info')}</p>`);
      $('.info-panel').slideDown();
    }
    else {
      $('.info-panel').slideUp();
    }
  });
}

function titleClicked() {
  $('.instruction').slideUp();
  $('#message').slideUp();
  $('.info-panel').slideUp();
  $('#fog-message').slideUp();

  $('#title').removeClass('active');
  $('.info').stop().css('opacity', 0);

  if (chess instanceof Musical) {
    clearInterval(chess.playInterval);
    // chess.whiteSynth.stop();
    // chess.blackSynth.stop();
  }

  $('#game').slideUp(() => {
    $('.menu-item').slideDown();
    $('#author').slideDown();
    $('.menu-item')
      .addClass('active')
      .on('click', menuClicked);
  });
}

function menuClicked(e) {

  if (e.type === 'touchstart') MOBILE = true;
  else MOBILE = false;

  switch ($(this).data('game')) {
    case 'REVERSAL':
      chess = new Reversal();
      break;

    case 'SAMSARA':
      chess = new Samsara();
      break;

    case 'FOG':
      chess = new Fog();
      break;

    case 'XR':
      chess = new XR();
      break;

    case 'LEWITT':
      chess = new LeWitt();
      break;

    case 'MUSICAL':
      chess = new Musical();
      break;

    case 'LIFE':
      chess = new Life();
      break;

    case '3D':
      chess = new ThreeDee();
      break;

    case '1D':
      chess = new OneDee();
      break;

    case 'CHECK-RS':
      chess = new Draughts();
      break;
  }

  $('#title').addClass('active');
  $('#title.active').on('click', titleClicked);

  $('.menu-item').removeClass('active');

  $('.menu-item').off('click');

  $('#author').slideUp();
  $('.menu-item').not(`#${$(this).data('game')}`).slideUp(500, () => {
    // $('#menu').hide();
    $('#game').slideDown(() => {
      // console.log("slid")
      $(this).find('.instruction').slideDown();
      if ($(this).data('info')) {
        $(`#${$(this).data('game')} .info`).stop().animate({
          opacity: 1
        }, 1000);
      }
    });
  });
  $('#message').slideUp();



}