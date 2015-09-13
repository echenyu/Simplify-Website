// Loading page complete
$(window).load(function()
{
	checkHero(); // Check hero height is correct
	animateWhenVisable();  // Activate animation when visable	
});

// Page ready
$(document).ready(function()
{
	$('.hero').css('height', $(window).height()+'px'); // Set initial hero height
	$('#scroll-hero').click(function()
	{
		$('html,body').animate({scrollTop: $("#hero-bloc").height()}, 'slow');
	});
	
	setUpLightBox(); // Add lightbox Support
});

// Window resize 
$(window).resize(function()
{		
	$('.hero').css('height',getHeroHeight()+'px'); // Refresh hero height  	
}); 
 
// Get Hero Height
function getHeroHeight()
{
	var H = $(window).height(); // Window height
	
	if(H < heroBodyH) // If window height is less than content height
	{
		H = heroBodyH+100;
	}
	return H
}

// check hero height
function checkHero()
{
	P = parseInt($('.hero-nav').css('padding-top'))*2
	window.heroBodyH = $('.hero-nav').outerHeight()+P+$('.vc-content').outerHeight()+50; // Set hero body height
	$('.hero').css('height', getHeroHeight() + 'px'); // Set hero to fill page height
}

// Scroll to target
function scrollToTarget(D)
{
	if(D == 1) // Top of page
	{
		D = 0;
	}
	else if(D == 2) // Bottom of page
	{
		D = $(document).height();
	}
	else // Specific Bloc
	{
		D = $(D).offset().top;
		if($('.sticky-nav').length) // Sticky Nav in use
		{
			D = D-100;
		}
	}

	$('html,body').animate({scrollTop:D}, 'slow');
}

// Initial tooltips
$(function()
{
  $('[data-toggle="tooltip"]').tooltip()
})


// Animate when visable
function animateWhenVisable()
{
	hideAll(); // Hide all animation elements
	inViewCheck(); // Initail check on page load
	
	$(window).scroll(function()
	{		
		inViewCheck(); // Check object visability on page scroll
		scrollToTopView(); // ScrollToTop button visability toggle
		stickyNavToggle(); // Sticky nav toggle
	});		
};

// Hide all animation elements
function stickyNavToggle()
{
	if ($(window).scrollTop() > 0)
	{  
		$('.sticky-nav').addClass("sticky");
		$('.page-container').css('padding-top',$('.sticky-nav').height());
	}
	else
	{
		$('.sticky-nav').removeClass("sticky");
		$('.page-container').removeAttr('style');
	}
}

// Hide all animation elements
function hideAll()
{
	$('.animated').each(function(i)
	{	
		if(!$(this).closest('.hero').length) // Dont hide hero object
		{
			$(this).removeClass('animated').addClass('hideMe');
		}
	});
}

// Check if object is inView
function inViewCheck()
{	
	$($(".hideMe").get().reverse()).each(function(i)
	{	
		var target = jQuery(this);

		a = target.offset().top + target.height();
		b = $(window).scrollTop() + $(window).height();
		
		if (a < b) 
		{	
			var objectClass = target.attr('class').replace('hideMe' , 'animated');
			target.css('visibility','hidden').removeAttr('class');
			setTimeout(function(){target.attr('class',objectClass).css('visibility','visable');},0.01);				
		}
	});
};

// ScrollToTop button toggle
function scrollToTopView()
{
	if($(window).scrollTop() > $(window).height()/3)
	{	
		if(!$('.scrollToTop').hasClass('showScrollTop'))
		{
			$('.scrollToTop').addClass('showScrollTop');
		}	
	}
	else
	{
		$('.scrollToTop').removeClass('showScrollTop');
	}
};

// Add light box support
function setUpLightBox()
{
	$(document).on('click', '[data-lightbox]', function(e) // Create Lightbox Modal
	{
		e.preventDefault();
		var captionData ='<p class="lightbox-caption">'+$(this).attr('data-caption')+'</p>';
		if(!$(this).attr('data-caption')) // No caption caption data
		{
			captionData = '';
		}
		
		var customModal = $('<div id="lightbox-modal" class="modal fade"><div class="modal-dialog"><div class="modal-content '+$(this).attr('data-frame')+'"><button type="button" class="close close-lightbox" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="modal-body"><img id="lightbox-image" class="img-responsive" src="'+$(this).attr('data-lightbox')+'">'+captionData+'</div></div></div></div>');
		$('body').append(customModal);
		$('#lightbox-modal').modal('show');
	}
	).on('hidden.bs.modal', '#lightbox-modal', function () // Handle destroy modal 
	{
		$('#lightbox-modal').remove();
	})
}