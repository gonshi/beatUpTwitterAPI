$(function(){
	// making Exclamation Img
	var exclamation = $('<img>').addClass('exclamation').attr({'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/img/exclamation.png'});
	exclamation.appendTo('a.profile-picture.media-thumbnail.js-tooltip');
	//----------------------
	var audio_stamp = $('<audio>').attr({'id': 'stamp', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/stamp.mp3', 'preload': 'auto', 'volume': '0.2'});	
	var key_pressed = false;
	audio_stamp.appendTo('body');
	audio_stamp = document.getElementById('stamp');

	$('body').keypress( function(){
		if( ! key_pressed ){
			key_pressed = true;
			main();
		}
	});

	function main(){
		audio_stamp.play();
		// default------------------------------------
		$('body').css({'cursor': 'none'});
		var first = true;
		var stop = false;
		var attack_count = 0;  //一旦使わず
		var current_damage = 0; 

		// audio -----------------------------
		var audio_final = $('<audio>').attr({'id': 'final', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/final.mp3', 'preload': 'auto'});	
		var audio_jab = $('<audio>').attr({'id': 'jab', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/jab.mp3', 'preload': 'auto'});	
		var audio_second = $('<audio>').attr({'id': 'second', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/second.mp3', 'preload': 'auto'});	
		var audio_swing = $('<audio>').attr({'id': 'swing', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/swing.mp3', 'preload': 'auto'});	
		var audio_striking = $('<audio>').attr({'id': 'striking', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/striking.mp3', 'preload': 'auto'});	
		var audio_gameover = $('<audio>').attr({'id': 'gameover', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/gameover.mp3', 'preload': 'auto'});	
		var audio_third = $('<audio>').attr({'id': 'third', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/third.mp3', 'preload': 'auto'});	
		// btm
		//var audio_bgm = $('<audio>').attr({'id': 'bgm', 'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/audio/bgm.mp3', 'preload': 'auto', 'autoplay': 'true', 'loop': 'true', 'volume': 0.001});	
		audio_final.appendTo('body');
		audio_jab.appendTo('body');
		audio_second.appendTo('body');
		audio_swing.appendTo('body');
		audio_striking.appendTo('body');
		audio_gameover.appendTo('body');
		audio_third.appendTo('body');
		//audio_bgm.appendTo('body');
		
		audio_final = document.getElementById('final');
		audio_swing = document.getElementById('swing');
		audio_jab = document.getElementById('jab');
		audio_second = document.getElementById('second');
		audio_third = document.getElementById('third');
		audio_striking = document.getElementById('striking');
		audio_gameover= document.getElementById('gameover');
		//audio_bgm = document.getElementById('bgm');
		// -------------------------------------
		// making the cracking images
		for(var i = 1; i < 6; i++){ 
			var crack = $('<img>').addClass('crack' + i).attr({'src': 'http://lab.gonshi.net/assets/img/level' + i +'.png'});
			crack.appendTo('a.profile-picture.media-thumbnail.js-tooltip');
		}
		// --
		
		// making the flash DOM ---------------
		var flash = $('<div/>').addClass('flash');
		flash.appendTo('a.profile-picture.media-thumbnail.js-tooltip');
		//--------------------------------------

		// making Gameover Img
		var gameover = $('<img>').addClass('gameover').attr({'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/img/bg.png'}).css({'top': - $(window).height()});
		gameover.appendTo('body');
		//----------------------
		var tweet_data = {
			tweet : [],
			word : [],
			img_url : []
		}
		var tweet_count = 0;
		$('.topbar').css({'z-index': -1});
		// make DOM of 'extension_tweet'
		var tweet = $('<p/>').addClass('extension_tweet');
		tweet.css({'margin-left': $('img.avatar.size73').offset().left + 80});  //Twitter APIのDOMはプロフィール画面内に対する相対配置であるのに対し、tweet_boxのDOMは全bodyページに対する相対配置であることによる補正
		tweet.appendTo('#doc');
		//-----------------------------
		// make DOM of 'pointer-----
		var pointer = $('<div/>').addClass('pointer');
		var img = $('<img>').attr({'src': 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/img/hammer2.png'});
		pointer.append(img);
		pointer.appendTo('#doc');	
		//--------------------------
		
		pointer.click(function(event){
			$(this).animate({'transform':'translate(-470px, -220px) rotate(10deg)'},50, 'easeOutBounce').delay(20).animate({'transform':'translate(-470px, -220px) rotate(60deg)'},100);
			audio_swing.play();
			
			setTimeout(function(){ //叩き終わるまでの遅延時間 50
				var x_diff = event.pageX - $('img.avatar.size73').offset().left;
				var y_diff = event.pageY - $('img.avatar.size73').offset().top;

				if( !first && !stop && x_diff > 300 && x_diff < 600 && y_diff > -60 && y_diff < 300 ){
					//audio -----------
					switch( current_damage ){
						case 0: audio_jab.play(); break;
						case 1: audio_jab.play(); break;
						case 2: audio_second.play(); break;
						case 3: audio_third.play(); break;
						case 4: audio_third.play(); break;
						case 5: audio_final.play(); break;
					}
					//----------------
					stop = true;

					// ダメージ画像関連 ----------------
					//if( current_damage != 5)
					current_damage++;
					// 現在出ているダメージ画像を消す
					if( current_damage != 1  && current_damage != 6) $('img.crack' + ( current_damage - 1 )).css({'display': 'none'});

					if(current_damage ==  6){ //gameover{
						$('.flash').css({'top': $('img.avatar.size73').position().top - 15, 'left': $('img.avatar.size73').position().left - 191});
						$('.flash').flash(
							{
								src: 'chrome-extension://ckoiooeippmkidpcbahhabakeffpjfbo/img/crack.swf',
								width: 667,
								height: 1000,
								wmode: 'transparent'
							},
							null,
							function(htmlOptions){
								$(this).prepend($.fn.flash.transform(htmlOptions));	
								$('img.avatar.size73, img.crack5' ).clearQueue();
								$('img.avatar.size73, img.crack5' ).stop();
								$('img.avatar.size73, img.crack5').animate({opacity: 0}, 1000);
							}
						);


						setTimeout(function(){
							$('img.gameover').animate({'top' : 0}, 1500, 'easeOutBounce');
							audio_striking.play();
							setTimeout(function(){
								audio_gameover.play();
							},2000);
						}, 2000);
					}
					else{
						// position はimageがscale(4)したことにより, 値に
						// 誤差が出ることを考慮した補正(+110)
						$('.crack' + current_damage).css({ 'left': $('img.avatar.size73').position().left + 110,  'top': $('img.avatar.size73').position().top + 110, 'opacity': 1, '-webkit-transform': 'scale(4)'});
						//-----------------------------------------

						// stop animation
						$('img.avatar.size73, .extension_tweet, img.crack' + current_damage).clearQueue();
						$('img.avatar.size73, .extension_tweet, img.crack' + current_damage).stop();

						// tweet text-----------
						var randomNum = Math.floor( Math.random() * tweet_data.tweet[current_damage].length );
						$('.extension_tweet').html(tweet_data.tweet[current_damage][randomNum] );
						$('.extension_tweet').css({ 'margin-top' : - ($('.extension_tweet').height() + 20) });

						// セリフがはみ出していたらその分内側にずらす, over_marginはその差分px量
						var over_margin_height = 0;
						if( ($('.extension_tweet').offset().top - $('.extension_tweet').height() / 2 - 20 ) < 0 ){
							over_margin_height = -1 * ( $('.extension_tweet').offset().top - $('.extension_tweet').height() / 2 - 20 ) + 20;
						}

						var over_width = false;
						if( ($('.extension_tweet').offset().left + $('.extension_tweet').width() / 2 ) > $(window).width() ){
							over_width = true;
						}
						//---------------------
						
						if( over_width ){
							$('.extension_tweet').animate({ 'left': $(window).width() - $('.profile-picture').offset().left - 700 ,'top': $('img.avatar.size73').offset().top + over_margin_height, 'transform': 'scale(1)'}, 500 * (current_damage + 1), 'easeOutElastic');

							$('img.avatar.size73, img.crack' + current_damage).animate({ 'left': $(window).width() - $('.profile-picture').offset().left - 700, 'top': $('img.avatar.size73').offset().top + over_margin_height} , 500 * (current_damage), 'easeOutElastic');
						}
						else{
							$('.extension_tweet').animate({ 'left': $('img.avatar.size73').position().left - 50,'top': $('img.avatar.size73').offset().top + over_margin_height, 'transform': 'scale(1)'}, 200 * (current_damage + 1), 'easeOutElastic');

							$('img.avatar.size73, img.crack' + current_damage).animate({ 'left': $('img.avatar.size73').position().left - 50, 'top': $('img.avatar.size73').offset().top + over_margin_height} , 500 * (current_damage), 'easeOutElastic');
						}
						//----------------------------
						
						setTimeout(function(){ // TwitterAPI君が再生
							$('.extension_tweet').animate({ 'transform': 'scale(0)'}, 100 * (current_damage + 1), 'easeOutSine', function(){
								stop = false;
								animate();
							});
						}, 3000);
					}
				}
			}, 50);

		});

		// move to chace mouse position
		$(document).on('mousemove', function(event){
			if( first ){
				first = false;
				// playing Exclamation------------------
				setTimeout(function(){
					$('img.exclamation').animate({'transform': 'scale(1) rotate(-10deg)'}, 150, 'easeOutElastic').delay(1000).animate({'transform': 'scale(0) rotate(-10deg)'}, 150, 'easeOutElastic', function(){
						// move Twitter API icon------------
						$('img.avatar.size73').attr({'src': 'http://lab.gonshi.net/assets/img/twitter.gif'});

						setTimeout(function(){
							$('img.avatar.size73').animate({'transform': 'scale(4)'}, 500, function(){
								animate();
							});
						}, 500);
						//---------------------------------
					});
				}, 500);
				//---------------------------------------
				pointer.animate({'transform': 'translate(-470px, -220px) rotate(60deg)'});
			}
			pointer.css( {top : event.pageY, left : event.pageX, display: 'block'});
		});

		// \default----------------------------------------

		// function --------------------------------------
		var animate = function(){
			if( !stop ){
				var x = Math.random() * ( $(window).width() - 292) - $('.profile-picture').offset().left + 146; // 146 = 292 / 2
				var y = Math.random() * ( $(window).height() - 292) - $('.profile-picture').offset().top + 146;
				$('img.avatar.size73, img.crack' + current_damage + ', .extension_tweet').animate({'top': y, 'left': x} , 500 * (current_damage + 1), 'easeInOutSine');
					
				setTimeout(function(){
					animate();
				}, 500);
			}
		}

		//get tweets from server using myAPI
		var get = {
			ajax: function(){
				$.ajax({
					type : 'GET',
					url : 'http://lab.gonshi.net/twitter/list',
					data : {
					format : 'json',
				},
				dataType : 'json',
				success : $.proxy(this._success, this) // 通信が成功した場合の処理
				});
			},

			_success: function(data){
				//tweet_data = data;
				var i,j,total = 0;
				for( i = 1; i < 6; i++){ // 5 is number of types
					tweet_data.tweet[i] = new Array();
					//tweet_data.word[i] = new Array();
					tweet_data.img_url[i] = new Array();
					j = 0;
					while( data.type[total] == i){// 20 is number of each section's tweets
						tweet_data.tweet[i][j] = [
							'<img src="' + data.img_url[ total ] + '" class="icon"/>',
							'<span class = "username">',
								'@' + data.username[ total ],
							'</span>',
							'<p class="text">',
								data.tweet[ total ],
							'</p>'
						].join("");
						//data.tweet[ total ];
						//tweet_data.word[i][j] = data.word[ total ];
						//tweet_data.img_url[i][j] = data.img_url[ total ];
						total++;
						j++;
					}
				}
			}
		};
		get.ajax();
	}
	/* 無限ハンマー
	(function animate(){
		$('.pointer').animate({'transform':'translate(-470px, -220px) rotate(10deg)'},50).delay(50).animate({'transform':'translate(-470px, -220px) rotate(70deg)'},50, 
			function(){
				animate();
			});
	})();
	*/
});


