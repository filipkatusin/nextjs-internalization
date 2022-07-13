import { FilterType } from "@/lib/interfaces";

type Props = {
  data: {
    title: string;
    title_type: {
      title: string;
      filter_type: FilterType;
    }[];
  };
};

export default function FilterSection({ data }: Props) {
  return (
    <div>
      <h6 className={"font-bold text-xl text-2xl md:text-lg mb-1"}>
        {data?.title}
      </h6>
      <ul className={"space-y-1"}>
        {data?.title_type?.map((item, index) => (
          <li key={index}>
            <label
              htmlFor={`${item?.filter_type}_${item?.title}`}
              className={
                "w-full max-w-[250px] xl:max-w-none md:w-full flex justify-between text-lg md:text-base cursor-pointer hover:text-red transition-all"
              }
            >
              {item?.title}

              <input
                type="checkbox"
                id={`${item?.filter_type}_${item?.title}`}
                className={"accent-red cursor-pointer"}
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
