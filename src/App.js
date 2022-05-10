import { Routes, Route } from "react-router-dom";
import AdminLogin from './components/admin/Login';
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/admin/" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route exact path="/" element={<DashBoard />} />
      <Route exact path="/home" element={<DashBoard />} />
      <Route exact path="/devices" element={<DashBoard />} />
      <Route path="/devices/:deviceId" element={<DashBoard />} />
      <Route path="/devices/:deviceId/:tab" element={<DashBoard />} />
      <Route exact path="/channels" element={<DashBoard />} />
      <Route path="/channels/:channelId" element={<DashBoard />} />
      <Route path="/channels/:channelId/:tab" element={<DashBoard />} />
      <Route exact path="/users" element={<DashBoard />} />
      <Route path="/users/:userId" element={<DashBoard />} />
      <Route path="/users/:userId/:tab" element={<DashBoard />} />
      <Route exact path="/groups" element={<DashBoard />} />
      <Route path="/groups/:groupId" element={<DashBoard />} />
      <Route path="/groups/:groupId/:tab" element={<DashBoard />} />
      <Route exact path="/account" element={<DashBoard />} />
      <Route exact path="/settings" element={<DashBoard />} />
      <Route exact path="/manage" element={<DashBoard />} />
      <Route exact path="/map" element={<DashBoard />} />
      <Route exact path="/monitors" element={<DashBoard />} />
      <Route path="/monitors/:monitorId" element={<DashBoard />} />
      <Route path="/monitors/:monitorId/:tab" element={<DashBoard />} />
      <Route exact path="/elder-caring" element={<DashBoard />} />
      <Route path="/elder-caring/:elderId" element={<DashBoard />} />
      <Route path="/elder-caring/:elderId/:tab" element={<DashBoard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}