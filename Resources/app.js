var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

if (Ti.App.deployType !== "production") {
    var behave = require("behave");
    require("spec/ui");
    behave.run();
}

Alloy.createController("index");