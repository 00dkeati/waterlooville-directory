import Breadcrumbs from '@/components/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Waterlooville Directory | Get in Touch',
  description: 'Contact Waterlooville Directory for business listings, questions, or support. We\'re here to help connect you with local businesses.',
}

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[
        { label: 'Contact' }
      ]} />

      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-700">
            Get in touch with the Waterlooville Directory team
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">
                    <a href="mailto:dean@waterlooville.co" className="text-blue-600 hover:text-blue-800">
                      dean@waterlooville.co
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                  <p className="text-gray-700">
                    <a href="https://waterlooville.co" className="text-blue-600 hover:text-blue-800">
                      waterlooville.co
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                For Business Owners
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Are you a local business owner looking to be featured in our directory? 
                We'd love to help you reach more customers in Waterlooville and surrounding areas.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Contact us to learn more about listing your business and how we can help 
                you grow your local presence.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a subject</option>
                  <option value="business-listing">Business Listing</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How can I list my business?
              </h4>
              <p className="text-gray-700">
                Contact us via email or the contact form above. We'll guide you through the process 
                of adding your business to our directory.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Is there a cost to list my business?
              </h4>
              <p className="text-gray-700">
                Basic listings are free. We also offer enhanced listings with additional features 
                for businesses that want more visibility.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How do I update my business information?
              </h4>
              <p className="text-gray-700">
                Contact us with the updated information, and we'll make the changes promptly. 
                We also regularly review listings for accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
