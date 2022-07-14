// import Layout from "@/components/Layout";
// import { getMyCardPage } from "@/lib/api";
// import { Tab, RadioGroup } from "@headlessui/react";
// import { MyCard } from "@/lib/interfaces";
// import { useState } from "react";
// import { set } from "immer/dist/utils/common";
// import { getStrapiUrl } from "@/lib/get-strapi-url";
// import Image from "next/image";
//
// interface Props {
//   data: MyCard;
// }
//
// export default function MyCardPage({ data }: Props) {
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const [plan, setPlan] = useState(
//     data?.cardsAmounts?.cardAmountOption[0]?.amount
//   );
//   const [design, setDesign] = useState(data?.design?.design_option[0]?.title);
//
//   console.log(data);
//
//   return (
//     <Layout title={data.title}>
//       <Tab.Group selectedIndex={activeIndex} onChange={setActiveIndex}>
//         <Tab.List className={"flex flex-col"}>
//           {data?.title_content?.map((item, index) => (
//             <Tab
//               key={index}
//               className={({ selected }) =>
//                 `py-2 ${
//                   selected ? "bg-red" : "hover:bg-gray-footer"
//                 } outline-none`
//               }
//             >
//               {`${index + 1} ${item.title}`}
//             </Tab>
//           ))}
//         </Tab.List>
//         <Tab.Panels>
//           {/* 1. page of form */}
//           <Tab.Panel>
//             <article
//               className={"leading-relaxed"}
//               dangerouslySetInnerHTML={{
//                 __html: data?.title_content[0]?.content,
//               }}
//             />
//             <RadioGroup value={plan} onChange={setPlan}>
//               <RadioGroup.Label className={"font-bold text-xl mb-4"}>
//                 {data?.cardsAmounts?.title}
//               </RadioGroup.Label>
//
//               {data?.cardsAmounts?.cardAmountOption?.map((option, index) => (
//                 <RadioGroup.Option value={option.amount} key={index}>
//                   {({ checked }) => (
//                     <div
//                       className={`p-4 cursor-pointer ${
//                         checked ? "bg-blue" : "hover:bg-gray-footer"
//                       }`}
//                     >
//                       <h3 className={"text-xl"}>{option?.amount}</h3>
//                       <h4 className={"text-base"}>{data?.card_amount_text}</h4>
//                       <ul>
//                         <li>
//                           {data?.cardsAmounts.cardAmountText[0]?.text} -{" "}
//                           {option.baseDesignPrice}
//                         </li>
//                         <li>
//                           {data?.cardsAmounts.cardAmountText[1]?.text} -{" "}
//                           {option.advancedDesignPrice}
//                         </li>
//                         <li>
//                           {data?.cardsAmounts.cardAmountText[2]?.text} -{" "}
//                           {option.customDesignPrice}
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </RadioGroup.Option>
//               ))}
//             </RadioGroup>
//             {data?.cardsAmounts?.additionalText && (
//               <article
//                 dangerouslySetInnerHTML={{
//                   __html: data?.cardsAmounts?.additionalText,
//                 }}
//               />
//             )}
//             {/*  design part */}
//             <RadioGroup value={design} onChange={setDesign}>
//               <RadioGroup.Label className={"font-bold text-xl mb-4"}>
//                 {data?.cardsAmounts?.title}
//               </RadioGroup.Label>
//
//               {data?.design?.design_option?.map((design, index) => (
//                 <RadioGroup.Option value={design.title} key={index}>
//                   {({ checked }) => (
//                     <div
//                       className={`p-4 cursor-pointer border-gray border-2 my-4 rounded ${
//                         checked ? "bg-blue" : "hover:bg-gray-footer"
//                       }`}
//                     >
//                       <h2 className={"text-base"}>{design.title}</h2>
//                       <ul className={"flex space-x-2"}>
//                         {design?.images?.data?.map((image, index) => (
//                           <li key={index} className="flex-1 h-[200px] relative">
//                             <Image
//                               src={getStrapiUrl(image?.attributes?.url)}
//                               layout={"fill"}
//                               objectFit="contain"
//                             />
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </RadioGroup.Option>
//               ))}
//             </RadioGroup>
//
//             {/* front side options */}
//             <fieldset>
//               <legend>{data?.card_front_side?.title}</legend>
//               {data?.card_front_side?.values?.map((value, index) => (
//                 <label
//                   htmlFor={`front_card_side_${value.text}`}
//                   className={`p-1 cursor-pointer my-2 flex`}
//                 >
//                   <input
//                     type={"checkbox"}
//                     key={index}
//                     id={`front_card_side_${value.text}`}
//                     className={"mr-2"}
//                   />
//                   <p>{value?.text}</p>
//                 </label>
//               ))}
//             </fieldset>
//
//             {/* back side options */}
//             <fieldset>
//               <legend>{data?.card_back_side?.title}</legend>
//               {data?.card_back_side?.values?.map((value, index) => (
//                 <label
//                   htmlFor={`back_card_side_${value.text}`}
//                   className={`p-1 cursor-pointer my-2 flex`}
//                 >
//                   <input
//                     type={"checkbox"}
//                     key={index}
//                     id={`back_card_side_${value.text}`}
//                     className={"mr-2"}
//                   />
//                   <p>{value?.text}</p>
//                 </label>
//               ))}
//             </fieldset>
//
//             <div className={"flex justify-end"}>
//               <button
//                 className={
//                   "text-red hover:text-white hover:bg-red transition-colors text-sm font-bold uppercase border-red border-2 px-2 py-1 rounded"
//                 }
//                 onClick={() => setActiveIndex(1)}
//               >
//                 {data?.next_step_button_text}
//               </button>
//             </div>
//           </Tab.Panel>
//
//           {/*<RadioGroup value={frontPage} onChange={setFrontPage}>*/}
//           {/*  <RadioGroup.Label className={"font-bold text-xl mb-4"}>*/}
//           {/*    {data?.card_front_side?.title}*/}
//           {/*  </RadioGroup.Label>*/}
//
//           {/*  {data?.card_front_side?.values?.map((value, index) => (*/}
//           {/*    <RadioGroup.Option value={value?.text} key={index}>*/}
//           {/*      {({ checked }) => (*/}
//           {/*        <div*/}
//           {/*          className={`p-1 cursor-pointer my-2 ${*/}
//           {/*            checked ? "bg-blue" : "hover:bg-gray-footer"*/}
//           {/*          }`}*/}
//           {/*        >*/}
//           {/*          <p>{value?.text}</p>*/}
//           {/*        </div>*/}
//           {/*      )}*/}
//           {/*    </RadioGroup.Option>*/}
//           {/*  ))}*/}
//           {/*</RadioGroup>*/}
//
//           {/* back side options */}
//           {/*<RadioGroup value={backPage} onChange={} as={"fieldset"}>*/}
//           {/*  <RadioGroup.Label className={"font-bold text-xl mb-4"}>*/}
//           {/*    {data?.card_back_side?.title}*/}
//           {/*  </RadioGroup.Label>*/}
//
//           {/*  {data?.card_back_side?.values?.map((value, index) => (*/}
//           {/*    <RadioGroup.Option value={value?.text} key={index}>*/}
//           {/*      {({ checked }) => (*/}
//           {/*        <div*/}
//           {/*          className={`p-1 cursor-pointer my-2 ${*/}
//           {/*            checked ? "bg-blue" : "hover:bg-gray-footer"*/}
//           {/*          }`}*/}
//           {/*        >*/}
//           {/*          <p>{value?.text}</p>*/}
//           {/*        </div>*/}
//           {/*      )}*/}
//           {/*    </RadioGroup.Option>*/}
//           {/*  ))}*/}
//           {/*</RadioGroup>*/}
//
//           {/* 2. page of form */}
//           <Tab.Panel>
//             <article
//               dangerouslySetInnerHTML={{
//                 __html: data.title_content[1].content,
//               }}
//             />
//           </Tab.Panel>
//         </Tab.Panels>
//       </Tab.Group>
//     </Layout>
//   );
// }
//
// export async function getStaticProps({ locale }) {
//   const data = (await getMyCardPage(locale)) || [];
//
//   return {
//     props: { data },
//   };
// }

export default function MojaKarticka() {
  return <div></div>;
}
