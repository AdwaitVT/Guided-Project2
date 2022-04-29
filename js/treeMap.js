class TreeMap {

    constructor(parentElement) {
        this.parentElement = parentElement;
        //this.data = data;
        this.displayData = [];

        this.initVis()
    }

    initVis() {
        let vis = this;
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
                        {name: "Hello, Dolly!\n\n" +
                                "Rank : 1\n" +
                                "Acousticness: 0.66\n" +
                                "Danceability:  0.55\n" +
                                "Energy:  0.55\n" +
                                "Instrumentalness: 0.55  \n" +
                                "Liveness:  0.85\n" +
                                "Loudness:  0.35\n" +
                                "Speechiness:  0.58\n" +
                                "Tempo:  0.14", value: 5},
                        {name: "A Hard Day's Night (Soundtrack)\n\n" +
                                "Rank : 2\n" +
                                "Acousticness: 0.66\n" +
                                "Danceability:  0.55\n" +
                                "Energy:  0.55\n" +
                                "Instrumentalness: 0.55  \n" +
                                "Liveness:  0.85\n" +
                                "Loudness:  0.35\n" +
                                "Speechiness:  0.58\n" +
                                "Tempo:  0.14", value: 4},
                        {name: "People\n\n" +
                                "Rank : 3\n" +
                                "Acousticness: 0.66\n" +
                                "Danceability:  0.55\n" +
                                "Energy:  0.55\n" +
                                "Instrumentalness: 0.55  \n" +
                                "Liveness:  0.85\n" +
                                "Loudness:  0.35\n" +
                                "Speechiness:  0.58\n" +
                                "Tempo:  0.14", value: 3},
                        {name: "Out Of Our Heads\n\n" +
                                "Rank : 4\n" +
                                "Acousticness: 0.66\n" +
                                "Danceability:  0.55\n" +
                                "Energy:  0.55\n" +
                                "Instrumentalness: 0.55  \n" +
                                "Liveness:  0.85\n" +
                                "Loudness:  0.35\n" +
                                "Speechiness:  0.58\n" +
                                "Tempo:  0.14", value: 2},
                        {name: "Whipped Cream & Other Delights\n\n" +
                                "Rank : 5\n" +
                                "Acousticness: 0.66\n" +
                                "Danceability:  0.55\n" +
                                "Energy:  0.55\n" +
                                "Instrumentalness: 0.55  \n" +
                                "Liveness:  0.85\n" +
                                "Loudness:  0.35\n" +
                                "Speechiness:  0.58\n" +
                                "Tempo:  0.14", value: 1}
                    ]
                },
                {
                    name: "Albums of 1971 - 1980",
                    children: [
                        {name: "Led Zeppelin IV\n\n" +
                                "Rank : 1\n", value: 5},
                        {name: "Harvest\n\n" +
                                "Rank : 2\n", value: 4},
                        {name: "Thick As A Brick\n\n" +
                                "Rank : 3\n", value: 3},
                        {name: "Rhymes & Reasons\n\n" +
                                "Rank : 4\n", value: 2},
                        {name: "John Denver's Greatest Hits\n\n" +
                                "Rank : 5\n", value: 1}
                    ]
                },
                {
                    name: "Albums of 1981 - 1990",
                    children: [
                        {name: "Hotter Than July\n\n" +
                                "Rank : 1\n", value: 5},
                        {name: "The Jazz Singer (Soundtrack)\n\n" +
                                "Rank : 2\n", value: 4},
                        {name: "Arc Of A Diver\n\n" +
                                "Rank : 3\n", value: 3},
                        {name: "Flashdance\n\n" +
                                "Rank : 4\n", value: 2},
                        {name: "Slippery When Wet\n\n" +
                                "Rank : 5\n", value: 1}
                    ]
                },
                {
                    name: "Albums of 1991 - 2000",
                    children: [
                        {name: "The Immaculate Collection\n\n" +
                                "Rank : 1\n", value: 5},
                        {name: "Blood Sugar Sex Magik\n\n" +
                                "Rank : 2\n", value: 4},
                        {name: "Bedtime Stories\n\n" +
                                "Rank : 3\n", value: 3},
                        {name: "Daydream\n\n" +
                                "Rank : 4\n", value: 2},
                        {name: "Millennium\n\n" +
                                "Rank : 5\n", value: 1}
                    ]
                },
                {
                    name: " Albums of 2001 - 2010",
                    children: [
                        {name: "Word Of Mouf\n\n" +
                                "Rank : 1\n", value: 5},
                        {name: "Come Away With Me\n\n" +
                                "Rank : 2\n", value: 4},
                        {name: "Greatest Hits\n\n" +
                                "Rank : 3\n", value: 3,},
                        {name: "The Emancipation Of Mimi\n\n" +
                                "Rank : 4\n", value: 2},
                        {name: "Daughtry\n\n" +
                                "Rank : 5\n", value: 1}
                    ]
                },
                {
                    name: "Albums of 2011 - 2020",
                    children: [
                        {name: "El Camino\n\n" +
                                "Rank : 1\n", value: 5},
                        {name: "Wrapped In Red\n\n" +
                                "Rank : 2\n", value: 4},
                        {name: "Fifty Shades Of Grey\n\n" +
                                "Rank : 3\n", value: 3},
                        {name: "Purpose\n\n" +
                                "Rank : 4\n",value: 2},
                        {name: "Heartbreak On A Full Moon\n\n" +
                                "Rank : 5\n", value: 1}

                    ]
                }

            ]
        }
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

    }
}