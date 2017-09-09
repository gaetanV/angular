@Service({
   module: 'service-rest',
   provider: [],
})
class ChildrenService {

    constructor() {}

    getSample(): Promise<Array<sample>> {
        return new Promise(function (resolve: (sample: Array<sample>) => void) {
            resolve([
                {
                    title: "Sample No children 1",
                    id: 1,
                    children: [],
                },
                {
                    title: "Sample Title 1",
                    id: 2,
                    children: [
                        {
                            title: "Child Title 1",
                            id: 9,
                            children: [
                                {
                                    id: 25, 
                                    title: "Child Title 3", 
                                    children: []
                                },
                                {
                                    title: "Child Title 3", 
                                    id: 3, 
                                    children: []
                                 }
                            ]
                        },
                        {
                            title: "Child Title 2", 
                            id: 7,
                            children: []
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Sample Title 2",
                    children: [
                        {
                            title: "Child Title 1", 
                            id: 8, 
                            children: []
                        },
                        {
                            title: "Child Title 2", 
                            id: 6, 
                            children: []
                        }
                    ]
                }
            ]);
        })
    }

};