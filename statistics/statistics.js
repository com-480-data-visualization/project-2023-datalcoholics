function onChange() {
    const e = document.getElementById("cuisine-selector");
    //console.log(e.value)

    fetch(`/data/cuisine_reviews/aggregated/${e.value}_reviews.json`)
    .then((response) => response.json())
    .then((json) => {

        var data = json;
        var filtered = [];
        const dateBound = new Date('2014-01-01');
        for (let i = 0; i < data.length; i++) {
            const dateToCheck = new Date(data[i].review_date);
            if (dateToCheck > dateBound){
                filtered.push(data[i]);
            }
        } 
        setTimeData(filtered);
    });
}

function setTimeChart(){
        
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new("timechart");
        
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        
        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        this.chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelY: "none"
        }));
        
        this.chart.zoomOutButton.set("forceHidden", true);
        
        this.chart.get("colors").set("step", 2);
        
        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

        var xAxisRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 10 });

        xAxisRenderer.labels.template.setAll({
            rotation: -90,
          });

        this.xAxis = this.chart.xAxes.push(am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: "month", count: 1 },
          renderer: xAxisRenderer,
          tooltip: am5.Tooltip.new(root, {})

        }));        
        
        var ratingAxisRenderer = am5xy.AxisRendererY.new(root, {});
        ratingAxisRenderer.grid.template.set("forceHidden", true);
        var ratingAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: ratingAxisRenderer,
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        var averageAxisRenderer = am5xy.AxisRendererY.new(root, {
            opposite: true
        });
        averageAxisRenderer.grid.template.set("forceHidden", true);
        var averageAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: averageAxisRenderer
        }));
        
        
        
        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        this.ratingSeries = this.chart.series.push(am5xy.ColumnSeries.new(root, {
          xAxis: this.xAxis,
          yAxis: ratingAxis,
          valueYField: "count",
          valueXField: "review_date",
          tooltip:am5.Tooltip.new(root, {
            labelText:"{valueY} ratings"
          })
        }));
        
        this.ratingSeries.data.processor = am5.DataProcessor.new(root, {
          dateFields: ["review_date"],
          dateFormat: "yyyy-MM-dd"
        });
        
        this.averageSeries = this.chart.series.push(am5xy.LineSeries.new(root, {
          xAxis: this.xAxis,
          yAxis: averageAxis,
          valueYField: "avg",
          valueXField: "review_date",
          tooltip:am5.Tooltip.new(root, {
            labelText:"Average: {valueY.formatNumber('#.00')}/5"
          })  
        }));
        
        this.averageSeries.strokes.template.setAll({ strokeWidth: 2 });
        
        // Add circle bullet
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
        this.averageSeries.bullets.push(function() {
          var graphics = am5.Circle.new(root, {
            strokeWidth: 2,
            radius: 3,
            stroke: this.averageSeries.get("stroke"),
            fill: root.interfaceColors.get("background"),
          });
        
          return am5.Bullet.new(root, {
            sprite: graphics
          });
        });
        
        
        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        this.chart.set("cursor", am5xy.XYCursor.new(root, {
          xAxis: this.xAxis,
          yAxis: ratingAxis
        }));
        this.chart.appear(1000, 100);
}

function setTimeData(data){
    this.ratingSeries.data.setAll(data);
    this.averageSeries.data.setAll(data);
    this.xAxis.data.setAll(data);
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    this.ratingSeries.appear(500);
}

document.addEventListener("DOMContentLoaded", function() {
  var e = document.getElementById("cuisine-selector");
  e.onchange = onChange;
  e.selectedIndex = 0;

  console.log("here^")
});



am5.ready(function() {
    setTimeChart();
    
    const emtpyTimedata = [
        {"review_date":"2022-01-28","count":0,"avg":0},
        {"review_date":"2022-02-28","count":0,"avg":0},
        {"review_date":"2022-03-28","count":0,"avg":0},
        {"review_date":"2022-04-28","count":0,"avg":0},
        {"review_date":"2022-05-28","count":0,"avg":0},
        {"review_date":"2022-06-28","count":0,"avg":0},
        {"review_date":"2022-07-28","count":0,"avg":0},
        {"review_date":"2022-08-28","count":0,"avg":0},
        {"review_date":"2022-09-28","count":0,"avg":0},
        {"review_date":"2022-10-28","count":0,"avg":0},
        {"review_date":"2022-11-28","count":0,"avg":0},
        {"review_date":"2022-12-28","count":0,"avg":0},
        
    ];

    setTimeData(emtpyTimedata);

    setPieChart1();
    setPieChart2();

    console.log("here")


    const pieData = [
      {
        category:  "35-49",
        value: 14316
      }
  ];

      

    setPieChart1Data(pieData);
    setPieChart2Data(pieData);




}); // end am5.ready()


function setPieChart1(){
  var root = am5.Root.new("piechart1");
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      endAngle: 270
    })
  );
  this.pieSeries1 = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      endAngle: 270
    })
  );
  this.pieSeries1.states.create("hidden", {
    endAngle: -90
  });
}

function setPieChart1Data(data){
  console.log(data)
  this.pieSeries1.data.setAll(data);
  this.pieSeries1.appear(1000, 100);
}

function setPieChart2(){
  var root = am5.Root.new("piechart2");
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  var chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      endAngle: 270
    })
  );
  this.pieSeries2 = chart.series.push(
    am5percent.PieSeries.new(root, {
      valueField: "value",
      categoryField: "category",
      endAngle: 270
    })
  );
  this.pieSeries2.states.create("hidden", {
    endAngle: -90
  });
}

function setPieChart2Data(data){
  this.pieSeries2.data.setAll(data);
  this.pieSeries2.appear(1000, 100);
}