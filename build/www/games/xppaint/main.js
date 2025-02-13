var PaintModule = {
	ui_elements : {
		canvas: $('#thecanvas'),
		toolbar_top: $('#toolbar_top'),
		toolbar_side: $('#toolbar_side')
	},

	init: function() {
		console.log('init');
		$(window)
		this.sizeUIelements();
		this.createHandlers();
	},

	createHandlers: function() {
		$(window).resize(function() {
			PaintModule.sizeUIelements();
		});
		$('.xp-toolbar-item').hover(function(e) {
			$(e.target).css('background-color', '#00D');
		});
	},

	sizeUIelements: function() {
		console.log('sizing UI elements');
		this.ui_elements.canvas.height($(window).height());
		this.ui_elements.canvas.width($(window).width());
		this.ui_elements.toolbar_top.width($(window).width());
		this.ui_elements.toolbar_side.height($(window).height());
	}


};

PaintModule.init();