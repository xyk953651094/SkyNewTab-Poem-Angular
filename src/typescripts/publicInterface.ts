import {NzButtonShape} from "ng-zorro-antd/button";

export interface PreferenceDataInterface {
    poemTopic: string,
    autoTopic: boolean,
    changePoemTime: string,

    searchEngine: "bing" | "google",
    simpleMode: boolean,
    buttonShape: NzButtonShape
}