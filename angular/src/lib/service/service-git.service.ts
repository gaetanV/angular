import {Injectable , Inject} from '@angular/core';
import {Http} from '@angular/http';

interface GitMap {
    tree: Array<GitMapItem>;
}

interface GitMapItem {
    url: string;
    path: string;
}

interface GitPath {
    content: string;
}

interface Cache {
    data: Array<GitMapItem>;
    time: number;
    refresh: number;
}

const cMap: Array<Cache> = [];

@Injectable()
export class ServiceGit {

    constructor(
        @Inject(Http) private http: Http

    ) {}

    getMap(user: string, repositories: string, branch: string) {
        return new Promise((resolve, reject) => {
            const index = '${user}/${repositories}/${branch}';
            if (cMap[index]) {
                // 60 secondes
                if ((new Date().getTime() - cMap[index].time) < cMap[index].refresh) {
                    resolve(cMap[index].data);
                }
            }
            this.http.get(`https://api.github.com/repos/${user}/${repositories}/git/trees/${branch}?recursive=1`)
                .subscribe(
                (data) => {
                    const data_js: GitMap = data.json();
                    if (!data_js.tree) {
                        reject('Error in Ressource map data : missing tree index');
                    }
                    const response: Array<GitMapItem> = [];

                    data_js.tree.forEach((a: GitMapItem) => {
                        response[a.path] = a;
                    });
                    cMap[index] = {
                        data: response,
                        time: new Date().getTime(),
                        refresh: 60000, // 60 secondes
                    };
                    resolve(response);
                },
                (error) => reject(`Error Http https://api.github.com/repos/${user}/${repositories}/git/trees/${branch}?recursive=1`)
                );
        });
    }

    getPath(user: string, repositories: string, branch: string, path: string) {
        return new Promise((resolve, reject) => {
            this.getMap(user, repositories, branch).then(
                (data_js: Array<GitMapItem>) => {
                    if (!data_js[path]) {
                        reject('Error final ressources not found in map');
                    } else {
                        this.http.get(data_js[path].url)
                        .subscribe(
                            (data) => {
                                const tmp: GitPath = data.json();
                                if (!tmp.content) {
                                    reject('Error in final ressources : missing content index');
                                } else {
                                    resolve(atob(tmp.content));
                                }
                            },
                            (error) => {
                                reject(`Error Http ${data_js[path].url}`);
                            }
                        );
                    }
                },
                (error) => reject(error)
            );
        });
    }
}
