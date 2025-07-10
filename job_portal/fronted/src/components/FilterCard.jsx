import React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-950 border border-white/10 text-white p-6 rounded-2xl shadow-2xl ">
      <h1 className="text-2xl font-bold text-sky-500 mb-6">Filter Jobs</h1>

      {filterData.map((data, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-lg font-bold mb-3">{data.filterType}</h2>
          <RadioGroup.Root className="flex flex-col gap-2">
            {data.array.map((item, index) => (
              <RadioGroup.Item
                key={index}
                value={item}
                className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/10 bg-slate-700 text-white hover:bg-sky-600 hover:shadow-xl transition-all focus:outline-none data-[state=checked]:bg-sky-500 data-[state=checked]:text-white data-[state=checked]:shadow-lg"
              >
                <span className="w-3 h-3 rounded-full border border-white bg-white data-[state=checked]:bg-sky-300"></span>
                {item}
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
