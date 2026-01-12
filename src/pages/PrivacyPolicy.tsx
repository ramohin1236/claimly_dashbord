import JoditEditor from "jodit-react";
import dashboardIcon from "../../public/Group (4).svg";
import { useRef, useState } from "react";
import { useCreatePrivacyPolicyMutation } from "../store/api/webApi";
import { toast } from "sonner";


export default function PrivacyPolicy() {

  const [createPrivacyPolicy, { isLoading }] = useCreatePrivacyPolicyMutation()

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


  const onSubmit = async () => {
    try {
      const response = await createPrivacyPolicy(content);
      if (response.data.success) {
        toast.success(response.data.message)
      }
      console.log(response)
    } catch (error: any) {
      toast.error(error.data.message)
      console.error(error);
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between mb-10">
        <div className="flex gap-2">
          <img src={dashboardIcon} alt="dashboard" className="w-4 h-4" />
          <h1 className="text-sm text-[#1E293B]/80 m-0 leading-none">Privacy Policy</h1>
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

      <div className="mt-5 flex justify-center">
        <button className="bg-[#2563eb] cursor-pointer hover:bg-[#1d4ed8] py-3.5 px-4.5 rounded text-white!" onClick={onSubmit}>
          {isLoading ? 'Saving...' : 'Save & change'}
        </button>
      </div>

    </div>
  );
}
