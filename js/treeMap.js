var root = am5.Root.new("chartdiv");

root.setThemes([
    am5themes_Animated.new(root)
]);

var data = [{
    name: "Top 5 Albums Per Decade",
    children: [
        {
            name: "Albums of 1961 -1970",
            children: [
                { name: "Hello, Dolly!", value: 1 },
                { name: "A Hard Day's Night (Soundtrack)", value: 1 },
                { name: "People", value: 1 },
                { name: "Out Of Our Heads", value: 1 },
                { name: "Whipped Cream & Other Delights", value: 1 }
            ]
        },
        {
            name: "Albums of 1971 - 1980",
            children: [
                { name: " Led Zeppelin IV", value: 1 },
                { name: "Harvest", value: 1 },
                { name: "Thick As A Brick", value: 1 },
                { name: "Rhymes & Reasons", value: 1 },
                { name: "John Denver's Greatest Hits", value: 1 }
            ]
        },
        {
            name: "Albums of 1981 - 1990",
            children: [
                { name: "Hotter Than July", value: 1 },
                { name: "The Jazz Singer (Soundtrack)", value: 1 },
                { name: "Arc Of A Diver", value: 1 },
                { name: "Flashdance", value: 1 },
                { name: "Slippery When Wet", value: 1 }
            ]
        },
        {
            name: "Albums of 1991 - 2000",
            children: [
                { name: "The Immaculate Collection", value: 1 },
                { name: "Blood Sugar Sex Magik", value: 1 },
                { name: "Bedtime Stories", value: 1 },
                { name: "Daydream", value: 1 },
                { name: "Millennium", value: 1 }
            ]
        },
        {
            name: " Albums of 2001 - 2010",
            children: [
                { name: "Word Of Mouf", value: 1 },
                { name: "Come Away With Me", value: 1 },
                { name: "Greatest Hits", value: 1 },
                { name: "The Emancipation Of Mimi", value: 1 },
                { name: "Daughtry", value: 1 }
            ]
        },
        {
            name: "Albums of 2011 - 2020",
            children: [
                { name: "El Camino", value: 1 },
                { name: "Wrapped In Red", value: 1 },
                { name: "Fifty Shades Of Grey", value: 1 },
                { name: "Purpose", value: 1 },
                { name: "Heartbreak On A Full Moon", value: 1 }

            ]
        }

    ]}
];


var container = root.container.children.push(
    am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout
    })
);

var series = container.children.push(
    am5hierarchy.Treemap.new(root, {
        downDepth: 1,
        upDepth: 0,
        initialDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        nodePaddingOuter: 15,
        nodePaddingInner: 15
    })
);
series.data.setAll(data);
series.set("selectedDataItem", series.dataItems[0]);

// Add breadcrumbs
container.children.unshift(
    am5hierarchy.BreadcrumbBar.new(root, {
        series: series
    })
);