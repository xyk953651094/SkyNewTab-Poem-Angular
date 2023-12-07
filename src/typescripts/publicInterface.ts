import {NzButtonShape} from "ng-zorro-antd/button";

export interface PreferenceDataInterface {
    searchEngine: "bing" | "google" | "baidu",
    simpleMode: boolean,
    buttonShape: NzButtonShape
}