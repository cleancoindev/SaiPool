var result;
var chart;

// Fetching and converting current Sai Balance in Migration Contract
async function currentSaiBalance() {
  let currentSaiStatus = await fetch("https://api.instadapp.io/mcd/current-sai-balance");
  let resObj = await currentSaiStatus.json();
  var currentSaiInMigration = resObj.data.toFixed(2);

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  result = numberWithCommas(currentSaiInMigration);
  return result;
}

// Fetches all the data and returns the chart
async function getData() {
  //await the response of the fetch call
  let response = await fetch("https://api.instadapp.io/mcd/sai-balance");
  let obj = await response.json();
  const data = obj.data;

  const final = await currentSaiBalance();
  // Convert data in accordance to highcharts
  var newData = [];
  for (let keys in data) {
    newData.push([Number(keys), data[keys]]);
  }

  chart = Highcharts.chart("container", {
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
    subtitle: {
      useHTML: true,
      text: ` 
      <div class="text-center">
      <p style="font-size: 30px; margin :0px;" >
              ${final}
              <br><p style="font-size: 15px;"> Current Sai Balance
      </p>
  </div>`,
      style: {
        fontSize: "13px",
        color: "#1e272e"
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

const updateCurrentSaiBalance = async () => {
  const result = await currentSaiBalance();
  let text = `<div class="text-center">
  <p style="font-size: 30px; margin :0px;" >
          ${result}
          <br><p style="font-size: 15px;"> Current Sai Balance
  </p>
</div>`;
  chart.setTitle(null, {text});
};

setInterval(updateCurrentSaiBalance, 15000);
