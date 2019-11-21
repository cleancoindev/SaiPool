async function getData() {
  //await the response of the fetch call
  let response = await fetch("https://api.instadapp.io/mcd/sai-balance");
  let obj = await response.json();
  const data = obj.data;

  // Convert data in accordance to highcharts
  var newData = [];
  for (let keys in data) {
    newData.push([Number(keys), data[keys]]);
  }

  Highcharts.chart("container", {
    chart: {
      height: (9 / 20) * 100 + "%" // 20:9 ratio, Change height
    },
    title: {
      margin: 40,
      text: "Sai Balance In Migration Contract",
      style: {
        fontSize: "25px"
      }
    },
    yAxis: {
      title: {
        text: "Sai Balance",
        margin: 20,
        style: {
          fontSize: "18px",
          color: "#1e272e"
        }
      },
      max: 600000,
      min: 0
    },
    xAxis: {
      title: {
        text: "Block Number",
        margin: 20,
        style: {
          fontSize: "18px",
          color: "#1e272e"
        }
      }
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
        showInLegend: false,
        label: {
          connectorAllowed: false
        },
        pointStart: 8957377,
        turboThreshold: 1000000000
      }
    },

    series: [
      {
        name: "",
        data: newData,
        type: "line"
      }
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  });
}

getData();
