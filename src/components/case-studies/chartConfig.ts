// Unified chart styling configuration
export const chartColors = {
  primary: 'hsl(var(--chart-primary))',
  success: 'hsl(var(--chart-success))',
  warning: 'hsl(var(--chart-warning))',
  error: 'hsl(var(--chart-error))',
  info: 'hsl(var(--chart-info))',
  neutral: 'hsl(var(--muted-foreground))',
};

export const chartConfig = {
  primary: {
    label: 'Primary',
    color: chartColors.primary,
  },
  success: {
    label: 'Success',
    color: chartColors.success,
  },
  warning: {
    label: 'Warning',
    color: chartColors.warning,
  },
  error: {
    label: 'Error',
    color: chartColors.error,
  },
  info: {
    label: 'Info',
    color: chartColors.info,
  },
};
