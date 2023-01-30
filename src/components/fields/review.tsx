
// has no input props
interface ReviewProps {
  data: any;
  getFieldTitle: (fieldName: string) => string;
  arrayElementPresentation: (val: any, key: string) => JSX.Element;
  labelText?: string;
}

// simple data presentation component
export default function Review(props: ReviewProps) {
  const { data, getFieldTitle, arrayElementPresentation, labelText } = props;
  return (
    <div className="border-2 p-4 rounded-lg mb-4">
      {labelText && <p className="w-full mb-3 text-lg">{labelText}</p>}
      <div className=" rounded-lg">
        <table className="w-full">
          <tbody className=" align-text-top">
            {Object.keys(data).map((k, ind) => (
              <tr
                className={ind % 2 == 0 ? " bg-slate-300" : "bg-slate-200"}
                key={"review-field-" + ind}
              >
                <td>
                  <div className="p-2">{getFieldTitle(k)}</div>
                </td>
                <td>
                  {Array.isArray(data[k]) ? (
                    data[k].map((x: any, ind: number) =>
                      arrayElementPresentation(x, "array-element-" + ind)
                    )
                  ) : (
                    <div className="p-2">{data[k]}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
