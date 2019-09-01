(function($){
	
	// ----------------------------------------------
	// VARIABLES
	// ----------------------------------------------

	var avatarColors = ['fff','ddd','bbb','999','777','555'];
	var cardData = [];
	var imgColors = ['fff','ddd','bbb','999','777','555','2B5F87','3B8FC9','B5DFFD','7C6FBB','A494FA'];
	var nameFirst = ['Dynamic','Happy','Helpful','Super','Sonic','Alpine','Honest','Energetic','Honorary','Agile','Clever','Indie'];
	var nameLast = ['Monkey','Banana','Pixel','Elephant','Monster','Cabbie','Artist','Maker','Boxer','Titan','Flower','Donkey'];
	
	// ----------------------------------------------
	// READY
	// ----------------------------------------------

	$(function() {
		initCardDetails();
		initCard();
		initEvents();
		initFocus();
	});

	// ----------------------------------------------
	// FUNCTIONS
	// ----------------------------------------------

	function initCard() {
		var cards = '';
		for ( var i = 0; i < 15; i++ ) {
			var cardDetails = {
				"avatarColor" : cardData[i].avatarColor,
				"id" : i,
				"imgColor" : cardData[i].imgColor,
				"likes" : cardData[i].likes,
				"username" : cardData[i].username,
				"views" : cardData[i].views
			}
			cards += tmpl('tmpl_card', cardDetails);
		}
		$('ul.cards').html(cards);
	}
	function initCardDetails() {
		for ( var i = 0; i < 15; i++ ) {
			cardData.push({
				"avatarColor" : "#" + utilArrayRandom(avatarColors),
				"id" : i,
				"imgColor" : "#" + utilArrayRandom(imgColors),
				"likes" : utilRandomNumberBetween(100, 400),
				"username" : utilArrayRandom(nameFirst) + utilArrayRandom(nameLast),
				"views" : utilRandomNumberBetween(400, 2400)
			});
		}
	}
	function initEvents() {
		// Resize cards
		var large = $('.arrange .large');
		var main = $('section.main');
		var small = $('.arrange .small');
		large.on('click', function() {
			main.addClass('big');
			$(this).addClass('active');
			small.removeClass('active');
		});
		small.on('click', function() {
			main.removeClass('big');
			large.removeClass('active');
			$(this).addClass('active');
		});
		// Modal events
		$('.card-img').on('click', function() {
			$('.modal-backdrop').addClass('show');
			$('body').css('position', 'fixed');
			updateCardDetails($(this).closest('.card').prop('id'));
			return false;
		});
		$('.modal-backdrop, .modal-close').on('click', function() {
			$('.modal-backdrop').removeClass('show');
			$('body').css('position', 'relative');
			return false;
		});
		$('.modal-content').on('click', function(e) {
			e.stopPropagation();
		});
	}
	function initFocus() {
		$('.search input').focus();
	}
	function updateCardDetails(cardId) {
		var cardCount = cardData.length;
		$('.modal-backdrop').data('cardId', cardId).html(tmpl('tmpl_modal_details', {
			"avatarColor" : cardData[cardId].avatarColor,
			"id" : cardId,
			"imgColor" : cardData[cardId].imgColor,
			"likes" : cardData[cardId].likes,
			"random1" : cardData[utilRandomNumberBetween(0,cardCount)],
			"random2" : cardData[utilRandomNumberBetween(0,cardCount)],
			"random3" : cardData[utilRandomNumberBetween(0,cardCount)],
			"random4" : cardData[utilRandomNumberBetween(0,cardCount)],
			"username" : cardData[cardId].username,
			"views" : cardData[cardId].views
		}));

		// Modal Events
		$('.card-details-more a').off('click').on('click', function() {
			var thisId = $(this).data('id');
			updateCardDetails(thisId);
			return false;
		});
		$('.card-nav-left').on('click', function() {
			var currentId = $(this).closest('.modal-backdrop').data('cardId');
			var totalCards = cardData.length - 1;
			var nextId = totalCards;

			if (0 !== currentId) {
				nextId = parseInt(currentId) - 1;
			}

			updateCardDetails(nextId);
			return false;
		});
		$('.card-nav-right').on('click', function() {
			var currentId = $(this).closest('.modal-backdrop').data('cardId');
			var totalCards = cardData.length - 1;
			var nextId = 0;

			if (totalCards !== currentId) {
				nextId = parseInt(currentId) + 1;
			}

			updateCardDetails(nextId);
			return false;
		});
	}

	// ----------------------------------------------
	// UTILITY FUNCTIONS
	// ----------------------------------------------

	function utilArrayRandom (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function utilRandomNumberBetween (low, high) {
		return Math.floor(Math.random() * high) + low; 
	}

})(jQuery);