import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ForgotpwPage from "./pages/ForgotpwPage";
import Workspace from "./pages/Workspace";
//import Workspace from "./pages/TestWorkspace";
import FormCreation from "./pages/FormCreation";
//import Distributionpage from "./pages/DistributionPage";
import Distribution from "./components/Distribution";
import Answer from "./pages/FormAnswer";
import ShowAnswer from "./pages/FormAnswerShow";
import { RecoilRoot } from "recoil";
import MemberPage from "./pages/MemberPage";
import SandBoxPage from "./pages/SandBoxPage";
import FormResult from "./pages/FormResult";
import DnDFlow from "./components/Form/DnDFlow";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotpwPage />} />
        {/* <Route path="/workspace" exact element={<Workspace />} /> */}
        <Route path="/workspace/cbox/:boxId" element={<Workspace />} />
        <Route path="/workspace/abox/:boxId" element={<Workspace />} />
        <Route path="/mypage" element={<MemberPage />} />
        <Route path="/create/:cboxId" element={<FormCreation />} />
        <Route path="/create/:cboxId/:enqId" element={<FormCreation />} />
        <Route path="/distribution" element={<Distribution />} />
        <Route path="/answer/:url" element={<Answer />} />
        <Route path="/showanswer/:aboxId/:ansId" element={<ShowAnswer />} />
        <Route path="/sandbox" element={<SandBoxPage />} />
        <Route path="/result/:enqId" element={<FormResult />} />
        <Route path="/flow" element={<DnDFlow />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </RecoilRoot>
  );
}
export default App;
