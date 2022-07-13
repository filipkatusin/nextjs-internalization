import { FilterType } from "@/lib/interfaces";
import { Field } from "formik";

type Props = {
  data: {
    title: string;
    title_type: {
      title: string;
      filter_type: FilterType;
    }[];
  };
  name: string;
};

export default function FilterSection({ data, name }: Props) {
  return (
    <div>
      <h6 className={"font-bold text-2xl text-2xl md:text-lg mb-1"}>
        {data?.title}
      </h6>
      <ul>
        <div
          role="group"
          aria-labelledby="checkbox-group"
          className={"space-y-1 md:space-y-0"}
        >
          {data?.title_type?.map((item, index) => (
            <li key={index}>
              <label
                htmlFor={`${item?.filter_type}_${item?.title}`}
                className={
                  "w-full max-w-[250px] xl:max-w-none md:w-full flex justify-between text-xl md:text-base cursor-pointer hover:text-red transition-all"
                }
              >
                {item?.title}

                <Field
                  type="checkbox"
                  id={`${item?.filter_type}_${item?.title}`}
                  className={"accent-red cursor-pointer"}
                  name={name}
                  value={item?.title}
                />
              </label>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
