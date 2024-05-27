import Chart from "react-apexcharts";

const LineChart = () => {
  let options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      background: "#F7F7F7"
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Taxes",
      align: "left",
      style: {
        fontFamily: "Poppins",
        fontWeight: "bold"
      }
    },
    grid: {
      xaxis: {
        lines: {
            show: true
        }
    },   
    yaxis: {
        lines: {
            show: true
        }
    },  
      row: {
        colors: ["transparent"],
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
        "Oct",
        "Nov",
        "Dec"
      ],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [ '#845ED7', '#6B8AEB'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    }
  };

  let series = [
    {
      name: "",
      data: [10, 18, 10, 2, 0, 10, 40, 30, 60, 30, 35, 45],
    },
  ];

  return (
    <div className="w-full h-full col-span-full rounded-xl shadow bg-gray-100 border p-4">
      <Chart options={options} height={320} series={series} type="line" />
    </div>
  );
};

export default LineChart;
