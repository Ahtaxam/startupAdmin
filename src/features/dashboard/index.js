import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";

import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useState } from "react";
import { apiRequests, fetchData } from "../../utils/apiRequests";
import { Button } from "flowbite-react";
import { CustomModal } from "../../components/Modal/Modal";
import CreateModerator from "./CreateModerator";

const statsData = [
  {
    title: "New Users",
    value: "34.7k",
    icon: <UserGroupIcon className="w-8 h-8" />,
    description: "↗︎ 2300 (22%)",
  },
  {
    title: "Total Sales",
    value: "$34,545",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "Current month",
  },
  {
    title: "Pending Leads",
    value: "450",
    icon: <CircleStackIcon className="w-8 h-8" />,
    description: "50 in hot leads",
  },
  {
    title: "Active Users",
    value: "5.6k",
    icon: <UsersIcon className="w-8 h-8" />,
    description: "↙ 300 (18%)",
  },
];

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))

  // const students = fetchData(process.env.REACT_APP_BASE_URL+"/api/v1/students/all");
  // const softwareHouse = fetchData(process.env.REACT_APP_BASE_URL+"/api/v1/softwarehouse/all")
  // const investors = fetchData(process.env.REACT_APP_BASE_URL+"/api/v1/investor/all")

  // console.log(students, softwareHouse, investors);

  return (
    <>
      <CustomModal openModal={openModal} setOpenModal={setOpenModal}>
        <CreateModerator closeModal={() => setOpenModal(false)} />
      </CustomModal>
      <div className="">
        <p className="text-center text-4xl">Dashboard Home</p> <br />
       {user.role === "Admin"  && <Button gradientMonochrome="purple" onClick={() => setOpenModal(true)}>
          Create Moderator
        </Button>}
      </div>
    </>
  );
}

export default Dashboard;
