/*
	Tooltip Widget v0.0~dev
*/
$.widget("bs.tooltip", {
	options: {
		defaultTemplate: "<div class=\"tooltip-widget-block\"><div class=\"tooltip-widget-header\"></div><div class=\"tooltip-widget-content\"></div></div>",
		templateSource: "#tooltip-widget-template",
		template: "",
		tip: null,
		cursorOffset: [12, 12]
	},
	
	_create: function() {
		var element = this.element, tip = null;
		
		$(element).addClass("tooltip-widget-element");
		$(element).css("cursor", "default");
		
		this.options.template = $(this.options.templateSource).length === 0 ?
								this.options.defaultTemplate :
								$(this.options.templateSource).html().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
		
		if ($("#tooltip-widget-container").length == 0) {
			tip = $(this.options.template);
			tip.attr("id", "tooltip-widget-container");
			$('body').append(tip);
		} else {
			tip = $("#tooltip-widget-container");
		}
		
		this.options.tip = $(tip);
	},

	_init: function() {
		var self = this, element = self.element, tip = self.options.tip;

		$(element).mouseover(function(e) {
			self.setTipContent().setTipView().setTipPosition(e);
			$(tip).css("display", "block");
		});
		
		$(element).mousemove(function(e) {
			self.setTipPosition(e);
		});
		
		$(element).mouseout(function() {
			$(tip).css("display", "none");
		});
	},
	
	getTipTop: function(e) {
		var tip = this.options.tip;
		
		tipTop =	$(document).height() < (e.pageY + this.options.cursorOffset[1] + $(tip).height()) ?
					e.pageY - $(tip).height() :
					e.pageY + this.options.cursorOffset[1];
		
		return tipTop;
	},
	
	getTipLeft: function(e) {
		var tip = this.options.tip;
		
		tipLeft =	$(document).width() < (e.pageX + this.options.cursorOffset[1] + $(tip).width()) ?
					e.pageX - $(tip).width() :
					e.pageX + this.options.cursorOffset[0];

		return tipLeft;
	},
	
	setTipContent: function() {
		var element = this.element, tip = this.options.tip;
		
		$(tip).find(".tooltip-widget-header").text(
			this.options.tipHeader ?
			this.options.tipHeader :
			$(element).attr("tipHeader")
		);
		
		$(tip).find(".tooltip-widget-content").html(
			this.options.tipContent ?
			this.options.tipContent :
			$(element).attr("tipContent")
		);
		
		return this;
	},
	
	setTipView: function() {
		var tip = this.options.tip;
		
		$(tip).find(".tooltip-widget-header").css(
			"background-color", (
				this.options.headerColor ?
				this.options.headerColor :
				""
			)
		);
		
		return this;
	},
	
	setTipPosition: function(e) {
		var tip = this.options.tip;
		
		$(tip).css('top', this.getTipTop(e));
		$(tip).css('left', this.getTipLeft(e));
		
		return this;
	}
});