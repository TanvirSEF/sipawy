import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Tabledata from "./Tabledata";
import { Link } from "react-router-dom";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";

const Addtable = () => {
  const {
    register: registerTable,
    handleSubmit: handleSubmitTable,
    setValue: tablevalueset,
    reset,
    formState: { errors },
  } = useForm();

  const Axios = useAxios();
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const queryClient = useQueryClient();
  const addTableMutation = useMutation({
    mutationFn: async (data) => {
      return await Axios.post("/api/dashboard/bar/table/store", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast.success("Table added!");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["/api/dashboard/bar/table/index"],
      });
    },
    onError: (error) => {
      console.error("Add table error:", error);
      toast.error("Failed to add table.");
    },
  });

  const handleAddTable = (data, event) => {
    event.preventDefault();
    addTableMutation.mutate(data);
  };
  const { data: stafflist } = useFetchData(
    "/api/dashboard/bar/staff/index",
    token
  );
  console.log(stafflist);

  return (
    <div>
      <section className="px-6 sm:px-10 overflow-hidden py-16">
        <div className="sm:flex justify-between items-center text-center">
          <h2 className="text-xl font-semibold mb-6">Add table</h2>
          <Link to="/bar-dashboard/inventory">
            <h2 className="text-xl font-semibold mb-6 border-2 border-[#DBA514] p-2 rounded-[6px] cursor-pointer">
              + Add Product
            </h2>
          </Link>
        </div>

        <form
          onSubmit={handleSubmitTable(handleAddTable)}
          className="p-6 py-10 space-y-8 bg-[#FAFAFA] border border-[#DBA514] rounded-[6px] mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Table Number */}
            <div>
              <Label
                htmlFor="name"
                className="block mb-2 text-[#353B48] font-medium md:text-base"
              >
                Table Name
              </Label>
              <Input
                id="name"
                {...registerTable("table_name", {
                  required: "Table number is required",
                })}
                className={`w-full h-[56px] bg-white ${
                  errors.table_name ? "border border-red-500" : ""
                }`}
              />
              {errors.table_name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.table_name.message}
                </span>
              )}
            </div>

            {/* Assigned by */}
            <div>
              <Label className="block mb-2 font-medium text-[#353B48] md:text-base">
                Assigned by
              </Label>

              <Select
                onValueChange={(value) => {
                  tablevalueset("added_by", value, { shouldValidate: true });
                }}
              >
                <SelectTrigger
                  className={`w-full h-[56px] bg-white ${
                    errors.added_by ? "border border-red-500" : ""
                  }`}
                >
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {stafflist?.data?.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input
                type="hidden"
                {...registerTable("added_by", {
                  required: "Assigned by is required",
                })}
              />

              {errors.added_by && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.added_by.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              disabled={addTableMutation.isPending}
              type="submit"
              className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer"
            >
              Add Table
            </button>
          </div>
        </form>
      </section>
      <section>
        <Tabledata />
      </section>
    </div>
  );
};

export default Addtable;
