import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import useFlowValidator from "../hooks/useFlowValidator";
import { toast } from "react-toastify";

const Header = () => {
  // ValidateFlow for validating the current flow of chatbot
  const [validateFlow] = useFlowValidator((isValid) => {
    if (isValid) toast.success("Flow is valid");
    else toast.error("Cannot Save Flow it is invalid");
  });

  return (
    <div className="h-12 bg-white border border-b-gray-200 px-5 py-2 flex justify-between">
      <h1 className="">Chatbot flow builder</h1>
      <button
        onClick={validateFlow}
        className="h-full outline-none flex text-blue-500 items-center justify-center gap-x-2 border border-blue-500 rounded-lg text-sm transition hover:bg-blue-400/15 px-3 mr-5"
      >
        <CheckBadgeIcon className="w-5 h-5" />
        Save Changes
      </button>
    </div>
  );
};

export default Header;
