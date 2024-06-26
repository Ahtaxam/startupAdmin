import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteLead, getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import { fetchData } from "../../utils/apiRequests";

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const [users, setUsers] = useState([])
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const result = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/v1/users/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await result.json();
      setUsers(data?.data)
    })();
  }, []);


  const deleteCurrentLead = (id) => {}

  return (
    <>
      <TitleCard title="Current Users" topMargin="mt-2">
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={user.profileImage} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          {/* <div className="font-bold">{l.first_name}</div> */}
                          <div className="text-sm opacity-50">
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentLead(k)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
