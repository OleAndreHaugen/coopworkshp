const value = this.getValue();
const bindingItems = tabData.getBinding("items");

let filters = [];
let bindingName = {};

if (!bindingItems.iLength) {
    bindingItems.filter();
    return;
}

// Get unique binding name
$.each(bindingItems.oModel.aBindings, function (i, data) {
    if (!bindingName[data.sPath] && data.sPath.indexOf("/") === -1) {
        bindingName[data.sPath] = true;
        if (!data.oDataState.mChangedProperties.value.__edmType) filters.push(new sap.ui.model.Filter(data.sPath, "Contains", value));
    }
});

// Apply Filter
bindingItems.filter([
    new sap.ui.model.Filter({
        filters: filters,
        and: false,
    }),
]);
