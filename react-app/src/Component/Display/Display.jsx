


import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "chartjs-plugin-streaming"
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Display() {

    let [chart,setChart]=useState([]);
    let[sec,setSec]=useState(0)
    var label=[]
    for (let i=0;i<54;i++)
    {
      label.push(i)
    }
    
    
      setInterval(() => {
        setSec(sec+=1)
      }, 1000);

    function refreshPage() {
      window.location.reload(false);
    }
    async function getData(){
        let{data} =await axios("https://run.mocky.io/v3/b4cdd0d0-5e12-495d-b3e0-db648b8dbf22");
        setChart(data.temp);
        console.log(data.temp)

    }
 
    useEffect(()=>
    {
      getData()
    },[sec])
    
    
    let y=0
    // console.log("chart", chart);
    var data = {
      labels: label.map((index) => index),
     
      // labels:setInterval(labels, 1000),
      datasets: [{
        label: `${label.length} Temperature Readings`,
        data: chart.map((temp)=> temp),
        // data:setInterval(function() {chart.map((temp)=> temp)}, 1000),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };
  
    var options = {
      maintainAspectRatio: false,
      // labels:setInterval(labels, 1000),
      // id:realtime,
      // animations: {
      //   enabled: true,
      //   easing: 'linear',
      //   dynamicAnimation: {
      //     speed: 1000
      //   }},
      //   zoom: {
      //     enabled: false
      //   },

        // scales: {
        //   xAxes: [
        //     {
        //       labels:setInterval(labels, 1000),
              // type: "realtime",
              // realtime: {
              //   onRefresh: function() {
              //     data.datasets[0].data.push({
              //       x: Date.now(),
              //       y: chart.map((temp)=>temp)
              //     });
              //   },
              //   delay: 2000
              // }
        //     }
        //   ]
        // },
      // stroke:{curve:'smooth'},

      legend: {
        labels: {
          fontSize: 25,
        },
      },
    }
  //   setInterval(function(){
  //     data.labels.push(Math.floor(Math.random() * 100));
  //     data.datasets[0].data.push(Math.floor(Math.random() * 100));
  //     data.update();
  // }, 5000);
  return (
    <>
    <div>
    <Line
      data={data}
      height={400}
      options={options}

    />
  </div>
  <button className='btn btn-primary mt-5'  onClick={()=>refreshPage()}>Update Data</button>
  <p>{sec}</p>
  </>
  )
}
