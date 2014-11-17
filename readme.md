#Tooltip Widget v0.0~dev

Tooltip Widget is a widget based on jQuery-UI. It helps to create simple tips for your elements on a web-page.

##Example

To create a tooltip you need:

* Define an html-template for tooltip.
```
<div id="templates">
	<div id="tooltip-widget-template">
		<div class="tooltip-widget-block">
			<div class="tooltip-widget-header"></div>
			<div class="tooltip-widget-content"></div>
		</div>
	</div>
</div>
```
* Add tooltip header and content to an element.
```
<input type="password" id="password" tipHeader="Password" tipContent="Input your password here." />
```
* Attach widget to element.
```
$('#password').tooltip({
	templateSource: "#tooltip-widget-template"
});
```
JS-file with script of Informer widget is js/widget/tooltip.js
