class AjaxRequestDTO {
    constructor(url, data) {
        this.url = url;
        this.data = data;
    }
}

$(function () {
    Object.defineProperty(Object.prototype, "getPropDefault", {
        value: function (prop, val) {
            var retVal = val;
            var key, self = this;
            if (Object.keys(self).length > 0) {
                for (key in self) {
                    if (key.toLowerCase() == prop.toLowerCase()) {
                        retVal = self[key];
                        break;
                    }
                }
            }
            if (retVal == null || retVal == 'null') {
                retVal = val;
            }
            return retVal;
        },
        //this keeps jquery happy
        enumerable: false
    });

    Object.defineProperty(Object.prototype, "getProp", {
        value: function (prop) {
            var key, self = this;
            for (key in self) {
                if (key.toLowerCase() == prop.toLowerCase()) {
                    return self[key];
                }
            }
        },
        //this keeps jquery happy
        enumerable: false
    });

    Object.defineProperty(Object.prototype, "setProp", {
        value: function (prop, val) {
            var key, self = this;
            var found = false;
            if (Object.keys(self).length > 0) {
                for (key in self) {
                    if (key.toLowerCase() == prop.toLowerCase()) {
                        //set existing property
                        found = true;
                        self[key] = val;
                        break;
                    }
                }
            }

            if (!found) {
                //if the property was not found, create it
                self[prop] = val;
            }

            return val;
        },
        //this keeps jquery happy
        enumerable: false
    });
})

