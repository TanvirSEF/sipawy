const UserPackage = () => {
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
    <section className="pt-12 px-4 sm:px-10 pb-16 mb-5">
      <div className="w-full max-w-[850px] md:mx-auto lg:mx-0">
        <h2 className="text-xl font-semibold mb-6">My Package</h2>

        {/* Responsive button row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <p className="bg-[#FAFAFA] py-4 px-6 text-xl font-medium w-full rounded-[6px]">
            Package: Premium
          </p>
          <button
            type="button"
            className="bg-[#1F1F1F] text-lg text-nowrap font-medium text-white w-full sm:w-auto px-6 py-4 leading-none rounded-md cursor-pointer"
            onClick={() => console.log("Add receipt")}
          >
            Change plan
          </button>
        </div>

        {/* Divider */}
        <div className="divider w-full h-px bg-black my-6"></div>

        {/* Features Section */}
        <div>
          <p className="font-semibold mb-5">What’s Included</p>
          <p className="mb-2">Best for personal team</p>
          <p className="mb-5 text-2xl font-medium">$90 /month</p>

          <div className="px-0 sm:px-6 space-y-6">
            {features.map((feature, index) => (
              <div key={index}>
                <h2 className="text-xl font-semibold text-gray-800">
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
      </div>
    </section>
  );
};

export default UserPackage;
