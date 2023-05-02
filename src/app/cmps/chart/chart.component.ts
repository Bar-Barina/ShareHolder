import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartData } from 'src/app/models/chart-data.model';
import zoomPlugin from 'chartjs-plugin-zoom';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() chartData!: ChartData | null;

  ngOnInit(): void {
    const chart = document.getElementById('chart');
    console.log(this.chartData);
    new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.chartData?.values.map((value) =>
          new Date(value.x * 1000).toDateString()
        ),
        datasets: [
          {
            label: this.chartData?.description,
            data: this.chartData?.values.map((value) => value.y),
            borderWidth: 2,
            borderColor: '#fcc125',
            backgroundColor: '#fcc125',
            hoverBackgroundColor: '#fcc125',
            hoverBorderColor: '#fcc125',
          },
        ],
      },
      options: {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              drag: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: 'xy',
            },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    Chart.register(zoomPlugin);
  }
}
