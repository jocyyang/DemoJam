jQuery.sap.declare("DEP.Component");
jQuery.sap.require("DEP.Router");

sap.ui.core.UIComponent.extend("DEP.Component", {
	metadata : {
    name : "CD Department Event Pocket",
    version : "1.0",
    includes : [],
    dependencies : {
      libs : ["sap.m", "sap.ui.layout"],
      components : []
    },
    rootView : "DEP.view.App",
    config : {
            // resourceBundle : "i18n/messageBundle.properties",
            serviceConfig : {
                // name : "Northwind",
                // serviceUrl : "http://services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
              }
            },
            routing:{
             config : {
              routerClass :DEP.Router,
              viewType : "XML",
              viewPath : "DEP.view",
              targetAggregation : "pages",
              clearTarget : false
            },
            routes : [
            ]
          }
        },

        init : function() {

          sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

          var mConfig = this.getMetadata().getConfig();

        // always use absolute paths relative to our own component
        // (relative paths will fail if running in the Fiori Launchpad)
        var rootPath = jQuery.sap.getModulePath("DEP");
        
        // Create and set domain model to the component
        // var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        // var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        // this.setModel(oModel);

//TODO Mock Model?????

        // set device model
        var deviceModel = new sap.ui.model.json.JSONModel({
          isTouch : sap.ui.Device.support.touch,
          isNoTouch : !sap.ui.Device.support.touch,
          isPhone : sap.ui.Device.system.phone,
          isNoPhone : !sap.ui.Device.system.phone,
          listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
          listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
        });
        deviceModel.setDefaultBindingMode("OneWay");
        this.setModel(deviceModel, "device");
        
        this.getRouter().initialize();


      },
    });