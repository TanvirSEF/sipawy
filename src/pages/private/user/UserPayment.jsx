import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/Components/ui/checkbox";

const formSchema = z.object({
  paymentOption: z.string().nonempty("Please select a payment method"),
  name: z.string().nonempty("Cardholder name is required"),
  cardNumber: z
    .string()
    .length(16, "Card number must be 16 digits")
    .regex(/^\d{16}$/, "Card number must contain only digits"),
  expireDate: z
    .string()
    .length(5, "Expire date must be in MM/YY format")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expire date must be in MM/YY format"),
  ccv: z
    .string()
    .length(3, "CCV must be 3 digits")
    .regex(/^\d{3}$/, "CCV must contain only digits"),
  paypal: z.boolean(),
});

const UserPayment = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentOption: "",
      name: "",
      cardNumber: "",
      expireDate: "",
      ccv: "",
      paypal: false,
    },
  });
  function onSubmit(values) {
    console.log(values);
  }

  const paymentMethods = [
    {
      id: "masterCard",
      label: "Mastercard",
      img: "https://i.ibb.co.com/k6QwzJ3k/master.png",
    },
    {
      id: "visaCard",
      label: "Visa Card",
      img: "https://i.ibb.co.com/M5DFDXvB/visa.png",
    },
  ];

  return (
    <section className="pt-12 px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-[850px] mx-auto xl:mx-0">
        <h2 className="text-xl md:text-3xl font-semibold mb-6">
          My Payment Method
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="paymentOption"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => field.onChange(method.id)}
                          className={cn(
                            "flex flex-col items-center justify-center rounded-lg p-4 transition-all w-full mx-auto aspect-[415/215] relative overflow-hidden border",
                            field.value === method.id
                              ? "border-black shadow-lg"
                              : "border-gray-300"
                          )}
                        >
                          <img
                            src={method.img}
                            alt={method.label}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h2 className="text-xl md:text-3xl font-semibold mt-8 mb-6">
              Add Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-medium text-base">
                      Cardholder name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name on your Card"
                        {...field}
                        className="h-[56px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-medium text-base">
                      Card number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Number of your Card"
                        {...field}
                        className="h-[56px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expireDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-medium text-base">
                      Expire date
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="06/32"
                        {...field}
                        className="h-[56px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ccv"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-medium text-base">CCV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123"
                        {...field}
                        className="h-[56px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paypal"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        <img
                          src="https://i.ibb.co.com/XkWBz2Zm/paypal.png"
                          alt="PayPal"
                          className="h-5"
                        />
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex justify-end col-span-1 sm:col-span-2 mb-10">
                <button
                  type="submit"
                  className="bg-[linear-gradient(92deg,#DBA514_2.3%,#EEB609_35.25%,#FCC201_97.79%)] text-lg font-medium text-black w-full sm:w-auto px-6 py-4 leading-none rounded-md hover:shadow-xl cursor-pointer"
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UserPayment;
