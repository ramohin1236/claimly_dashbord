import JoditEditor from "jodit-react";
import dashboardIcon from "../../public/Group (4).svg";
import { useRef, useState } from "react";
export default function TermsConditions() {
     const editor = useRef(null);
      const [content, setContent] = useState("");
        const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 650,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-10">
                <div className="flex gap-2">
                    <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
                    <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Terms & Conditions</h1>
                </div>

            </div>

             <div>
                <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        // onChange={newContent => { }}
      />
             </div>

        </div>
    );
}
