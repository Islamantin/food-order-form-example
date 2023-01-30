interface ButtonProps {
  label: string;
  clickCallBack: () => void;
  disabled: boolean;
  className?: string;
}

export default function Button(props: ButtonProps) {
  const { label, clickCallBack, disabled, className } = props;
  const styles = className ? className : "";
  return (
    <button
      type="button"
      className={"rounded-lg shadow-md p-4 bg-white w-36 " + styles}
      onClick={clickCallBack}
      disabled = {disabled}
    >
      {label}
    </button>
  );
}
