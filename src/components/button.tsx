interface ButtonProps {
  label: string;
  clickCallBack: () => void;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { label, clickCallBack, className } = props;
  const styles = className ? className : "";
  return (
    <button
      type="button"
      className={"rounded-lg shadow-md p-4 bg-white w-36 " + styles}
      onClick={clickCallBack}
    >
      {label}
    </button>
  );
}
