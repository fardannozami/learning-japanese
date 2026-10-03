import { BookOpenCheck } from "lucide-react";

export function Memory({ blocks }) {
  return (
    <>
      {blocks.map((block, bi) => (
        <section
          key={bi}
          className="rounded-[16px] bg-white border border-[#3949AB]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-5 md:p-6 max-w-full overflow-hidden"
        >
          <h3 className="pop flex items-center gap-2 text-[15px] font-bold">
            <span className="w-7 h-7 rounded-full bg-[#FFF3E0] grid place-items-center text-[#FF6F00]">
              <BookOpenCheck size={16} />
            </span>
            {block.title}
          </h3>
          {block.type === "cards" && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {block.data.map((card, ci) => (
                <div
                  key={ci}
                  className="rounded-[14px] border border-[#3949AB]/10 bg-[#FAFAFF] p-4 flex gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="text-[22px] leading-none">{card.icon}</div>
                  <div>
                    <div className="text-[13px] font-bold">{card.name}</div>
                    <div className="text-[12px] text-[#3949AB]/70 leading-[1.4] mt-0.5">
                      {card.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {block.type === "table" && (
            <div className="mt-4 overflow-hidden rounded-[12px] border border-[#3949AB]/10 max-w-full">
              <div className="overflow-x-auto max-w-full">
                <table className="w-full min-w-[420px] text-[12px] md:text-[13px]">
                  <thead>
                    <tr className="bg-[#3949AB] text-white">
                      {block.data.headers.map((h, hi) => (
                        <th
                          key={hi}
                          className="text-left font-semibold px-3 py-2.5 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.data.rows.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-[#F5F6FD]"}>
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-3 py-2.5 border-t border-[#3949AB]/10 align-top leading-[1.4]"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      ))}
    </>
  );
}
