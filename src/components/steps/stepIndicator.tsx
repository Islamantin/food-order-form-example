interface StepIndicatorProps {
  stepNumber: number;
}

export default function StepIndicator(props: StepIndicatorProps) {
  const { stepNumber } = props;
  return <div className="p-4 m-2 w-20 rounded-lg shadow-md bg-white text-center">{stepNumber}</div>;
}
