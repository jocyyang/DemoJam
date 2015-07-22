jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
jQuery.sap.require("sap.ui.core.routing.Router");
jQuery.sap.declare("DEP.Router");
sap.ui.core.routing.Router.extend("DEP.Router", {

	constructor : function() {
		sap.ui.core.routing.Router.apply(this, arguments);
		this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
		this._oHashChanger = new sap.ui.core.routing.HashChanger();
	},

	navBack : function(sRoute, mData) {
		var oHistory = sap.ui.core.routing.History.getInstance();
		var sPreviousHash = oHistory.getPreviousHash();

	 	// The history contains a previous entry
	 	if (sPreviousHash !== undefined) {
	 		window.history.go(-1);
	 	} else {
	 		var bReplace = true; // otherwise we go backwards with a forward history
	 		// this._oHashChanger.replaceHash("sPreviousHash");
	 		this.navTo(sRoute, mData, bReplace);
	 	}
	 },

	// /**
	//  * @public Changes the view without changing the hash
	//  *
	//  * @param oOptions {object} must have the following properties
	//  * <ul>
	//  * 	<li> currentView : the view you start the navigation from.</li>
	//  * 	<li> targetViewName : the fully qualified name of the view you want to navigate to.</li>
	//  * 	<li> targetViewType : the viewtype eg: XML</li>
	//  * 	<li> transition : default is "show", the navigation transition</li>
	//  * 	<li> data : the data passed to the navContainers livecycle events</li>
	//  * </ul>
	//  */
	navToWithoutHash : function (oOptions) {
		var oApp = this._findApp(oOptions.currentView);

		// Load view, add it to the page aggregation, and navigate to it
		var oView = this.getView(oOptions.targetViewName, oOptions.targetViewType);
		oApp.addPage(oView);
		oApp.to(oView.getId(), oOptions.transition || "show", oOptions.data);
	},

	backWithoutHash : function (oCurrentView, bIsMaster) {
		this._findApp(oCurrentView);
		
	},
	
	destroy : function() {
		sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
		this._oRouteMatchedHandler.destroy();
	},

	_findApp : function(oControl) {
		var sAncestorControlName = "DEPApp";

		if (oControl instanceof sap.ui.core.mvc.View && oControl.byId(sAncestorControlName)) {
			return oControl.byId(sAncestorControlName);
		}


		return oControl.getParent() ? this._findApp(oControl.getParent(), sAncestorControlName) : null;
	}
});
