import TextWithReadMore from "@/Components/CustomComponents/TextWithReadMore";
import SupportAccordion from "@/Components/CustomSection/SupportAccordion";
import useAxios from "@/Components/Hooks/Api/UseAxios";
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

const BarSettings = () => {

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




  const features = [
    {
      title: "Advanced Dashboard",
      items: [
        "Gain full access to detailed analytics, sales trends, and customer insights.",
        "Monitor bar performance with real-time data.",
      ],
    },
    {
      title: "Customizable Marketing Tools",
      items: [
        "Create and manage targeted promotions and events.",
        "Automated email campaigns to keep customers coming back.",
      ],
    },
    {
      title: "Enhanced Menu Management",
      items: [
        "Add unlimited items with pricing, images, and descriptions.",
        "Highlight seasonal specials or featured drinks.",
      ],
    },
    {
      title: "Priority Placement",
      items: [
        "Get featured on our homepage and search results for higher visibility.",
        "Boost your bar’s exposure to new customers.",
      ],
    },
    {
      title: "Loyalty Program Integration",
      items: [
        "Launch and track loyalty rewards directly through the platform.",
        "Encourage repeat customers with personalized offers.",
      ],
    },
    {
      title: "Exclusive Event Management",
      items: [
        "Organize and promote your bar’s events seamlessly.",
        "Enable ticket sales and RSVPs online.",
      ],
    },
    {
      title: "Customer Support",
      items: [
        "24/7 premium support for all your queries and needs.",
        "Dedicated account manager to ensure success.",
      ],
    },
    {
      title: "Multi-Device Access",
      items: [
        "Manage your account and access insights from desktop, tablet, or mobile.",
      ],
    },
  ];

  return (
    <section className="pt-12 px-4 sm:px-10 pb-16">
      <div className="w-full max-w-[600px] md:mx-auto xl:mx-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-6">Settings</h2>

        {/* Notification */}
        <div className="flex justify-between items-center mb-5 flex-wrap gap-y-2">
          <h3 className="text-base sm:text-lg font-medium tracking-[0.54px]">
            Notification
          </h3>
          <NotifyBtn height="h-5" />
        </div>

        {/* Messaging */}
        <div className="flex justify-between items-center mb-5 flex-wrap gap-y-2">
          <h3 className="text-base sm:text-lg font-medium tracking-[0.54px]">
            Messaging
          </h3>
          <NotifyBtn height="h-5" />
        </div>

        {/* Accordion Section */}
        <Accordion
          type="multiple"
          defaultValue={["item-4", "item-5"]}
          collapsible="true"
        >
          {/* My Package */}
          <AccordionItem value="item-1">
            <AccordionTrigger>My Package</AccordionTrigger>
            <AccordionContent>
              <div className="sm:flex justify-between gap-4 sm:gap-5">
                <p className="bg-[#FAFAFA] py-4 px-6 text-lg sm:text-xl font-medium w-[390px] mb-2 sm:mb-0  rounded-[6px]">
                  Package: Premium
                </p>
                <button
                  type="button"
                  className="bg-[#1F1F1F] text-sm sm:text-lg font-medium text-white px-6 py-4 rounded-md cursor-pointer w-full sm:w-auto"
                  onClick={() => console.log("Add receipt")}
                >
                  Change plan
                </button>
              </div>

              <div className="divider w-full h-px bg-black my-6"></div>

              <div>
                <p className="font-semibold mb-5">What’s Included</p>
                <p className="mb-2">Best for personal team</p>
                <p className="mb-5 text-xl sm:text-2xl font-medium">
                  $90 /month
                </p>

                <div className="px-0 sm:px-6 space-y-6">
                  {features.map((feature, index) => (
                    <div key={index}>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                        {feature.title}
                      </h2>
                      <ul className="list-disc list-inside text-gray-600 mt-2">
                        {feature.items.map((item, i) => (
                          <li key={i} className="mt-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Privacy Policy */}
          <AccordionItem value="item-2">
            <AccordionTrigger>Privacy policy</AccordionTrigger>
            <AccordionContent className="py-6 border border-[#C8C8C8] rounded-[4px] px-4 sm:px-6 lg:px-12">
              <TextWithReadMore wordLimit="170">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat magni quasi sit atque eius quibusdam architecto optio ratione accusantium impedit sed omnis asperiores neque quidem, id necessitatibus repudiandae commodi! Illum corrupti minus nam amet omnis deleniti incidunt quaerat aspernatur molestias vel impedit, dolorem, soluta veritatis voluptatum. Quasi tempora eius fugiat.
              </TextWithReadMore>
            </AccordionContent>
          </AccordionItem>

          {/* Terms & Conditions */}
          <AccordionItem value="item-3">
            <AccordionTrigger>Terms & conditions</AccordionTrigger>
            <AccordionContent className="py-6 border border-[#C8C8C8] rounded-[4px] px-4 sm:px-6 lg:px-12">
              <TextWithReadMore wordLimit="220">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, necessitatibus corrupti? Sit, dolor reprehenderit? Repudiandae cumque alias non quidem ea. Ea sed, asperiores inventore nihil libero tenetur harum aperiam impedit dolore vero, rem at. Maiores veniam eum consequatur nostrum exercitationem, in voluptates possimus aut ex optio doloribus voluptatem dolorum ipsam!
              </TextWithReadMore>
            </AccordionContent>
          </AccordionItem>

          {/* Support & Help */}
          <AccordionItem value="item-4">
            <AccordionTrigger>Support & help</AccordionTrigger>
            <AccordionContent>
              <SupportAccordion />
            </AccordionContent>
          </AccordionItem>

          {/* Account Deactivation */}
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
    </section>
  );
};

export default BarSettings;
