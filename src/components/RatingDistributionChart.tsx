import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { Product } from '@/types/product';
import { calculateRatingDistribution } from '@/utils/analytics';

interface RatingDistributionChartProps {
  products: Product[];
}

const CHART_COLORS = [
  '#10b981', // emerald (high ratings)
  '#22c55e', // green
  '#eab308', // yellow
  '#f59e0b', // amber
  '#ef4444', // red (low ratings)
];

export default function RatingDistributionChart({
  products,
}: RatingDistributionChartProps) {
  const distribution = useMemo(
    () => calculateRatingDistribution(products),
    [products]
  );

  const chartData = useMemo(() => {
    return {
      series: [
        {
          name: 'Products',
          data: distribution.map((item) => item.count),
        },
      ],
      categories: distribution.map((item) => item.range),
    };
  }, [distribution]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: 'bar' as const,
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          dataLabels: {
            position: 'top' as const,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: chartData.categories,
        labels: {
          style: {
            colors: 'var(--muted-foreground)',
            fontSize: '12px',
            fontFamily: 'inherit',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: 'var(--muted-foreground)',
            fontSize: '12px',
            fontFamily: 'inherit',
          },
        },
      },
      colors: [CHART_COLORS[0]],
      tooltip: {
        theme: 'light',
        y: {
          formatter: (val: number, { dataPointIndex }: any) => {
            const item = distribution[dataPointIndex];
            return `${val} products (${item.percentage}%)`;
          },
        },
      },
      grid: {
        borderColor: 'var(--border)',
        strokeDashArray: 4,
      },
    }),
    [distribution, chartData]
  );

  if (products.length === 0 || distribution.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No rating data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </div>
  );
}

