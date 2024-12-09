import { CustomNodeType } from "../../constants/constants";
import { TextMessageData } from "../nodes";

type TextMessageNodePropertiesProps = Readonly<{
  id: string;
  type: CustomNodeType;
  data: TextMessageData;
  updateData: (data: Partial<TextMessageData>) => void;
}>;

const TextMessageNodePanel = ({
  data,
  updateData,
  id,
}: TextMessageNodePropertiesProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col">
        <div className="text-xs font-semibold">
          Unique Identifier
        </div>

        <div className="mt-2 flex">
          <input
            type="text"
            value={id}
            readOnly
            className="h-8 w-full border rounded-md px-2.5 text-sm font-medium shadow-sm outline-none transition read-only:text-black/80 read-only:opacity-80 read-only:hover:bg-gray-400/30"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-xs font-semibold">Message</div>

        <div className="mt-2 flex">
          <textarea
            value={data.message}
            onChange={(e) => updateData({ message: e.target.value })}
            placeholder="Type your message here..."
            className="min-h-30 w-full resize-none border rounded-md px-2.5 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default TextMessageNodePanel;
