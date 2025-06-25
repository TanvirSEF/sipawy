import TextWithReadMore from "@/Components/CustomComponents/TextWithReadMore";
import SupportAccordion from "@/Components/CustomSection/SupportAccordion";
import useAxios from "@/Components/Hooks/Api/UseAxios";
import useFetchData from "@/Components/Hooks/Api/UseFetchData";
import NotifyBtn from "@/Components/ui/CustomUi/NotifyBtn";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const Axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("usertoken"));
  const token = userToken?.token;
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await Axios.post(
        `/api/account/delete`,
        {
          issue: data.issue,
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Account deactivation request sent.");
      reset();
      Navigate("/")
      localStorage.removeItem("usertoken");
    } catch (error) {
      console.error(error);
      toast.error("Failed to deactivate account.");
    } finally {
      setLoading(false);
    }
  };
  const { data } = useFetchData("/api/dashboard/settings/faq", token);
  console.log(data);


  return (
    <section className="pt-12 px-4 sm:px-10 pb-16">
      <div className="w-full max-w-[600px] md:mx-auto xl:mx-6">
        <h2 className="text-xl md:text-3xl font-semibold mb-6">Settings</h2>

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-medium tracking-[0.54px]">
            Notification
          </h3>
          <NotifyBtn height="h-5" />
        </div>

        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-medium tracking-[0.54px]">Messaging</h3>
          <NotifyBtn height="h-5" />
        </div>

        <div>
          <Accordion
            type="multiple"
            defaultValue={["item-4", "item-5"]}
            collapsible="true"
          >
            <AccordionItem value="item-2">
              <AccordionTrigger>Privacy policy</AccordionTrigger>
              <AccordionContent className="py-6 border border-[#C8C8C8] rounded-[4px] pl-6 pr-4 sm:pr-12">
                <TextWithReadMore wordLimit="170">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, modi excepturi laborum voluptate porro illo non ipsum ducimus esse sit aliquid doloribus, vel iure eius animi vero nemo, soluta natus libero ex cupiditate tempore maxime sunt officia? Et voluptatem itaque labore, deleniti voluptate hic quaerat, at perferendis vero nostrum dolore?
                </TextWithReadMore>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Terms & conditions</AccordionTrigger>
              <AccordionContent className="py-6 border border-[#C8C8C8] rounded-[4px] pl-6 pr-4 sm:pr-12">
                <TextWithReadMore wordLimit="220">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate illo a, explicabo aliquam in ipsam, recusandae optio nulla quam exercitationem nihil quidem laudantium. Non, perspiciatis deserunt? Voluptas, cumque? Maxime impedit minima tenetur dolorem omnis esse? Delectus dignissimos in iure at adipisci ducimus, nisi quisquam, quos sapiente repellat maxime, eius inventore.
                </TextWithReadMore>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Support & help</AccordionTrigger>
              <AccordionContent>
                <SupportAccordion />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
            <AccordionTrigger>Account deactivate</AccordionTrigger>
            <AccordionContent>
              <form
                className="mx-1 flex flex-col gap-5 items-center"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-full">
                  <Label
                    htmlFor="issue"
                    className="block mb-2 font-medium text-[#353B48]"
                  >
                    State your issue here
                  </Label>
                  <Input
                    id="issue"
                    className="w-full h-[56px] bg-white"
                    {...register("issue")}
                  />
                </div>

                <div className="w-full">
                  <Label
                    htmlFor="password"
                    className="block mb-2 font-medium text-[#353B48]"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="w-full h-[56px] bg-white"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="text-base sm:text-lg font-medium text-[#0E0E0E] cursor-pointer bg-gradient-to-r from-[#DBA514] via-[#EEB609] to-[#FCC201] py-3.5 px-7 rounded-[6px] w-full sm:w-[180px]"
                >
                  {loading ? "Processing..." : "Deactivate"}
                </button>
              </form>
            </AccordionContent>
          </AccordionItem>

          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default UserSettings;
