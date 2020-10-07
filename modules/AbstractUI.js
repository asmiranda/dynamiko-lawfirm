class AbstractUI {
    getPWidget(request, callback) {
        console.log(new Error(`getPWidget not implemented in ${this.constructor.name}`));
    }
    getWidget(request, callback) {
        console.log(new Error(`getWidget not implemented in ${this.constructor.name}`));
    }
}

module.exports = AbstractUI;
