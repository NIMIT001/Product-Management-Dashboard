import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { Product } from '@/types/product';
import { calculateCategoryDistribution } from '@/utils/analytics';

interface CategoryDistributionChartProps {
  products: Product[];
}

const CHART_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#ef4444', // red
  '#06b6d4', // cyan
  '#f97316', // orange
  '#6366f1', // indigo
  '#14b8a6', // teal
];

export default function CategoryDistributionChart({
  products,
}: CategoryDistributionChartProps) {
  const distribution = useMemo(
    () => calculateCategoryDistribution(products),
    [products]
  );

  const chartData = useMemo(() => {
    return {
      series: distribution.map((item) => item.count),
      labels: distribution.map((item) => item.category),
      colors: CHART_COLORS.slice(0, distribution.length),
    };
  }, [distribution]);

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: 'donut' as const,
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
      },
      labels: chartData.labels,
      colors: chartData.colors,
      legend: {
        position: 'right' as const,
        fontSize: '14px',
        fontFamily: 'inherit',
        fontWeight: 500,
        labels: {
          colors: 'var(--foreground)',
        },
        markers: {
          size: 6,
        },
        formatter: (seriesName: string, opts: any) => {
          const percentage = distribution[opts.seriesIndex]?.percentage || 0;
          return `${seriesName}: ${percentage}%`;
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(1)}%`,
        style: {
          fontSize: '12px',
          fontFamily: 'inherit',
          fontWeight: 600,
          colors: ['#fff'],
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontFamily: 'inherit',
                fontWeight: 600,
                color: 'var(--foreground)',
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: 'inherit',
                fontWeight: 700,
                color: 'var(--foreground)',
                offsetY: 10,
              },
              total: {
                show: true,
                label: 'Total',
                fontSize: '14px',
                fontFamily: 'inherit',
                fontWeight: 600,
                color: 'var(--muted-foreground)',
                formatter: () => {
                  const total = distribution.reduce((sum, item) => sum + item.count, 0);
                  return `${total}`;
                },
              },
            },
          },
        },
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: (_val: number, { seriesIndex }: any) => {
            const item = distribution[seriesIndex];
            return `${item.count} products (${item.percentage}%)`;
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            legend: {
              position: 'bottom' as const,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '55%',
                },
              },
            },
          },
        },
      ],
    }),
    [distribution, chartData]
  );

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No products to display
      </div>
    );
  }

  return (
    <div className="w-full">
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
}

