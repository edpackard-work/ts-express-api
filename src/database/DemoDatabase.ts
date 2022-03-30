class DemoDatabase {
    
    data: Array<String>

    constructor () {
        this.data = ['Demo GET route is working'];
    };

    public getMessageData() {
        return this.data[0];
    };

}

export default DemoDatabase;