$(function(){
	
	
	//navigation highlight vars
	$window = $(window);
    var	menuItems = $("#resumenav").find("a.scroller");
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});
	
	$('.last-section').css('min-height', $window.height() + 'px');
	
	//menu highlight
	function do_nav_actions(){
		var fromTop = $(this).scrollTop();
		var cur = scrollItems.map(function(){
			if ($(this).offset().top <= fromTop + 5){
				return this;
			}
		});
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
		menuItems
			.parent().removeClass("active")
			.end().filter("[href=#"+id+"]").parent().addClass("active");
	}
	
	$window.scroll( function() {
		do_nav_actions();
	}).scroll();		
	
	//Showing blog items
	$('#blog-items .more-info').click(function(e){
		e.preventDefault();
		var targetId = $(this).attr('href');
		$('#blog-items').hide();
		$(targetId+', #full-blog-items #blog-back').hide().removeClass('hidden').fadeIn('400', 'easeInOutCubic');
	});
	
	$('#blog-back').click(function(e){
		e.preventDefault();
		$('.blogitem-content:visible, #blog-back').hide().addClass('hidden');
		$('#blog-items').fadeIn('400', 'easeInOutCubic');
		var documentBody = $('html, body');
		$(documentBody).animate({scrollTop: $('#blog').offset().top}, 1000,'easeInOutCubic');
	});
	
	//Blog item nav
	$('.blogitem-content .pager a').click(function(e){
		e.preventDefault();
		var targetId = $(this).attr('href');
		$('.blogitem-content:visible').hide().addClass('hidden');
		$(targetId).hide().removeClass('hidden').fadeIn('400', 'easeInOutCubic');
	});
	
	//Showing portfolio items
	$('#portfolio-items .more-info').click(function(e){
		e.preventDefault();
		var targetId = $(this).attr('href');
		$('#portfolio-items, #portfolio-filters').hide();
		$(targetId+', #portfolio-back').hide().removeClass('hidden').fadeIn('400', 'easeInOutCubic');
	});
	
	$('#portfolio-back').click(function(e){
		e.preventDefault();
		$('.portfolioitem-content:visible, #portfolio-back').hide().addClass('hidden');
		$('#portfolio-items, #portfolio-filters').fadeIn('400', 'easeInOutCubic');
		var documentBody = $('html, body');
		$(documentBody).animate({scrollTop: $('#portfolio').offset().top}, 1000,'easeInOutCubic');
	});
	
	//portfolio item nav
	$('.portfolioitem-content .pager a').click(function(e){
		e.preventDefault();
		var targetId = $(this).attr('href');
		$('.portfolioitem-content:visible').hide().addClass('hidden');
		$(targetId).hide().removeClass('hidden').fadeIn('400', 'easeInOutCubic');
	});


	
	//Isotop related actions
	var $containerblog = $('#blog-items');
	// initialize isotope
	$containerblog.imagesLoaded( function(){
		$containerblog.isotope({
	 		itemSelector : '.blogitem',
	 		layoutMode : 'fitRows'
		});
		
	});

	var $container = $('#portfolio-items');
	// initialize isotope
	$container.imagesLoaded( function(){
		$container.isotope({
	 		itemSelector : '.portfolioitem',
	 		layoutMode : 'fitRows'
		});
	});
	
	// filter items when filter link is clicked
	$('#portfolio-filters a').click(function(){
		$('#portfolio-filters a').parent('li').removeClass('active');
	  	var selector = $(this).attr('data-filter');
	  	$container.isotope({ filter: selector });
	  	$(this).parent('li').addClass('active');
	  	return false;
	});
		
	
	//Timeline
	$('.timeline-item-trigger span').click(function(){
		if($(this).hasClass('circle_plus')){$(this).removeClass('circle_plus').addClass('circle_minus');}
		else{$(this).removeClass('circle_minus').addClass('circle_plus');}
	});
	
	$('.timeline-item-title').click(function(){
		$trigger = $(this).parent().parent().find('.timeline-item-trigger span');
		if($trigger.hasClass('circle_plus')){$trigger.removeClass('circle_plus').addClass('circle_minus');}
		else{$trigger.removeClass('circle_minus').addClass('circle_plus');}
	});
	

	//Scroll
	// top of page (action)
	$('.scroller').click(function(e) {
		e.preventDefault();
		var targetScroll = $(this).attr('href');
		var documentBody = $('html, body');
	    $(documentBody).stop().animate({scrollTop: $(targetScroll).offset().top}, 1000,'easeInOutCubic');
	});
	
	//Sidebar height
	function sidebarHeight(){
		var height = $('#main-content').height();
		$('#sidebar .sidebar-nav').height(height);
	}
	sidebarHeight();
	
	$('#main-content').resize(function() {
		sidebarHeight();
	});
	
	
	//blogitem hover
	$(document).on("mouseenter", '.blogitem, .portfolioitem', function(){
		$('.blogitem-hoverinfo, .portfolioitem-hoverinfo', this).stop(true, true).fadeIn('200', 'easeInOutCubic');
	});
	
	$(document).on("mouseleave", '.blogitem, .portfolioitem', function(){
		$('.blogitem-hoverinfo, .portfolioitem-hoverinfo', this).stop(true, true).fadeOut('200', 'easeInOutCubic');
	});
	

	//viewport listener : load script regarding viewport height
	viewportWidth = $(window).width();
	if(viewportWidth >= 768){viewPortContext = "desktop";}else{viewPortContext = "mobile";}
	
	function conditionalScripts(viewPortContext) {
	
		newViewportWidth = $(window).width();
		if(newViewportWidth >= 768){newViewPortContext = "desktop";}else{newViewPortContext = "mobile";}
		
		if(viewPortContext != newViewPortContext){
		
			if(newViewPortContext == 'desktop'){ 	//scripts for desktop only
				
				//Add Tooltips
				$('.tips').tooltip();
				$('.lightbox').unbind("click").prettyPhoto();
				
			}else{ 									//scripts for mobile only
				
				//Remove Tooltips
				$('.tips').tooltip('destroy');
				$('.lightbox').unbind("click").photoSwipe();

			}
		}
		
		viewPortContext = newViewPortContext;
	}
	conditionalScripts(); //first execution
	
	$(window).resize(function() { //execution on window resizing
		conditionalScripts();
	});

	
});