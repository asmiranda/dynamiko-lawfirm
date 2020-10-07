class Storage {
    tokenStorage = window.localStorage;
    tokenStorage = window.sessionStorage;

    clearToken() {
        this.tokenStorage.clear();
    }

    setToken(token) {
        this.tokenStorage.token = token;
    }
    getToken() {
        return this.tokenStorage.token;
    }

    set(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        try {
            return JSON.parse(window.sessionStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }
}

const storage = new Storage();

