import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/services/axiosInstances";

function ContactPage() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.email ||
      !userInput.name ||
      !userInput.message ||
      !userInput.subject
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    try {
      const response = axiosInstance.post("contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      console.log(contactResponse);
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Operation failed");
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Left Section */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Get in Touch
          </h1>
          <p className="text-gray-600">
            Have questions, feedback, or need support? Fill out the form or
            contact us directly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-sm">support@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm">Gurugram, India</span>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Send a Message</h2>

            <form onSubmit={onFormSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                name="name"
                value={userInput.name}
                onChange={handleInputChange}
              />
              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                value={userInput.email}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Subject"
                name="subject"
                value={userInput.subject}
                onChange={handleInputChange}
              />
              <Textarea
                placeholder="Your Message"
                name="message"
                rows={5}
                value={userInput.message}
                onChange={handleInputChange}
              />

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ContactPage;
