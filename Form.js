class Form {
    constructor(form, action) {
        this.form = form;
        switch (action) {
            case 'set':
                form.addEventListener('submit', this.set.bind(this));
                break;
            case 'get':
                form.addEventListener('submit', this.get.bind(this));
                break;
            case 'delete':
                form.addEventListener('submit', this.delete.bind(this));
                break;
        }
    }
    set(event) {
        event.preventDefault()
        try {
            if (this.form.key.value && this.form.value.value) {
                const setObj = {};
                setObj[this.form.key.value] = this.form.value.value;
                dispatcher.setData({ ...setObj });
            } else {
                throw new Error('empty input')
            }
        } catch (e) {
            console.error(e)
        }
    }
    get(event) {
        event.preventDefault()
        try {
            if (this.form.key.value) {
                dispatcher.getData(this.form.key.value);;
            } else {
                throw new Error('empty input')
            }
        } catch (e) {
            console.error(e)
        }
    }

    delete(event) {
        event.preventDefault()
        try {
            if (this.form.key.value) {
                dispatcher.deleteData(this.form.key.value);;
            } else {
                throw new Error('empty input')
            }
        } catch (e) {
            console.error(e)
        }
    }
}