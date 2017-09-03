interface sample {
    title: String;
    children: Array<sample>;
    id: number;
}

class ChildrenService {

    constructor() {}

    getSample(): Promise<Array<sample>> {
        return new Promise(function (resolve, reject) {
            resolve([
                {
                    title: "Sample No children 1",
                    id: "1",
                },
                {
                    title: "Sample Title 1",
                    id: "2",
                    children: [
                        {
                            title: "Child Title 1",
                            id: "9",
                            children: [
                                {title: "Child Title 3", children: []},
                                {title: "Child Title 3", id: "3"}
                            ]
                        },
                        {title: "Child Title 2", id: "7"}
                    ]
                },
                {
                    title: "Sample Title 2",
                    children: [
                        {title: "Child Title 1", id: "8"},
                        {title: "Child Title 2", id: "6"}
                    ]
                }
            ]);
        })
    }

};

angular.module('app.rest').service('ChildrenService', ChildrenService);
