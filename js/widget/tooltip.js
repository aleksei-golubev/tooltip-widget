/*
	Tooltip Widget v0.0.1~dev
*/
(function($) {
	$.widget("bs.tooltip", {
		options: {
			template:	"<div class=\"tooltip-widget-block\">"+
						"<div class=\"tooltip-widget-header\"></div>"+
						"<div class=\"tooltip-widget-content\"></div>"+
						"</div>",
			templateSource: "#tooltip-widget-template",
			tip: null,
			cursorOffset: [12, 12]
		},
		
		_create: function() {
			var element = this.element, tip = null;
			
			$(element).addClass("tooltip-widget-element");
			$(element).css("cursor", "default");
			
			this.options.template = $(this.options.templateSource).length === 0 ?
									this.options.template :
									$(this.options.templateSource).html().replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
			
			tip = $("#tooltip-widget-container");
			
			if (tip.length == 0) {
				tip = $(this.options.template);
				tip.attr("id", "tooltip-widget-container");
				$('body').append(tip);
			}
			
			this.options.tip = $(tip);
		},

		_init: function() {
			var self = this, element = self.element, tip = self.options.tip;

			$(element).mouseover(function(e) {
				self._setTipContent()._setTipView()._setTipPosition(e);
				$(tip).css("display", "block");
			});
			
			$(element).mousemove(function(e) {
				self._setTipPosition(e);
			});
			
			$(element).mouseout(function() {
				$(tip).css("display", "none");
			});
		},
		
		_getTipTop: function(e) {
			var tip = this.options.tip;
			
			tipTop =	$(document).height() < (e.pageY + this.options.cursorOffset[1] + $(tip).height()) ?
						e.pageY - $(tip).height() :
						e.pageY + this.options.cursorOffset[1];
			
			return tipTop;
		},
		
		_getTipLeft: function(e) {
			var tip = this.options.tip;
			
			tipLeft =	$(document).width() < (e.pageX + this.options.cursorOffset[1] + $(tip).width()) ?
						e.pageX - $(tip).width() :
						e.pageX + this.options.cursorOffset[0];

			return tipLeft;
		},
		
		_setTipContent: function() {
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
		
		_setTipView: function() {
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
		
		_setTipPosition: function(e) {
			var tip = this.options.tip;
			
			$(tip).css('top', this._getTipTop(e));
			$(tip).css('left', this._getTipLeft(e));
			
			return this;
		}
	});
})(jQuery);