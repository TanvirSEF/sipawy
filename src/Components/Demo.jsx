<section className="pt-12 px-4 sm:px-6 lg:px-10 font-poppins">
  <h2 className="text-xl font-semibold mb-6">Chat</h2>

  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-7 max-w-screen-xl mx-auto">
    {/* Left (Sidebar - All Messages) */}
    <div className="col-span-2 h-[75vh] flex flex-col rounded-lg border px-4 sm:px-5 py-4 sm:py-6 shadow-2xl">
      <h2 className="mb-4 text-lg font-medium">All Messages</h2>
      <div className="flex-grow space-y-4 overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <div className="flex gap-2 rounded bg-[#F8F8F8] p-3 sm:p-4" key={idx}>
              <figure className="w-10 h-10 overflow-hidden rounded-full shrink-0">
                <img
                  src="https://i.ibb.co.com/fYcPSK0y/profile-2.png"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </figure>
              <div className="flex-grow">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm sm:text-base font-medium text-primary">
                    Jane Cooper
                  </p>
                  <p className="text-xs text-[#919EAB]">34 min ago</p>
                </div>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-[#637381] truncate max-w-[70%]">
                    Me: A new task titled Home jobs has ..
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    {/* icons */}
                    <svg ... />
                    <svg ... />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

    {/* Right (Chat Window) */}
    <div className="col-span-3 h-[75vh] flex flex-col rounded-lg border px-4 sm:px-5 py-4 sm:py-6 shadow-2xl">
      <div className="flex gap-2 rounded border-b px-2 sm:px-4 text-[#161C24CC] pb-3 mb-3">
        <figure className="w-10 h-10 overflow-hidden rounded-full">
          <img
            src="https://i.ibb.co.com/fYcPSK0y/profile-2.png"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </figure>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p className="text-base sm:text-lg font-medium">Jane Cooper</p>
          </div>
          <div className="mt-0.5 flex flex-wrap items-center justify-between text-sm gap-2">
            <p>Last seen: 10 hours ago | Local time: Oct 17, 2024, 9:39 PM</p>
            <svg ... />
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 sm:pr-4 space-y-6">
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <div className="px-2 sm:px-4" key={idx}>
              <div className="flex items-center gap-2">
                <figure className="w-10 h-10 overflow-hidden rounded-full">
                  <img
                    src="https://i.ibb.co.com/fYcPSK0y/profile-2.png"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-sm font-medium">Jane Cooper</p>
                  <p className="text-xs text-[#919EAB]">Oct 17, 2024, 9:39 PM</p>
                </div>
              </div>
              <p className="mt-2 ml-12 text-sm text-[#262627]/70">
                Receive a daily overview of new and relevant assignments...
              </p>
            </div>
          ))}
      </div>

      <div className="mt-4">
        <fieldset className="relative">
          <input
            type="text"
            className="w-full rounded px-4 sm:px-6 py-3 sm:py-4 outline-primary"
            placeholder="Reply..."
          />
          <button>
            <AiOutlineSend className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#919EAB] text-xl" />
          </button>
        </fieldset>
      </div>
    </div>
  </div>
</section>
