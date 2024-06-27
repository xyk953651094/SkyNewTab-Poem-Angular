import {getDevice} from "./publicFunctions";
import {PreferenceDataInterface} from "./publicInterface";

export let lightThemeArray: ({ majorColor: string; minorColor: string; svgColors: string[]; }[]) = [
    {
        'majorColor': '#CCD0CF', 'minorColor': '#06141B',
        'svgColors': ['#11212D', '#253745', '#4A5C6A']
    },
    {
        'majorColor': '#FBE4DB', 'minorColor': '#190019',
        'svgColors': ['#DFB6B2', '#554F6C', '#522B5B']
    },
    {
        'majorColor': '#FADCD5', 'minorColor': '#765D67',
        'svgColors': ['#6D3C52', '#4B2138', '#2D222F']
    },
    {
        'majorColor': '#F7CBCA', 'minorColor': '#5D6B6B',
        'svgColors': ['#DEE7E8', '#DFD9D6', '#C8DBDE']
    },

    {
        'majorColor': '#F2E6CE', 'minorColor': '#6E8B74',
        'svgColors': ['#C0C7AF', '#90A897', '#668883']
    },
    {
        'majorColor': '#E2E1E4', 'minorColor': '#74759B',
        'svgColors': ['#C3C6CE', '#9FACB7', '#7A959D']
    },
    {
        'majorColor': '#B0B298', 'minorColor': '#475C4E',
        'svgColors': ['#8C9E89', '#6B8A7D', '#507473']
    },
    {
        'majorColor': '#EFDFDF', 'minorColor': '#795A5F',
        'svgColors': ['#CEBCC2', '#AA9CA8', '#827E8F']
    },
    {
        'majorColor': '#F2EBD9', 'minorColor': '#66363C',
        'svgColors': ['#C3CAB7', '#94AA9C', '#6A8985']
    },
    {
        'majorColor': '#C9DD22', 'minorColor': '#2F2F35',
        'svgColors': ['#66C958', '#00AD7C', '#008C89']
    },
    {
        'majorColor': '#EEF7F2', 'minorColor': '#114E7A',
        'svgColors': ['#C3D2CE', '#99AEAE', '#728B90']
    },
    {
        'majorColor': '#D1B894', 'minorColor': '#804145',
        'svgColors': ['#A0A681', '#739178', '#4F7A72']
    },
    {
        'majorColor': '#F6DCCE', 'minorColor': '#815C94',
        'svgColors': ['#D8B8B7', '#B397A3', '#897B8F']
    },
    {
        'majorColor': '#AFDDE0', 'minorColor': '#565F9A',
        'svgColors': ['#94C3D7', '#89A6C9', '#8B87B2']
    },
];

export const darkThemeArray: ({ majorColor: string; minorColor: string; svgColors: string[]; }[]) = [
    {
        'majorColor': '#06141B', 'minorColor': '#CCD0CF',
        'svgColors': ['#4A5C6A', '#253745', '#11212D']
    },
    {
        'majorColor': '#190019', 'minorColor': '#FBE4DB',
        'svgColors': ['#2B124C', '#522B5B', '#554F5C']
    },
    {
        'majorColor': '#2F4644', 'minorColor': '#D6D6D4',
        'svgColors': ['#9EB6B3', '#808E8C', '#46746F']
    },
    {
        'majorColor': '#D6D6D4', 'minorColor': '#2F4644',
        'svgColors': ['#9EB6B3', '#808E8C', '#46746F']
    },
    {
        'majorColor': '#5A636A', 'minorColor': '#0D1F23',
        'svgColors': ['#69818D', '#2D4A53', '#132E35']
    },
    {
        'majorColor': '#6DA5C0', 'minorColor': '#05161A',
        'svgColors': ['#49B2B8', '#348A91', '#294D61']
    },

    {
        'majorColor': '#6E8B74', 'minorColor': '#F2E6CE',
        'svgColors': ['#597F71', '#47726E', '#3A6469']
    },
    {
        'majorColor': '#475C4E', 'minorColor': '#B0B298',
        'svgColors': ['#4A8884', '#4A796F', '#4A6A5D']
    },
    {
        'majorColor': '#795A5F', 'minorColor': '#EFDFDF',
        'svgColors': ['#7A7E57', '#856F52', '#856358']
    },
    {
        'majorColor': '#66363C', 'minorColor': '#F2EBD9',
        'svgColors': ['#DC9A55', '#BC7350', '#935149']
    },
    
    {
        'majorColor': '#A29192', 'minorColor': '#444C5E',
        'svgColors': ['#918087', '#7D707D', '#656173']
    },

    {
        'majorColor': '#444C5E', 'minorColor': '#A29192',
        'svgColors': ['#34C0A1', '#0099A4', '#38718B']
    },
    {
        'majorColor': '#9B9690', 'minorColor': '#0D0831',
        'svgColors': ['#526964', '#3C595F', '#2F4858',]
    },
    {
        'majorColor': '#0D0831', 'minorColor': '#9B9690',
        'svgColors': ['#DA6F58', '#A03E5B', '#58204F',]
    },
    {
        'majorColor': '#2F2F35', 'minorColor': '#C9DD22',
        'svgColors': ['#E18575', '#A56477', '#614B61',]
    },
    {
        'majorColor': '#114E7A', 'minorColor': '#EEF7F2',
        'svgColors': ['#00C298', '#009DA5', '#00759B',]
    },
    {
        'majorColor': '#804145', 'minorColor': '#D1B894',
        'svgColors': ['#6B8746', '#826E33', '#895537']
    },
    {
        'majorColor': '#815C94', 'minorColor': '#F6DCCE',
        'svgColors': ['#FF9C75', '#EF7A89', '#BE6796']
    },
    {
        'majorColor': '#565F9A', 'minorColor': '#AFDDE0',
        'svgColors': ['#9F66AB', '#8664A8', '#6E62A2']
    },
];

export const poemTopics = [
    "all", "shuqing", "siji", "shanshui", "tianqi", "renwu", "rensheng", "shenghuo", "jieri", "dongwu", "zhiwu", "shiwu"
];

// 中国窗体
export const chinaWindow = [
    "icon-chuangge1",
    "icon-chuangge3",
    // "icon-chuangge4",
    "icon-chuangge5",
    "icon-chuangge7",
    "icon-chuangge9",
    "icon-chuangge10",
    "icon-chuangge11",
    "icon-chuangge13",
    "icon-chuangge14",
    "icon-chuangge16",
]

// 中国窗体
export const chinaObject = [
    "icon-chaye",
    "icon-huaping",
    "icon-huaping1",
    "icon-meihua",
    "icon-facaishu",
    "icon-chuxiye",
]

export let defaultPreferenceData: PreferenceDataInterface = {
    poemTopic: "all",
    autoTopic: false,
    changePoemTime: "3600000",

    searchEngine: "bing",
    simpleMode: false,
    buttonShape: "round"
}

// 常用变量
export let device = getDevice();  // 获取当前设备类型
