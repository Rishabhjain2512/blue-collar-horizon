
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    content: "This platform helped me find skilled electricians for my construction projects quickly and efficiently.",
    author: {
      name: "Anita Sharma",
      role: "HR Manager",
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    },
  },
  {
    content: "I was able to showcase my plumbing skills through a video resume and got hired within a week!",
    author: {
      name: "Ravi Kumar",
      role: "Plumber",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  },
  {
    content: "The bilingual support helped me communicate my requirements clearly and find the perfect candidates.",
    author: {
      name: "Sanjay Patel",
      role: "Small Business Owner",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  },
];

const TestimonialsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
            Testimonials
          </h2>
          <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl">
            Trusted by workers and employers
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Hear from the people who have used our platform to find jobs or hire skilled workers.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      {testimonial.author.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic">
                  "{testimonial.content}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
