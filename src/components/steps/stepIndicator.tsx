interface StepIndicatorProps {
  title: string;
  className?: string;
}

export default function StepIndicator(props: StepIndicatorProps) {
  const { title } = props;
  return <div className={"p-4 text-center " + props.className}>{title}</div>;
}
