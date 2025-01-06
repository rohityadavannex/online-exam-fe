import Chart from "react-apexcharts";

const LineChart = () => {
  const options = {
    chart: {
      //   height: 350,
      //   height: 200,
      // width: "100%",
      // height: 380,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // This hides the toolbar and the hamburger menu
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Product Trends by Month",
    //   align: "left",
    // },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 110],
    },
  ];

  return <Chart options={options} series={series} />;
};

export default LineChart;
