import Chart from "react-apexcharts";

const LineChart = () => {
  let options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Tax",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], 
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

  let series = [
    {
      name: "",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  return (
    <div className="w-full h-full col-span-3 rounded-xl bg-gray-200 p-4">
      <Chart options={options} height={320} series={series} type="line" />
    </div>
  );
};

export default LineChart;
