jQuery.sap.declare("DEP.view.BaseController");

sap.ui.core.mvc.Controller.extend("DEP.view.BaseController", {
    getEventBus: function () {
        var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());
        return sap.ui.component(sComponentId).getEventBus();
    },

    getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
    },

    onNavButtonPressed: function () {
        this.getRouter().backWithoutHash(this.getView());
    }
});