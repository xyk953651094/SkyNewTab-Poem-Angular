import {NzButtonShape} from "ng-zorro-antd/button";

export interface PreferenceDataInterface {
    searchEngine: "bing" | "google",
    simpleMode: boolean,
    buttonShape: NzButtonShape
}