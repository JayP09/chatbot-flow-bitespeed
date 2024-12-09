import Header from "./components/Header";
import MainSection from "./components/MainSection";
import { ReactFlowProvider } from "@xyflow/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "@xyflow/react/dist/style.css";
import { SelectionProvider } from "./context/SelectionContext";

export default function App() {
  return (
    <SelectionProvider>
      <ReactFlowProvider>
        <div className="h-screen w-screen overflow-hidden flex flex-col">
          <Header />
          <MainSection />
          <ToastContainer position="bottom-center" />
        </div>
      </ReactFlowProvider>
    </SelectionProvider>
  );
}
